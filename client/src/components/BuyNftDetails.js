import { useEffect, useState } from "react";
import LineChart from "./LineChart";
import Table from "react-bootstrap/esm/Table";

function BuyNftDetails({ selectBuyNFT, setReFetch, currentPrice }) {
    const [nftData, setNftData] = useState({});
    const [count, setCount] = useState(15);
    const [priceData, setPriceData] = useState([]);
    const [timeData, setTimeData] = useState([]);
    const [trimmedPriceData, setTrimmedPriceData] = useState([]);
    const [trimmedTimeData, setTrimmedTimeData] = useState([]);
    const [processBuyMessage, setProcessBuyMessage] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [fetchParams, setFetchParams] = useState({ fetch: false, fetchNum: 0 });

    useEffect(() => {
        fetch(`/nfts/${selectBuyNFT.id}`)
            .then(r => {
                if (r.ok) {
                    r.json().then(res => {
                        setNftData(res)
                        // console.log(res)
                    })
                }
            })
    }, [])

    useEffect(() => {
        fetch(`/pricings?nft_id=${selectBuyNFT.id}&fetch_num=${fetchParams.fetchNum}`)
            .then(r => r.json())
            .then(newPriceData => {
                console.log("Fetched more data")
                console.table(newPriceData);
                setTimeData([...timeData.slice(50)].concat(newPriceData.map(p => {
                    const dateValue = new Date(p.updated_at)
                    return dateValue.toTimeString().substring(0, 5)
                    // return p.price_time
                })));
                setPriceData([...priceData.slice(50)].concat(newPriceData.map(p => p.price_nft)));
            })
    }, [fetchParams])

    useEffect(() => {
        let index = 0;
        const intervalChart = setInterval(() => {
            if (!priceData) {
                return
            } else if (priceData.length - index <= 50) {
                setFetchParams({ ...fetchParams, fetchNum: fetchParams.fetchNum += 1 })
            } else {
                setTrimmedTimeData(timeData.slice(index, index + 50));
                setTrimmedPriceData(priceData.slice(index, index + 50));
                index += 1;
            }
            // console.log(index)
        }, 1000)

        return (() => clearInterval(intervalChart))
    }, [priceData])

    useEffect(() => {
        let counterVariable = 15;
        const timer = setInterval(() => {
            if (counterVariable === 0) {
                clearInterval(timer)
                setCount(0)
            } else {
                counterVariable--
                setCount(counterVariable)
            }
        }, 1000)

        return (() => clearInterval(timer))
    }, [selectBuyNFT])

    const processBuy = () => {

        fetch(`/portfolios?nft_id=${selectBuyNFT.id}&pp=${currentPrice}`, {
            method: "POST",
            headings: { "Content-Type": "application/json" },
            body: JSON.stringify({})
        })
            .then(r => {
                if (r.ok) {
                    r.json().then(r => {
                        // console.log(r);
                        setProcessBuyMessage(r);
                        setReFetch(reFetch => !reFetch)

                    })
                } else {
                    r.json().then(e => setErrorMessage(e.error))
                }
            })
    }

    const renderNftData = () => {

        if (!nftData.name) {
            return
        } else {
            return (
                <div>
                    <div className="row">
                        <div className="col-sm-4">
                            <img
                                src={nftData.image_url}
                                alt={nftData.name}
                                style={{ width: "100%" }}
                            />
                        </div>
                        <div className="col-sm-8">
                            <LineChart trimmedPriceData={trimmedPriceData} trimmedTimeData={trimmedTimeData} selectBuyNFT={selectBuyNFT} />
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (
        <div>
            {trimmedPriceData.length === 0 ?
                <div className="d-flex justify-content-center"

                >
                    <div className="spinner-border text-info" role="status"
                        style={{
                            height: "80px",
                            width: "80px",
                            position: "absolute",
                            top: "7em",
                            left: "30em"
                        }}
                    >
                        {/* <span class="sr-only">Loading...</span> */}
                    </div>
                </div> : null}
            {renderNftData()}
            <Table >
                <thead>
                    <tr>
                        <th>NFT</th>
                        <th>{selectBuyNFT.name}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{selectBuyNFT.chain}</td>
                        <td><img src={selectBuyNFT.chain_icon} alt="chain icon"></img></td>
                    </tr>

                    {nftData.on_market ? <tr>
                        <td>Price:</td>
                        {!processBuyMessage ? <td style={count === 0 ? { textDecoration: "line-through", color: "red" } : null}>{currentPrice}</td> : <td>{currentPrice}</td>}
                    </tr> : null}
                    {nftData.on_market ? <tr>
                        <td>Price Valid for:</td>
                        <td>
                            {!processBuyMessage ? count : 0}s
                        </td>
                    </tr> : null}
                </tbody>
            </Table>
            <div className="d-flex justify-content-center" style={{ margin: "1em" }}>
                {nftData.on_market ?
                    <button
                        onClick={processBuy}
                        className="btn btn-outline-success"
                        disabled={count === 0 || processBuyMessage ? true : false}
                    >BUY
                    </button> :
                    <button disabled>SOLD</button>}
            </div>
            {processBuyMessage &&
                <div>
                    <h2>NFT Purchased!</h2>
                    <p>You just bought {selectBuyNFT.name} for <img src={selectBuyNFT.chain_icon} alt="chain icon"></img>{processBuyMessage.purchase_price.toFixed(5)}</p>
                    <p>Remaining <img src={selectBuyNFT.chain_icon} alt="chain icon"></img> in wallet: {processBuyMessage.remaining_coin_in_wallet.toFixed(5)}</p>
                    <p>Your portfolio and wallet have been updated</p>
                </div>
            }
            {errorMessage &&
                <div>
                    <h4 style={{ color: "red" }}>{errorMessage}</h4>
                </div>
            }
        </div>)
}

export default BuyNftDetails
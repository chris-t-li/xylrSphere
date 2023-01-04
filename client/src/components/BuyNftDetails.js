import { useEffect, useState } from "react";
import LineChart from "./LineChart";
import Table from "react-bootstrap/esm/Table";

function BuyNftDetails({ selectBuyNFT, setReFetch }) {
    const [nftData, setNftData] = useState({});
    const [count, setCount] = useState(15);
    const [priceData, setPriceData] = useState([]);
    const [timeData, setTimeData] = useState([]);
    const [trimmedPriceData, setTrimmedPriceData] = useState([]);
    const [trimmedTimeData, setTrimmedTimeData] = useState([]);
    const [processBuyMessage, setProcessBuyMessage] = useState();
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
                // console.table(newPriceData);
                setTimeData([...timeData.slice(50)].concat(newPriceData.map(p => p.price_time)));
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
            if (counterVariable == 0) {
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

        fetch(`/portfolios/${selectBuyNFT.id}`, {
            method: "POST",
            headings: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nft_id: selectBuyNFT.id,
                // user_id: 1
            })
        })
            .then(r => {
                if (r.ok) {
                    r.json().then(r => {
                        // console.log(r);
                        setProcessBuyMessage(r);
                        setReFetch(reFetch => !reFetch)
                    })
                } else {
                    r.json().then(e => alert(e.error))
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
                        <td><img src={selectBuyNFT.chain_icon}></img></td>
                    </tr>

                    {nftData.on_market ? <tr>
                        <td>Price:</td>
                        {!processBuyMessage ? <td style={count == 0 ? { textDecoration: "line-through", color: "red" } : null}>{selectBuyNFT.most_recent_pricings[99].price_nft.toFixed(5)}</td> : <td>{selectBuyNFT.most_recent_pricings[99].price_nft.toFixed(5)}</td>}
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
                        disabled={count == 0 || processBuyMessage ? true : false}
                    >BUY
                    </button> :
                    <button disabled>SOLD</button>}
            </div>
            {processBuyMessage &&
                <div>
                    <h2>NFT Purchased!</h2>
                    <p>You just bought {selectBuyNFT.name} for <img src={selectBuyNFT.chain_icon}></img>{processBuyMessage.purchase_price.toFixed(5)}</p>
                    <p>Remaining <img src={selectBuyNFT.chain_icon}></img> in wallet: {processBuyMessage.remaining_coin_in_wallet.toFixed(5)}</p>
                    <p>Your portfolio and wallet have been updated</p>
                </div>
            }
        </div>)
}

export default BuyNftDetails
import { useState, useEffect } from "react";
import LineChartSell from "./LineChartSell";
import Table from "react-bootstrap/esm/Table";


function SellNFTDetails({ selectSellNFT, setReFetch }) {
    const [nftData, setNftData] = useState({});
    const [count, setCount] = useState(15);
    const [priceData, setPriceData] = useState([]);
    const [timeData, setTimeData] = useState([]);
    const [processSellMessage, setProcessSellMessage] = useState(null)

    useEffect(() => {
        fetch(`/nfts/${selectSellNFT.nft.id}`)
            .then(r => {
                if (r.ok) {
                    r.json().then(res => {
                        // console.log(res)
                        setNftData(res)
                        setPriceData(res.most_recent_pricings.map(p => p.price_nft))
                        setTimeData(res.most_recent_pricings.map(p => {
                            const dateValue = new Date(p.updated_at)
                            return dateValue.toTimeString().substring(0, 5)
                        }))
                    })
                }
            })
    }, [])


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
    }, [selectSellNFT])

    const processSell = () => {
        // console.log('selling NFT')
        fetch(`portfolios/${selectSellNFT.nft.id}`, {
            method: "PATCH",
            headings: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nft_id: selectSellNFT.nft.id
            })
        })
            .then(r => {
                if (r.ok) {
                    r.json().then(r => {
                        // console.log(r)
                        setProcessSellMessage(r);
                        // setReFetch(value => !value)
                        setCount(0);
                    })
                } else {
                    r.json().then(e => alert(e.error))
                }
            })
    }

    return (<div>
        {selectSellNFT &&
            <div className="row">
                <div className="col-sm-4">
                    <img src={selectSellNFT.nft.image_url}
                        style={{ width: "100%" }}
                    ></img>


                </div>
                <div className="col-sm-8">
                    <LineChartSell priceData={priceData} timeData={timeData} nftData={nftData} />
                </div>
            </div>}
        <Table >
            <thead>
                <tr>
                    <th>NFT</th>
                    <th>{selectSellNFT.nft.name}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{selectSellNFT.nft.chain}</td>
                    <td><img src={selectSellNFT.nft.chain_icon}></img></td>
                </tr>
                <tr>
                    <td>Purchased at:</td>
                    <td>{selectSellNFT.purchase_price.toFixed(5)}</td>
                </tr>
                <tr>
                    <td>Sell Price:</td>
                    {!processSellMessage ? <td style={count == 0 ? { textDecoration: "line-through", color: "red" } : null}>
                        {selectSellNFT.nft.latest_price.price_nft.toFixed(5)}
                    </td> : <td>{selectSellNFT.nft.latest_price.price_nft.toFixed(5)}</td>}
                </tr>

                <tr>
                    <td>Profit / Loss:</td>
                    {!processSellMessage ? <td>{count == 0 ? "-" : (selectSellNFT.nft.latest_price.price_nft - selectSellNFT.purchase_price).toFixed(5)}</td> : <td>{(selectSellNFT.nft.latest_price.price_nft - selectSellNFT.purchase_price).toFixed(5)}</td>}
                </tr>
                <tr>
                    <td>Price Valid for:</td>
                    <td>{!processSellMessage ? count : 0}s</td>
                </tr>
            </tbody>
        </Table>
        <div className="d-flex justify-content-center">
            <button
                className="btn btn-outline-danger"
                disabled={count == 0 || processSellMessage ? true : false}
                onClick={processSell}
            >{processSellMessage ? "SOLD" : "SELL"}</button>
        </div>
        {processSellMessage && <div>
            <h2>NFT Sold!</h2>
            <p>Your portfolio and wallet have been updated</p>
            <p>Amount of {selectSellNFT.nft.chain} in wallet: {processSellMessage.wallet.quantity.toFixed(5)}</p>

        </div>}
    </div>)
}

export default SellNFTDetails;
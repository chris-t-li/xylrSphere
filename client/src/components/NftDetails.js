import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LineChart from "./LineChart";

function NftDetails({ setReFetch }) {
    const { nft_id } = useParams();
    const [nftData, setNftData] = useState({});
    const [priceData, setPriceData] = useState([]);
    const [timeData, setTimeData] = useState([]);
    const [trimmedPriceData, setTrimmedPriceData] = useState([]);
    const [trimmedTimeData, setTrimmedTimeData] = useState([]);
    const [processBuyMessage, setProcessBuyMessage] = useState({});
    const [fetchMorePriceData, setFetchMorePriceData] = useState(false);

    useEffect(() => {
        fetch(`/nfts/${nft_id}`)
            .then(r => {
                if (r.ok) {
                    r.json().then(res => {
                        setNftData(res)
                        // console.log(res)
                    })
                }
            })
    }, [processBuyMessage])

    useEffect(() => {
        fetch(`/pricings/${nft_id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({})
        })
            .then(r => r.json())
            .then(priceData => {
                // console.table("autofetch is still running..", priceData);
                setTimeData(priceData.map(p => p.price_time));
                setPriceData(priceData.map(p => p.price_nft));
            })
    }, [fetchMorePriceData])

    useEffect(() => {
        // Start at index = 0;
        let index = 0;
        const intervalChart = setInterval(() => {
            // if remaining elements in the priceData array is <=10 (priceData length - index <= 10), run a new fetch
            if (!priceData) {
                return
            } else if (priceData.length - index - 50 <= 10) {
                setFetchMorePriceData(value => !value)
            } else {
                // setTrimmedTimeData(index to index + 50)
                setTrimmedTimeData(timeData.slice(index, index + 50));
                setTrimmedPriceData(priceData.slice(index, index + 50));
                index += 1;
            }
            // wait 1 sec
        }, 1000)

        return (() => clearInterval(intervalChart))
    }, [priceData])

    const processBuy = () => {

        fetch(`/portfolios/${nft_id}`, {
            method: "POST",
            headings: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nft_id: nft_id,
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
                <div style={{ margin: "2em 0" }}>
                    <h2>{nftData.name}</h2>
                    <img
                        src={nftData.image_url.replace("256", "500")}
                        alt={nftData.name}
                        style={{
                            display: "inline-block",
                            maxWidth: "400px",
                            position: "absolute",
                            top: "6em"
                        }}
                    />
                    <div style={{ position: "absolute", top: "32em" }}>
                        <p>Chain: {nftData.chain}</p>
                        <p>Last Price: {nftData.latest_price.price_nft.toFixed(5)}</p>
                        {nftData.on_market ? <button
                            onClick={processBuy}
                        >BUY</button> : <button disabled>SOLD</button>}

                    </div>

                    <LineChart trimmedPriceData={trimmedPriceData} trimmedTimeData={trimmedTimeData} />
                </div>
            )
        }
    }


    return (
        <div style={{ marginLeft: "200px", display: "inline-block", minWidth: "100vw" }}>
            {renderNftData()}

            {processBuyMessage.message && <div style={{ position: "absolute", top: "40em" }}>
                <p>{processBuyMessage.message}</p>
                <p>Price Bought: {processBuyMessage.purchase_price.toFixed(5)}</p>
                <p>Remaining Coin: {processBuyMessage.remaining_coin_in_wallet.toFixed(5)}</p>
            </div>}
        </div>)
}

export default NftDetails;
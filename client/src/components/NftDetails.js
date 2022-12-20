import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LineChart from "./LineChart";
// import NftTile from "./NftTile";

function NftDetails() {
    const { nft_id } = useParams();
    const [nftData, setNftData] = useState({});
    const [priceData, setPriceData] = useState([]);
    const [timeData, setTimeData] = useState([]);

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
    }, [])

    // Brute Force Price Generator Request
    useEffect(() => {
        const intervalChart = setInterval(() => {
            fetch(`/pricings/${nft_id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    run: true
                })
            })
                .then(r => r.json())
                .then(priceData => {
                    // console.table("autofetch is still running..", priceData);
                    setTimeData(priceData.map(p => p.price_time));
                    setPriceData(priceData.map(p => p.price_nft));
                })
        }, 1000)

        return (() => clearInterval(intervalChart))
    }, [])

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
                    {/* <span>{`Price: ${nftData.latest_price.price_nft}.`}</span> */}
                    <LineChart priceData={priceData} timeData={timeData} />
                </div>
            )
        }
    }


    return (<div style={{ marginLeft: "200px", display: "inline-block", minWidth: "100vw" }}>
        {renderNftData()}

    </div>)
}

export default NftDetails;
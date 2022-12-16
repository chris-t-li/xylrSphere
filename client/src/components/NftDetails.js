import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LineChart from "./LineChart";

function NftDetails() {
    const { nft_id } = useParams();
    const [priceData, setPriceData] = useState([]);
    const [timeData, setTimeData] = useState([]);

    // Brute Force Price Generator Request
    useEffect(() => {
        // const intervalChart = setInterval(() => {
        fetch("/pricings", {
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
        // }, 1000)

        // return (() => clearInterval(intervalChart))
    }, [])

    return (<div style={{ marginLeft: "200px" }}>
        {`NFT-id: ${nft_id}`}
        {/* <h4>NFT Price Chart</h4> */}
        <LineChart priceData={priceData} timeData={timeData} />
    </div>)
}

export default NftDetails;
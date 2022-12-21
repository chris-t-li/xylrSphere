// import ThumbnailLineChart from "./ThumbnailLineChart";
// import domtoimage from "dom-to-image";

function PortfolioListItem({ nft, setReFetch }) {

    const obj = {
        imgSrc: nft.nft.image_url,
        name: nft.nft.name,
        coin: nft.nft.chain,
        lastPrice: nft.nft.latest_price.price_nft.toFixed(6),
        purchasePrice: nft.purchase_price.toFixed(6),
        rating: "✦".repeat(nft.nft.rarity)
    }

    const processSell = () => {
        console.log('sell NFT')
    }

    return (
        <tr>
            <td><p>{nft.id}</p></td>
            <td><img
                src={obj.imgSrc}
                alt="nft icon"
                className="watchlist-icon"

            /></td>
            <td><h5>{obj.name}</h5></td>
            <td><p>{obj.coin}</p></td>
            <td>{obj.lastPrice}</td>
            <td>{obj.purchasePrice}</td>
            <td>{obj.rating}</td>
            <td>{(obj.lastPrice - obj.purchasePrice).toFixed(5)}</td>
            <td><img src="/stockicon.png" style={{ height: "50px" }}></img></td>
            <td><button >☰</button></td>
            <td><button onClick={processSell}>Sell</button></td>
        </tr >
    )
}

export default PortfolioListItem
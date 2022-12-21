
function PortfolioListItem({ nft, setReFetch }) {

    return (
        <tr>
            <td><p>{nft.id}</p></td>
            <td><img
                src={nft.nft.image_url}
                alt="nft icon"
                className="watchlist-icon"

            /></td>
            <td><h5>{nft.nft.name}</h5></td>
            <td><p>{nft.nft.chain}</p></td>
            <td>{nft.nft.latest_price.price_nft.toFixed(6)}</td>
            <td>{nft.purchase_price.toFixed(6)}</td>
            <td>{"✦".repeat(nft.nft.rarity)}</td>
            <td></td>
            <td>{/* Small Chart [stretch]*/}</td>
            <td><button >☰</button></td>
            <td><button >Sell</button></td>
        </tr >
    )
}

export default PortfolioListItem
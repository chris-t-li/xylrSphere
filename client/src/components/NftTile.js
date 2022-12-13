function NftTile({ nft }) {
    function handleClick() {
        console.log("adding to watchlist")
    }

    return (
        <div className="NftTile">
            <h3>{nft.name}</h3>
            <img src={nft.image_url} alt="nft icon" />
            <p> Supply: {nft.supply}</p>
            <span>{"✦".repeat(nft.rarity)}</span>
            <br />
            <button onClick={handleClick}>Add to Watchlist</button>
        </div>
    )
}

export default NftTile
function NftTile({ nft, user }) {
    function handleClick() {
        // console.log("adding to watchlist")
        // add this to watchlist state.. 
        // post to backend
        console.log({
            user_id: user,
            nft_id: nft.id,
            watchlist: true
        })
        return
        fetch(`/portfolios`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: user.id,
                nft_id: nft.id,
                watchlist: true
            })
        })
    }

    return (
        <div className="NftTile">
            <h3>{nft.name}</h3>
            <img src={nft.image_url} alt="nft icon" />
            <br />
            <span>{"✦".repeat(nft.rarity)}</span>
            <p>{nft.chain}:</p>
            <p> Supply: {nft.supply}</p>
            {user ? <button onClick={handleClick}>Add to Watchlist</button> : null}
        </div>
    )
}

export default NftTile
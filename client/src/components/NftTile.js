function NftTile({ nft, user }) {
    function handleClick() {
        fetch(`/watchlist`, {
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
            .then(r => r.json())
            .then(console.log)
            .catch(e => console.error(e))
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
            {/* Need watchlist button to only show if NFT is not currently in user's watchlist */}
        </div>
    )
}

export default NftTile
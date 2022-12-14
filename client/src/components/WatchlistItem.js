
function WatchlistItem({ nft, setReFetch }) {

    function removeFromWatchlist() {
        fetch(`/watchlist/${nft.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                watchlist: false
            })
        })
            .then(r => r.json())
            .then(addedItem => {
                console.log(addedItem);
                setReFetch(val => !val)
            }
            )
    }

    return (
        <div className="watchlist-row">

            <img src={nft.nft.image_url} alt="nft icon" className="watchlist-icon" />
            <h5>{nft.nft.name}</h5>
            <p>{nft.nft.chain}</p>
            {/* Price */}
            {/* Small Chart [stretch]*/}
            <button onClick={removeFromWatchlist}>🗑</button>
        </div>
    )
}

export default WatchlistItem;
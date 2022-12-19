
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

        <tr>
            <td><p>1</p></td>
            <td><img
                src={nft.nft.image_url}
                alt="nft icon"
                className="watchlist-icon"

            /></td>
            <td><h5>{nft.nft.name}</h5></td>
            <td><p>{nft.nft.chain}</p></td>
            <td>{/* Price */}</td>
            <td>{"Volume"}</td>
            <td>Change</td>
            <td>{/* Small Chart [stretch]*/}</td>
            <td><button >☰</button></td>
            <td><button onClick={removeFromWatchlist}>🗑</button></td>
        </tr >

    )
}

export default WatchlistItem;
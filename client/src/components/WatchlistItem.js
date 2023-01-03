
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
            {/* <td><p>1</p></td> */}
            <td><img
                src={nft.nft.image_url}
                alt="nft icon"
                className="watchlist-icon"

            /></td>
            <td><h5>{nft.nft.name}</h5></td>
            <td><p>{nft.nft.chain}</p></td>
            <td>{nft.nft.latest_price.price_nft.toFixed(5)}</td>
            <td>{"✦".repeat(nft.nft.rarity)}</td>
            <td>Change</td>
            <td><img src="/stockicon.png" style={{ height: "50px" }}></img></td>
            <td><button >☰</button></td>
            <td><button onClick={removeFromWatchlist}>🗑</button></td>
        </tr >

    )
}

export default WatchlistItem;
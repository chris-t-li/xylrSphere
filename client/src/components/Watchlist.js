import { useEffect } from "react";
import WatchlistItem from "./WatchlistItem";

function Watchlist({ user, watchlist, reFetch, setReFetch, fetchWatchlist }) {
    useEffect(() => fetchWatchlist(), [user, reFetch])

    const renderWatchlist = watchlist.map(nft => {
        return <WatchlistItem
            key={nft.id}
            nft={nft}
            user={user}
            setReFetch={setReFetch}
        />
    })

    return (
        <div id="watchlist-container">
            <h2>My WatchList</h2>
            {renderWatchlist}
        </div>
    )
}

export default Watchlist;
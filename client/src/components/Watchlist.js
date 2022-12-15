import { useEffect } from "react";
import WatchlistItem from "./WatchlistItem";

function Watchlist({ user, watchlist, reFetch, setReFetch, fetchWatchlist }) {
    // const [watchlist, setWatchlist] = useState([]);
    // const [reFetch, setReFetch] = useState(false); // triggers watchlist to be updated upon change

    useEffect(() => {
        // fetch(`/watchlist/${user.id}`)
        //     .then(r => r.json())
        //     .then(listData => {
        //         setWatchlist(listData.filter(listItem => {
        //             return listItem.watchlist === true
        //         }));
        //     })
        fetchWatchlist()

    }, [user, reFetch])

    const renderWatchlist = watchlist.map(nft => {
        return <WatchlistItem
            key={nft.id}
            nft={nft}
            user={user}
            setReFetch={setReFetch}
        />
    })

    return (
        <div>
            <h2>My WatchList</h2>
            {renderWatchlist}
        </div>
    )
}

export default Watchlist;
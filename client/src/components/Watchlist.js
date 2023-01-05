import { useEffect } from "react";
import Table from "react-bootstrap/table";
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
        <div id="watchlist-container"
            style={{
                marginLeft: "201px",
                marginTop: "2em",
                maxWidth: "90vw"

            }}>
            <h2>My WatchList</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {/* <th style={{ width: "3%" }}>#</th> */}
                        <th style={{ width: "5%" }}>Icon</th>
                        <th style={{ width: "20%" }}>Name</th>
                        <th style={{ width: "5%" }}>Coin</th>
                        <th>Last</th>
                        <th>Rating</th>
                        {/* <th>Change</th>
                        <th>Details</th> */}
                        {/* <th style={{ width: "3%" }}>Move</th> */}
                        <th style={{ width: "3%" }}>X</th>
                    </tr>
                </thead>
                <tbody>
                    {renderWatchlist}
                </tbody>
            </Table>
        </div>
    )
}

export default Watchlist;
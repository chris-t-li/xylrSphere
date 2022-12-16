import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

function NftTile({ nft, user, watchlist }) {
    const [isOnWatchList, setIsOnWatchList] = useState();
    // const navigate = useNavigate();

    useEffect(() => {
        function isWatchList(nftParam) {
            return nftParam.nft.id === nft.id
        }
        if (watchlist.find(isWatchList)) {
            setIsOnWatchList(true)
        }
    }, [watchlist])

    function addToWatchListClick() {
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

    function showNftDetails() {
        console.log("take me to this NFT")
        // navigate(`/${nft.id}`)

    }

    return (
        <div
            className="card"
            style={{
                width: "18rem",
                // height: "31rem",
                display: "inline-block",
                margin: "1.75%",

            }}
            onClick={showNftDetails}>
            <div style={{ height: "18em", overflow: "hidden" }}>
                <img class="card-img-top" src={nft.image_url} alt="nft icon"
                    style={{ transition: "transform .5s ease" }}
                />
            </div>
            <div class="card-body">
                <h5 class="card-title">{nft.name}</h5>
                <span class="card-text">{"✦".repeat(nft.rarity)}</span>
                <p class="card-text">{nft.chain}: {nft.latest_price.price_nft.toFixed(3)}</p>
                <p class="card-text"> Supply: {nft.supply}</p>
                {!user ? null : isOnWatchList ? <button class="btn btn-outline-secondary" disabled>In Watchlist</button> : <button class="btn btn-outline-success" onClick={addToWatchListClick}>Add to Watchlist</button>}
            </div>
        </div>
    )
}

export default NftTile
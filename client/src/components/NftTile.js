import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NftTile({ nft, user, watchlist }) {
    const [isOnWatchList, setIsOnWatchList] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        function isWatchList(nftParam) {
            return nftParam.nft.id === nft.id
        }
        if (watchlist.find(isWatchList)) {
            setIsOnWatchList(true)
        }
    }, [watchlist])

    function addToWatchListClick() {
        setIsOnWatchList(true);
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
            // .then(console.log)
            .catch(e => console.error(e))
    }

    function showNftDetails() {
        // console.log("take me to this NFT")
        navigate(`/nftmain/${nft.id}`)
    }

    const watchListButton = () => {
        if (!user) {
            return null
        } else if (isOnWatchList) {
            return (
                <button className="btn btn-outline-secondary" disabled>In Watchlist</button>
            )
        } else {
            return (
                <button className="btn btn-outline-success" onClick={addToWatchListClick}>Add to Watchlist</button>
            )
        }
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
        >
            <div style={{ height: "18em", overflow: "hidden" }}>
                <img
                    className="card-img-top"
                    src={nft.image_url}
                    alt="nft icon"
                    style={{ transition: "transform .5s ease" }}
                    onClick={showNftDetails}
                />
            </div>
            <div className="card-body">
                <h5 className="card-title">{nft.name}</h5>
                <span className="card-text">{"✦".repeat(nft.rarity)}</span>
                <p className="card-text">{nft.chain}: {nft.latest_price.price_nft.toFixed(3)}</p>
                <p className="card-text"> Supply: {nft.supply}</p>
                {watchListButton()}
            </div>
        </div>
    )
}

export default NftTile
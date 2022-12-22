import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NftTile({ nft, user, watchlist }) {
    const [isOnWatchList, setIsOnWatchList] = useState();
    const [isOnMarket, setIsOnMarket] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        function isWatchList(nftParam) {
            return nftParam.nft.id === nft.id
        }
        if (watchlist.find(isWatchList)) {
            setIsOnWatchList(true)
        }

        if (nft.on_market) {
            setIsOnMarket(true);
        } else if (!nft.on_market) {
            setIsOnMarket(false);
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
                <button
                    className="btn btn-outline-success"
                    style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px" }}
                    onClick={addToWatchListClick}
                >Add to Watchlist</button>
            )
        }
    }

    const onMarketButton = () => {
        if (!user) {
            return null
        } else if (isOnMarket) {
            return (
                <button className="btn btn-success"
                    style={{ position: "relative", left: "12.4em", top: "-29em" }}
                    onClick={showNftDetails}>BUY</button>
            )
        } else {
            return (
                <button className="btn btn-danger"
                    style={{ position: "relative", left: "11.6em", top: "-29em" }}
                    disabled>SOLD</button>
            )
        }
    }

    return (
        <div
            className="card"
            style={{
                width: "18rem",
                // height: "auto",
                display: "inline-block",
                margin: "1.75%",
                borderRadius: "8px",
                boxShadow: "rgba(0, 0, 0, 0.3) 0px 7px 15px, rgba(0, 0, 0, 0.22) 0px 8px 10px"
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
            <div className="card-body"
                style={{
                    height: "auto",

                }}>
                <h5 className="card-title" style={{ fontSize: "1.15em" }}>{nft.name}</h5>
                <span className="card-text">{"✦".repeat(nft.rarity)}</span>
                <p className="card-text">{nft.chain}: {nft.latest_price.price_nft.toFixed(3)}</p>
                <p className="card-text"> Supply: {nft.supply}</p>
                {watchListButton()}
                {onMarketButton()}
            </div>
        </div>
    )
}

export default NftTile
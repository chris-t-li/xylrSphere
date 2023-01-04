import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NftTile({ nft, user, watchlist, fetchNfts }) {
    const [isOnWatchList, setIsOnWatchList] = useState();
    const [isOnMarket, setIsOnMarket] = useState();
    const [color, setColor] = useState("");
    const [currentPrice, setCurrentPrice] = useState();
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

    useEffect(() => {
        let counter = 0, index = 0;
        const priceRefresh = setInterval(() => {

            setCurrentPrice(nft.most_recent_pricings[counter].price_nft.toFixed(5));

            if (counter === 99) {
                fetchNfts(index += 1);
                counter = 0;
            } else if (counter > 0 && nft.most_recent_pricings[counter].price_nft > nft.most_recent_pricings[counter - 1].price_nft) {
                setColor("green");
            } else if (counter > 0 && nft.most_recent_pricings[counter].price_nft < nft.most_recent_pricings[counter - 1].price_nft) {
                setColor("red");
            }
            counter += 1;

        }, 1000)

        return (() => clearInterval(priceRefresh))
    }, [])

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
                <div className="d-flex justify-content-center">
                    <button
                        className="btn btn-outline-dark"
                        style={{
                            boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
                        }}
                        disabled
                    >In Watchlist</button>
                </div>
            )
        } else {
            return (
                <div className="d-flex justify-content-center">
                    <button
                        className="btn btn-outline-warning"
                        style={{
                            boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
                        }}
                        onClick={addToWatchListClick}
                    >Add to Watchlist</button>
                </div>
            )
        }
    }

    const onMarketButton = () => {
        if (!user) {
            return null
        } else if (isOnMarket) {
            return (
                <div className="d-flex justify-content-end">
                    <button className="btn btn-success"
                        style={{
                            position: "absolute",
                            top: "0.5em",
                            zIndex: "20",
                            margin: "0 0.5em 0 0"
                        }}
                        onClick={showNftDetails}>BUY</button>
                </div>
            )
        } else {
            return (
                <div className="d-flex justify-content-end">
                    <button className="btn btn-danger"
                        style={{
                            position: "absolute",
                            top: "0.5em",
                            zIndex: "20",
                            margin: "0 0.5em 0 0"
                        }}
                        disabled>SOLD</button>
                </div>
            )
        }
    }

    return (
        <div
            className="card"
            style={{
                width: "18rem",
                height: "auto",
                display: "inline-block",
                margin: "1.75%",
                borderRadius: "12px",
                boxShadow: "rgba(0, 0, 0, 0.3) 0px 7px 15px, rgba(0, 0, 0, 0.22) 0px 8px 10px"
            }}
        >
            <div style={{ height: "18em", overflow: "hidden" }}>

                <img
                    className="card-img-top"
                    src={nft.image_url}
                    alt="nft icon"
                    style={{
                        transition: "transform .5s ease",
                        borderRadius: "12px 12px 0 0"
                    }}
                    onClick={showNftDetails}

                />
                {onMarketButton()}

            </div>
            <div className="card-body"
                style={{
                    height: "auto",

                }}>
                <h5 className="card-title" style={{ fontSize: "1.15em" }}>{nft.name}</h5>
                <span className="card-text">{"✦".repeat(nft.rarity)}</span>
                {/* <p className="card-text">{nft.chain}: {nft.latest_price.price_nft.toFixed(3)}</p> */}
                <br></br>
                <img style={{ display: "inline-block" }} src={nft.chain_icon} />
                <p className="card-text"
                    style={{
                        color: color,
                        display: "inline-block",
                        margin: "0 0.5em"
                    }}> {currentPrice}</p>
                {/* <p className="card-text"> Supply: {nft.supply}</p> */}
                {watchListButton()}

            </div>
        </div>
    )
}

export default NftTile
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
        <div className="NftTile" onClick={showNftDetails}>
            <h3>{nft.name}</h3>
            <img src={nft.image_url} alt="nft icon" />
            <br />
            <span>{"✦".repeat(nft.rarity)}</span>
            <p>{nft.chain}: {nft.latest_price.price_nft}</p>
            <p> Supply: {nft.supply}</p>
            {isOnWatchList ? <button disabled>In Watchlist</button> : <button onClick={addToWatchListClick}>Add to Watchlist</button>}
        </div>
    )
}

export default NftTile
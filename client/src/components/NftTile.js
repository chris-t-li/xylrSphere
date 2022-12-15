import { useEffect, useState } from "react";

function NftTile({ nft, user, watchlist }) {
    const [isOnWatchList, setIsOnWatchList] = useState();

    useEffect(() => {
        function isWatchList(nftParam) {
            return nftParam.nft.id === nft.id
        }
        if (watchlist.find(isWatchList)) {
            setIsOnWatchList(true)
        }
    }, [watchlist])

    function handleClick() {
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

    return (
        <div className="NftTile">
            <h3>{nft.name}</h3>
            <img src={nft.image_url} alt="nft icon" />
            <br />
            <span>{"✦".repeat(nft.rarity)}</span>
            <p>{nft.chain}: {nft.latest_price.price_nft}</p>
            <p> Supply: {nft.supply}</p>
            {isOnWatchList ? <button disabled>In Watchlist</button> : <button onClick={handleClick}>Add to Watchlist</button>}
        </div>
    )
}

export default NftTile
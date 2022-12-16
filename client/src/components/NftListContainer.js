import { useEffect, useState } from "react";
import NftTile from "./NftTile";
import Search from "./Search";

function NftListContainer({ nfts, user, watchlist }) {
    const [nftList, setNftList] = useState([]);

    useEffect(() => setNftList(nfts), [nfts]);

    const filterNfts = (searchQuery) => {
        setNftList([...nfts].filter(nft => {
            return nft.name.toLowerCase().includes(searchQuery)
        }))
    }
    const renderedNftList = nftList.map(nft => {
        return <NftTile key={nft.id} nft={nft} user={user} watchlist={watchlist} />
    })

    return (
        <div id="nft-list-container">
            {/* <h1>Exchange</h1> */}
            <Search filterNfts={filterNfts} />
            {renderedNftList}
        </div>
    )
}

export default NftListContainer
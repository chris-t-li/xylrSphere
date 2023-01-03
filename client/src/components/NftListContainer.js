import { useEffect, useState } from "react";
import NftTile from "./NftTile";
import Search from "./Search";


function NftListContainer({ nfts, user, watchlist, fetchNfts }) {
    const [nftList, setNftList] = useState([]);

    useEffect(() => setNftList(nfts), [nfts]);

    const filterNfts = (searchQuery) => {
        setNftList([...nfts].filter(nft => {
            return nft.name.toLowerCase().includes(searchQuery)
        }))
    }
    const renderedNftList = nftList.map(nft => {
        return <NftTile key={nft.id} nft={nft} user={user} watchlist={watchlist} fetchNfts={fetchNfts} />
    })

    return (
        <div id="nft-list-container">
            <Search filterNfts={filterNfts} />
            {renderedNftList}

        </div>
    )
}

export default NftListContainer
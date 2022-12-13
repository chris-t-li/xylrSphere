import NftTile from "./NftTile";

function NftListContainer({ nfts }) {

    const nftList = nfts.map(nft => {
        return (<NftTile key={nft.id} nft={nft} />)
    })

    return nftList
}

export default NftListContainer
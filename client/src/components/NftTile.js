function NftTile({ nft }) {
    return (
        <div>
            <h3>{nft.name}</h3>
            <img src={nft.image_url} alt="nft icon" />
            <p> Supply: {nft.supply}</p>
            <span>Rare: {nft.rarity}</span>
        </div>
    )
}

export default NftTile
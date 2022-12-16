import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NftDetails from "./NftDetails";


function NftMain({ nfts }) {
    const { nft_id } = useParams();
    const [selectedNft, setSelectedNft] = useState({});

    // useEffect(() => {
    //     console.log(nfts.filter(nft => nft.id === nft_id))
    //     setSelectedNft(nfts.filter(nft => nft.id === nft_id))
    // }, [nft_id])

    return (
        <div style={{ marginLeft: "50px" }}>
            <NftDetails />
        </div>
    )
}

export default NftMain;
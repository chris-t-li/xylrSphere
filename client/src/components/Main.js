import { useState, useEffect } from "react";
import NftListContainer from "./NftListContainer";


function Main() {
    const [nfts, setNFTs] = useState([]);

    useEffect(() => {
        fetch("/nfts")
            .then(r => r.json())
            .then(data => setNFTs(data))
    }, [])

    return (
        <NftListContainer nfts={nfts} />
    )
}

export default Main


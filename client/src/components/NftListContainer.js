import { useEffect, useState } from "react";
import NftTile from "./NftTile";
import Search from "./Search";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import BuyNftDetails from "./BuyNftDetails";

function NftListContainer({ nfts, user, watchlist, fetchNfts, setReFetch }) {
    const [nftList, setNftList] = useState([]);
    const [selectBuyNFT, setSelectBuyNFT] = useState();
    const [show, setShow] = useState(false);
    const [currentPrice, setCurrentPrice] = useState(0);
    const handleClose = () => {
        setShow(false);
        // setReFetch(value => !value);
    };
    const handleShow = (nft, currentPrice) => {
        setShow(true);
        setSelectBuyNFT(nft);
        setCurrentPrice(currentPrice);
    };

    useEffect(() => setNftList(nfts), [nfts]);

    const filterNfts = (searchQuery) => {
        setNftList([...nfts].filter(nft => {
            return nft.name.toLowerCase().includes(searchQuery)
        }))
    }
    const renderedNftList = nftList.map(nft => {
        return <NftTile key={nft.id} nft={nft} user={user} watchlist={watchlist} fetchNfts={fetchNfts} handleShow={handleShow} />
    })

    return (
        <div id="nft-list-container">
            <Search filterNfts={filterNfts} />
            {renderedNftList}
            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {selectBuyNFT && selectBuyNFT.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectBuyNFT && <BuyNftDetails selectBuyNFT={selectBuyNFT} setReFetch={setReFetch} currentPrice={currentPrice} />}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>Close</Button>
                </Modal.Footer>

            </Modal>
        </div>
    )
}

export default NftListContainer
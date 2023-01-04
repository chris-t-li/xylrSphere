import { useState, useEffect } from "react";
import Table from "react-bootstrap/table";
import PortoflioListItem from "./PortfolioListItem";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import SellNFTDetails from "./SellNFTDetails";

function Portfolio({ user, autoLogin, portfolioList, fetchPortfolio, reFetch, setReFetch }) {
    const [portfolioPriceData, setPortfolioPriceData] = useState([]);
    const [selectSellNFT, setSelectSellNFT] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        setReFetch(value => !value);
    };
    const handleShow = (nft) => {
        setShow(true);
        setSelectSellNFT(nft);
    };

    useEffect(() => autoLogin(), [])
    useEffect(() => fetchPortfolio(), [user, reFetch])
    useEffect(() => {
        if (!user) {
            return
        }

        fetch(`/portfolio_pricings/${user.id}`)
            .then(r => r.json())
            .then(priceData => {
                // console.log(priceData)
                setPortfolioPriceData(priceData)
            })
    }, [user])

    const renderMyPortfolio = portfolioList.map(nft => {

        return <PortoflioListItem
            key={nft.id}
            nft={nft}
            user={user}
            // setReFetch={setReFetch}
            portfolioPriceData={portfolioPriceData}
            handleShow={handleShow}
        />
    })

    return (
        <div id="watchlist-container"
            style={{
                marginLeft: "210px",
                maxWidth: "90vw"

            }}>
            <h2>My Portfolio</h2>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        {/* <th style={{ width: "3%" }}>#</th> */}
                        <th style={{ width: "5%" }}>Icon</th>
                        <th style={{ width: "20%" }}>Name</th>
                        <th style={{ width: "5%" }}>Coin</th>
                        <th>Last Price</th>
                        <th>Purchase Price</th>
                        <th>Change</th>
                        <th>Rating</th>
                        <th style={{ width: "3%" }}>Chart</th>
                        <th style={{ width: "3%" }}>Move</th>
                        <th style={{ width: "3%" }}>Sell</th>
                    </tr>
                </thead>
                <tbody>
                    {renderMyPortfolio}
                </tbody>
            </Table>
            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Selling... {selectSellNFT && selectSellNFT.nft.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectSellNFT && <SellNFTDetails selectSellNFT={selectSellNFT} setReFetch={setReFetch} />}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>Close</Button>
                </Modal.Footer>

            </Modal>
        </div>
    )
}

export default Portfolio
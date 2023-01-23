import { useState, useEffect } from "react";
import WalletTable from "./WalletTable";
import AddToWallet from "./AddToWallet"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PaymentStatus from "./PaymentStatus";

function Wallet({ user, autoLogin }) {
    const [walletData, setWalletData] = useState([]);
    const [walletUpdate, setWalletUpdate] = useState(false);
    const [show, setShow] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const handleClose = () => {
        setShow(false);
        setPaymentSuccess(false);
    };
    const handleShow = () => setShow(true);

    useEffect(() => autoLogin(), [])

    useEffect(() => {
        if (!user) {
            return
        }

        fetch(`/wallets/${user.id}`)
            .then(r => {
                if (r.ok) {
                    r.json().then(wallet => {
                        setWalletData(wallet)
                    })
                }
            })
    }, [user, walletUpdate])

    return (
        <div id="wallet-container" style={{ marginTop: "2em" }}>
            <h1>Wallet</h1>
            <WalletTable walletData={walletData} walletUpdate={walletUpdate} />
            <Button
                variant="primary"
                onClick={handleShow}
            >Top Up</Button>

            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Top Up
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddToWallet user={user} autoLogin={autoLogin} setWalletUpdate={setWalletUpdate}
                        paymentSuccess={paymentSuccess}
                        setPaymentSuccess={setPaymentSuccess}
                    />
                    {paymentSuccess && <PaymentStatus />}

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>Close</Button>
                </Modal.Footer>

            </Modal>


        </div>
    )
}

export default Wallet;
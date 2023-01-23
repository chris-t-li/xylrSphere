import { useState } from "react";
import { PaymentElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from "./CheckoutForm";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from "react-bootstrap/table";

// const myModule = require("../key");
key = process.env.STRIPE_PUBLIC_KEY
// const key = myModule.key;
// const coinKey = myModule.coinkey;
const stripePromise = loadStripe(key);

function AddToWallet({ user, autoLogin, setWalletUpdate, paymentSuccess, setPaymentSuccess }) {
    const [addToWalletData, setAddToWalletData] = useState({
        coin: "",
        qty: 0,
        price: 0
    })
    // Stripe Options Config
    const [options, setOptions] = useState();

    function handleChange(e) {
        setAddToWalletData({ ...addToWalletData, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/secret", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(addToWalletData)
        })
            .then(r => {
                if (r.ok) {
                    r.json().then(res => {
                        console.log(res)
                        setOptions({
                            clientSecret: res.client_secret,
                            appearance: { theme: 'night', labels: 'floating' }
                        })
                    })
                }
            })
    }

    function getCoinPrice() {
        // console.log("fetch coin price")
        fetch(`/coin?ticker=${addToWalletData.coin}`)
            .then(r => r.json())
            .then(priceData => {
                console.log(priceData);
                setAddToWalletData({ ...addToWalletData, price: priceData.last_price });
            })
    }

    return (
        <div id="stripe-checkout">
            {!paymentSuccess && <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Quantity</label>
                    <Form.Control
                        type="decimal"
                        name="qty"
                        min='0'
                        value={addToWalletData.qty}
                        placeholder="Qty"
                        onChange={handleChange}>

                    </Form.Control>
                </div>
                <div className="form-group">
                    <label>Coin</label>
                    <Form.Select name="coin" value={addToWalletData.coin} onChange={handleChange}>
                        <option></option>
                        <option>ETH</option>
                        <option>BNB</option>
                        <option>SOL</option>
                        <option>AVAX</option>
                    </Form.Select>
                </div>
                <div className="d-flex justify-content-center">
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={getCoinPrice}
                        style={{ margin: "0.5em 0" }}
                    >Get Prices</Button>
                </div>
            </form>}
            {
                options ?
                    <div>
                        <Table striped bordered hover variant="dark"
                        >
                            <thead className="thead-dark">
                                <tr>
                                    <th>Description</th>
                                    <th className="text-end">$</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Last Price:</td>
                                    <td className="text-end">${addToWalletData.price === 0 ? null : addToWalletData.price.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td>Processing Fee:</td>
                                    <td className="text-end">$5.00</td>
                                </tr>
                                <tr>
                                    <td>Total Cost:</td>
                                    <td className="text-end">${(addToWalletData.price * addToWalletData.qty + 5).toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <Elements stripe={stripePromise} options={options}>
                            <PaymentElement />
                            <CheckoutForm
                                addToWalletData={addToWalletData}
                                user={user}
                                autoLogin={autoLogin}
                                setOptions={setOptions}
                                setWalletUpdate={setWalletUpdate} setAddToWalletData={setAddToWalletData}
                                setPaymentSuccess={setPaymentSuccess}

                            />

                        </Elements>
                    </div>
                    : null
            }

        </div >
    )
}

export default AddToWallet;
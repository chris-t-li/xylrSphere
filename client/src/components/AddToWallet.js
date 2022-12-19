import { useState } from "react";
import { PaymentElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from "./CheckoutForm";

const myModule = require("../key");
const key = myModule.key;
const coinKey = myModule.coinkey;
const stripePromise = loadStripe(key);

function AddToWallet({ setMessage }) {
    const [addToWalletData, setAddToWalletData] = useState({
        coin: "",
        qty: 0
    })
    // Stripe Options Config
    const [options, setOptions] = useState();

    function handleChange(e) {
        setAddToWalletData({ ...addToWalletData, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/secret")
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
        console.log("fetch coin price")
        fetch("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest", {
            headers: {
                "X-CMC_PRO_API_KEY": coinKey
            }
        })
            .then(r => r.json())
            .then(console.log)
    }

    return (
        <div id="stripe-checkout">
            <h2>Add to Wallet</h2>
            <form onSubmit={handleSubmit}>
                <select name="coin" value={addToWalletData.coin} onChange={handleChange}>
                    <option>ETH</option>
                    <option>BNB</option>
                    <option>SOL</option>
                </select>
                <input type="number" name="qty" min='0' value={addToWalletData.qty} placeholder="Qty" onChange={handleChange}></input>
                <button onClick={getCoinPrice}>Get Coin</button>
                <input type="submit" value="Buy Coins"></input>
            </form>
            {
                options ?
                    <Elements stripe={stripePromise} options={options}>
                        <CheckoutForm setMessage={setMessage} />
                        <PaymentElement />
                    </Elements> : null
            }

        </div >
    )
}

export default AddToWallet;
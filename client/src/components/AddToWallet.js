import { useState } from "react";
import { PaymentElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from "./CheckoutForm";

const myModule = require("../key");
const key = myModule.key;
// const coinKey = myModule.coinkey;
const stripePromise = loadStripe(key);

function AddToWallet({ user, autoLogin, setWalletUpdate }) {
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
            <h2>Top Up</h2>
            <form onSubmit={handleSubmit}>
                <input type="decimal" name="qty" min='0' value={addToWalletData.qty} placeholder="Qty" onChange={handleChange}></input>
                <select name="coin" value={addToWalletData.coin} onChange={handleChange}>
                    <option></option>
                    <option>ETH</option>
                    <option>BNB</option>
                    <option>SOL</option>
                </select>
                <button onClick={getCoinPrice}>Get Coin</button>
                {/* <input type="submit" value="Buy Coins"></input> */}
            </form>
            <p>+5 USD transaction fee</p>
            <p>Last Price: {addToWalletData.price === 0 ? null : addToWalletData.price.toFixed(2)}</p>
            <p>Total Cost: {(addToWalletData.price * addToWalletData.qty + 5).toFixed(2)}</p>
            {
                options ?
                    <Elements stripe={stripePromise} options={options}>
                        <PaymentElement />
                        <CheckoutForm
                            addToWalletData={addToWalletData}
                            user={user}
                            autoLogin={autoLogin}
                            setOptions={setOptions}
                            setWalletUpdate={setWalletUpdate} setAddToWalletData={setAddToWalletData}
                        />

                    </Elements> : null
            }

        </div >
    )
}

export default AddToWallet;
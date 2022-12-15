import { useEffect, useState } from "react";
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from '@stripe/stripe-js';

const myModule = require("../key")
const key = myModule.key
const stripePromise = loadStripe(key);

function AddToWallet() {
    const [options, setOptions] = useState();

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

    return (
        <div id="stripe-checkout">
            <h2>Add to Wallet</h2>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Search Coin"></input>
                <input type="text" placeholder="Qty"></input>
                <input type="submit" value="Buy Coins"></input>

                {options ?
                    <Elements stripe={stripePromise} options={options}>
                        <PaymentElement />
                    </Elements> : null}
            </form>

        </div>
    )
}

export default AddToWallet;
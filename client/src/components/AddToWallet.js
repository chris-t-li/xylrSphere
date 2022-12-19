import { useState } from "react";
import { PaymentElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from "./CheckoutForm";
import PaymentStatus from "./PaymentStatus";

const myModule = require("../key")
const key = myModule.key
const stripePromise = loadStripe(key);

function AddToWallet({ setMessage }) {


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
            </form>
            {options ?
                <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm setMessage={setMessage} />
                    <PaymentElement />
                    {/* <PaymentStatus /> */}
                </Elements> : null}

        </div>
    )
}

export default AddToWallet;
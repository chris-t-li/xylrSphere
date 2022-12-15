import { useState } from 'react';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

function CheckoutForm({ options }) {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState(null);

    function submitPayment(e) {
        e.preventDefault();
        console.log("procesing payment...")

        if (!stripe || !elements) {
            return;
        }


    }

    return (
        <form onSubmit={submitPayment}>

            <input type="submit"></input>
        </form>
    )
}

export default CheckoutForm;
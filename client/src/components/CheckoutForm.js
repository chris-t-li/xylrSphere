import { useEffect, useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import PaymentStatus from './PaymentStatus';

function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");

        if (!clientSecret) {
            return;
        }

        stripe
            .retrievePaymentIntent(clientSecret)
            .then(({ paymentIntent }) => {
                debugger
                switch (paymentIntent.status) {
                    case "succeeded":
                        setMessage("Success! Payment received.");
                        break;
                    case "processing":
                        setMessage("Payment processing. We'll update you when payment is received.");
                        break;
                    case "requires_payment_method":
                        setMessage("Payment failed. Please try another payment method.");
                        break;
                    default:
                        setMessage("Something went wrong.");
                        break;
                }
            });
    }, [stripe]);

    const submitPayment = async (e) => {
        e.preventDefault();
        console.log("procesing payment...")

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:4000/paymentstatus",
            },
        })

        if (error) {
            setErrorMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    }

    return (
        <div>
            <form onSubmit={submitPayment}>
                <button disabled={isLoading || !stripe || !elements}>Submit</button>
                {errorMessage && <div>{errorMessage}</div>}
            </form>
        </div>
    )
}

export default CheckoutForm;
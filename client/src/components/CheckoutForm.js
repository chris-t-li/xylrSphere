import { useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import Button from 'react-bootstrap/Button';
// import PaymentStatus from './PaymentStatus';

function CheckoutForm({ user, addToWalletData, setAddToWalletData, setOptions, setWalletUpdate, handleClose }) {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const updateWallet = () => {
        console.log("running update wallet")
        fetch(`/wallets`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: user.id,
                coin: addToWalletData.coin,
                qty: addToWalletData.qty,
            })
        })
            .then(r => r.json())
            .then(wallet => {
                console.log(wallet)
                setWalletUpdate(status => !status)
            })
    }

    const handleClick = async (e) => {
        e.preventDefault();
        console.log("procesing payment...")

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const response = await stripe.confirmPayment({
            elements,
            redirect: "if_required"
        })

        if (response.error) {
            setErrorMessage(response.error.message);
        } else {
            console.log("payment successful")
            updateWallet();
            handleClose();
            setOptions(null); // closes Stripe Payment Elements

        }

        setIsLoading(false);
    }

    return (
        <div>
            <form
            // onSubmit={submitPayment}
            >
                {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
                <Button
                    disabled={isLoading || !stripe || !elements}
                    variant="primary"
                    style={{ margin: "0.5em 17em" }}
                    onClick={handleClick}
                >
                    Buy Coins
                </Button>
            </form>
            {/* {showPaymentSuccess && <PaymentStatus />} */}
        </div>
    )
}

export default CheckoutForm;
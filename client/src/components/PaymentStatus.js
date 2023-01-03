import { Link } from "react-router-dom";


function PaymentStatus() {
    return (
        <div style={{ margin: "0 0 3em" }}>
            <h2>Payment Successful!</h2>
            <p>Your wallet has been updated</p>
            {/* <Link to="/wallet">Back to Wallet</Link> */}
        </div>
    )
}

export default PaymentStatus;
import { Link } from "react-router-dom";


function PaymentStatus() {
    return (
        <div style={{ marginLeft: "200px" }}>
            <h1>Payment Successful!</h1>
            <Link to="/wallet">Back to Wallet</Link>
        </div>
    )
}

export default PaymentStatus;
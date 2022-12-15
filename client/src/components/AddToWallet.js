
function AddToWallet() {
    function handleSubmit(e) {
        e.preventDefault();
        fetch("/secret")
            .then(r => {
                if (r.ok) {
                    r.json().then(console.log)
                }
            })
    }

    return (
        <div>
            <h2>Add to Wallet</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Search Coin"></input>
                <input type="text" placeholder="Qty"></input>
                <input type="submit"></input>
            </form>
        </div>
    )
}

export default AddToWallet;
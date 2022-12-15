

function WalletTable({ walletData }) {
    const renderWalletData = walletData.map(entry => {
        return (
            <tr key={entry.id}>
                <td><button>+</button></td>
                <td>{entry.coin.ticker}</td>
                <td>"Icon"</td>
                <td>{entry.coin.name}</td>
                <td>{entry.coin.last_price}</td>
                <td>{entry.quantity}</td>
                <td>{(entry.coin.last_price * entry.quantity).toFixed(2)}</td>
            </tr>
        )
    })

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Ticker</th>
                        <th>Icon</th>
                        <th>Coin</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {renderWalletData}
                </tbody>
            </table>
        </div>
    )
}

export default WalletTable;
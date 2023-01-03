import Table from "react-bootstrap/table";

function WalletTable({ walletData }) {
    const renderWalletData = walletData.map(entry => {
        const dateDetails = new Date(entry.coin.updated_at)
        // debugger

        return (
            <tr key={entry.id}>

                <td>{entry.coin.ticker}</td>
                <td className="text-center"><img src={entry.coin.icon} /></td>
                <td>{entry.coin.name}</td>
                <td className="text-end">{entry.coin.last_price.toFixed(2)}</td>
                <td className="text-end">{entry.quantity.toFixed(4)}</td>
                <td className="text-end">{(entry.coin.last_price * entry.quantity).toFixed(2)}</td>
                <td className="text-end">{dateDetails.toTimeString().substring(0, 5)}</td>
                <td className="text-end">{dateDetails.toISOString().substring(0, 10)}</td>
            </tr>
        )
    })

    return (
        <div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>

                        <th >Ticker</th>
                        <th

                        >Icon</th>
                        <th >Coin</th>
                        <th className="text-end">Price</th>
                        <th className="text-end">Qty</th>
                        <th className="text-end">Value</th>
                        <th className="text-end">Time Updated</th>
                        <th className="text-end">Date Updated</th>
                    </tr>
                </thead>
                <tbody>
                    {renderWalletData}
                </tbody>
            </Table>
        </div>
    )
}

export default WalletTable;
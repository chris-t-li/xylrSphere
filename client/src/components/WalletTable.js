import Table from "react-bootstrap/table";

function WalletTable({ walletData }) {
    const renderWalletData = walletData.map(entry => {
        return (
            <tr key={entry.id}>

                <td>{entry.coin.ticker}</td>
                <td class="text-center"><img src={entry.coin.icon} /></td>
                <td>{entry.coin.name}</td>
                <td class="text-end">{entry.coin.last_price.toFixed(2)}</td>
                <td class="text-end">{entry.quantity.toFixed(4)}</td>
                <td class="text-end">{(entry.coin.last_price * entry.quantity).toFixed(2)}</td>
            </tr>
        )
    })

    return (
        <div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>

                        <th style={{ width: "15%" }}>Ticker</th>
                        <th style={{ width: "5%" }}

                        >Icon</th>
                        <th style={{ width: "20%" }}>Coin</th>
                        <th class="text-end">Price</th>
                        <th class="text-end">Qty</th>
                        <th class="text-end">Value</th>
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
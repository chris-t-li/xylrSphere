import { useState, useEffect } from "react";
import WalletTable from "./WalletTable";

function Wallet({ user }) {
    const [walletData, setWalletData] = useState([]);

    useEffect(() => {
        fetch(`/wallets/${user.id}`)
            .then(r => {
                if (r.ok) {
                    r.json().then(wallet => {
                        setWalletData(wallet)
                    })
                }
            })
    }, [user])

    return (
        <div>
            <h1>Wallet</h1>
            <WalletTable walletData={walletData} />
        </div>
    )
}

export default Wallet;
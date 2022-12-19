import { useState, useEffect } from "react";
import WalletTable from "./WalletTable";
import AddToWallet from "./AddToWallet"


function Wallet({ user, autoLogin, setMessage }) {
    const [walletData, setWalletData] = useState([]);

    useEffect(() => autoLogin(), [])

    useEffect(() => {
        if (!user) {
            return
        }

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
        <div id="wallet-container">
            <h1>Wallet</h1>
            <WalletTable walletData={walletData} />
            <AddToWallet setMessage={setMessage} />

        </div>
    )
}

export default Wallet;
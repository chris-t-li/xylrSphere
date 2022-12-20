import { useState, useEffect } from "react";
import WalletTable from "./WalletTable";
import AddToWallet from "./AddToWallet"


function Wallet({ user, autoLogin }) {
    const [walletData, setWalletData] = useState([]);
    const [walletUpdate, setWalletUpdate] = useState(false);

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
    }, [user, walletUpdate])

    return (
        <div id="wallet-container">
            <h1>Wallet</h1>
            <WalletTable walletData={walletData} walletUpdate={walletUpdate} />
            <AddToWallet user={user} autoLogin={autoLogin} setWalletUpdate={setWalletUpdate} />

        </div>
    )
}

export default Wallet;
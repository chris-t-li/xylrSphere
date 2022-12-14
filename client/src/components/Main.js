import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NftListContainer from "./NftListContainer";
import Login from "./Login";
import Profile from "./Profile";
import Watchlist from "./Watchlist";
import NftMain from "./NftMain.js";
import Portfolio from "./Portfolio";
import Signup from "./Signup";


function Main({ user, setUser }) {
    const [nfts, setNFTs] = useState([]);

    useEffect(() => {
        fetch("/nfts")
            .then(r => r.json())
            .then(data => setNFTs(data))
    }, [])

    return (
        <main>

            <Routes>
                <Route path="/" element={<NftListContainer nfts={nfts} user={user} setUser={setUser} />} />
                <Route path="/login" element={<Login user={user} setUser={setUser} />} />
                <Route path="/signup" element={<Signup setUser={setUser} />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="/nftmain" element={<NftMain />} />
                <Route path="/portfolio" element={<Portfolio />} />
            </Routes>

        </main>
    )
}

export default Main


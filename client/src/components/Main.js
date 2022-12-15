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
    const [watchlist, setWatchlist] = useState([]);
    const [reFetch, setReFetch] = useState(false);

    useEffect(() => {
        fetch("/nfts")
            .then(r => r.json())
            .then(data => setNFTs(data))
    }, [])

    useEffect(() => {
        fetch(`/watchlist/${user.id}`)
            .then(r => r.json())
            .then(listData => {
                setWatchlist(listData.filter(listItem => {
                    return listItem.watchlist === true
                }));
            })
    }, [user, reFetch])

    return (
        <main>

            <Routes>
                <Route path="/" element={
                    <NftListContainer
                        nfts={nfts}
                        user={user}
                        setUser={setUser}
                        watchlist={watchlist}
                    />} />
                <Route path="/login" element={<Login user={user} setUser={setUser} />} />
                <Route path="/signup" element={<Signup setUser={setUser} />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/watchlist" element={<Watchlist
                    user={user}
                    watchlist={watchlist}
                    setReFetch={setReFetch}
                />} />
                <Route path="/nftmain" element={<NftMain />} />
                <Route path="/portfolio" element={<Portfolio />} />
            </Routes>

        </main>
    )
}

export default Main


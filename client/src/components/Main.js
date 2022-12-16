import { useState, useEffect } from "react";
import { Routes, Route, useParams, Link } from "react-router-dom";
import NftListContainer from "./NftListContainer";
import Login from "./Login";
import Profile from "./Profile";
import Watchlist from "./Watchlist";
import Wallet from "./Wallet";
import Portfolio from "./Portfolio";
import NftMain from "./NftMain";
import Signup from "./Signup";
import NoMatch from "./NoMatch";
import NftDetails from "./NftDetails";

function Main({ user, setUser }) {
    const [nfts, setNFTs] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [reFetch, setReFetch] = useState(false);
    let { nft_id } = useParams();


    useEffect(() => {
        fetch("/nfts")
            .then(r => r.json())
            .then(data => setNFTs(data))
    }, [])

    useEffect(() => {
        fetchWatchlist();
    }, [user, reFetch])

    function fetchWatchlist() {
        if (user) {
            fetch(`/watchlist/${user.id}`)
                .then(r => r.json())
                .then(listData => {
                    setWatchlist(listData.filter(listItem => {
                        return listItem.watchlist === true
                    }));
                })
        } else {
            return
        }
    }

    return (
        <main>
            <nav>
                {/* These NAV links should be attached to the Images in each NFT Tile */}
                <Link to="/nfts">Exchange</Link>
                <Link to="/watchlist">Watchlist</Link>
            </nav>

            <Routes>
                <Route path="/nfts" element={
                    <NftListContainer
                        nfts={nfts}
                        user={user}
                        setUser={setUser}
                        watchlist={watchlist}
                    />} >
                    {/* <Route index element={<NftListContainer
                        nfts={nfts}
                        user={user}
                        setUser={setUser}
                        watchlist={watchlist}
                    />} />
                    <Route path=":nft_id" element={<NftDetails />} /> */}

                </Route>

                <Route path="/nftmain" element={<NftMain nfts={nfts} />} >
                    <Route index element={<NftMain nfts={nfts} />} />
                    <Route path=":nft_id" element={<NftDetails />} />
                </Route>

                <Route path="/login" element={<Login user={user} setUser={setUser} />} />
                <Route path="/signup" element={<Signup setUser={setUser} />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/watchlist" element={<Watchlist
                    user={user}
                    watchlist={watchlist}
                    reFetch={reFetch}
                    setReFetch={setReFetch}
                    fetchWatchlist={fetchWatchlist}
                />} />
                <Route exact path="/wallet" element={<Wallet user={user} />} >

                </Route>
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/*" element={<NoMatch />} />
            </Routes>

        </main>
    )
}

export default Main


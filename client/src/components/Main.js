import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import SideNavBar from './SideNavBar';
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
import PaymentStatus from "./PaymentStatus";

function Main({ user, setUser, autoLogin }) {
    const [nfts, setNFTs] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [portfolioList, setPortfolioList] = useState([]);
    const [reFetch, setReFetch] = useState(false);
    const navigate = useNavigate();

    useEffect(() => fetchNfts(0), [reFetch])
    useEffect(() => fetchWatchlist(), [user, reFetch])

    function fetchNfts(pageIndex) {
        fetch(`/nfts?fetch_num=${pageIndex}`)
            .then(r => r.json())
            .then(data => {
                setNFTs(data)
                // console.log(data)
            })
    }

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

    function fetchPortfolio() {
        if (user) {
            fetch(`/portfolio/${user.id}`)
                .then(r => r.json())
                .then(listData => {
                    // console.log(listData)
                    setPortfolioList(listData.filter(listItem => {
                        return listItem.ownership
                    }))
                })
        }
    }

    function redirectToLogin() {
        navigate('/login');
    }

    return (
        <main>
            {/* <nav>
                These NAV links should be attached to the Images in each NFT Tile
                <Link to="/nfts">Exchange</Link>
                <Link to="/watchlist">Watchlist</Link>
            </nav> */}
            <SideNavBar user={user} setUser={setUser} setWatchlist={setWatchlist} setPortfolioList={setPortfolioList} redirectToLogin={redirectToLogin} />
            <Routes>
                <Route path="/nfts" element={
                    <NftListContainer
                        nfts={nfts}
                        user={user}
                        setUser={setUser}
                        watchlist={watchlist}
                        fetchNfts={fetchNfts}
                    />} >
                </Route>

                <Route path="/nftmain" element={<NftMain setReFetch={setReFetch} />} >
                    <Route index element={<NftMain nfts={nfts} />} />
                    <Route path=":nft_id" element={<NftDetails />} />
                </Route>

                <Route path="/login" element={<Login user={user} setUser={setUser} />} />
                <Route path="/signup" element={<Signup setUser={setUser} />} />
                <Route path="/profile" element={<Profile user={user} />} />
                <Route path="/watchlist"
                    element={
                        <Watchlist
                            user={user}
                            watchlist={watchlist}
                            reFetch={reFetch}
                            setReFetch={setReFetch}
                            fetchWatchlist={fetchWatchlist}
                        />}
                />
                <Route path="/wallet" element={<Wallet user={user} autoLogin={autoLogin} />} />
                <Route path="/portfolio"
                    element={
                        <Portfolio
                            user={user}
                            autoLogin={autoLogin}
                            portfolioList={portfolioList}
                            fetchPortfolio={fetchPortfolio}
                            reFetch={reFetch}
                            setReFetch={setReFetch}
                        />}
                />
                <Route path="/*" element={<NoMatch />} />
                <Route path="paymentstatus" element={<PaymentStatus />} />
            </Routes>

        </main>
    )
}

export default Main


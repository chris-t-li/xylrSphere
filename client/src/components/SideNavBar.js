import { useNavigate } from "react-router-dom";

function SideNavBar({ user, setUser, setWatchlist, setPortfolioList, redirectToLogin }) {
    const navigate = useNavigate();

    function handleClick() {
        if (user) {
            fetch("/login", { method: "DELETE" });
            setUser(null);
            setWatchlist([]);
            setPortfolioList([]);
        }
        redirectToLogin();
    }

    return (
        <div className="sideNavBar">
            <h1 id="xylrsphere-main-heading">xylrSphere</h1>
            <nav className="sideNavBar" >
                <ul>
                    <li className="sideNavBarLinks" onClick={() => navigate("/nfts")}>Exchange
                    </li>
                    {user && <li className="sideNavBarLinks" onClick={() => navigate("/profile")}>Profile</li>}
                    {user && <li className="sideNavBarLinks" onClick={() => navigate("/portfolio")}>Portfolio</li>}
                    {user && <li className="sideNavBarLinks" onClick={() => navigate("/watchlist")}>Watchlist</li>}

                    {user && <li className="sideNavBarLinks" onClick={() => navigate("/wallet")}>Wallet</li>}
                    <li className="sideNavBarLinks" onClick={handleClick}>{user ? "Logout" : "Login"}</li>
                    {!user && <li className="sideNavBarLinks" onClick={() => navigate("/signup")}>SignUp</li>}
                </ul>
            </nav>
        </div>
    )
}

export default SideNavBar;
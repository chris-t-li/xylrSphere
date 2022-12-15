import { useNavigate } from "react-router-dom";

function SideNavBar({ user, setUser }) {
    const navigate = useNavigate();

    function handleClick() {
        if (user) {
            fetch("/login", { method: "DELETE" })
            setUser(null)
            navigate('/login')
        } else {
            navigate('/login')
        }
    }

    return (
        <div className="sideNavBar">
            <h1>XylrSphere</h1>
            <nav className="sideNavBar">
                <ul>
                    <li onClick={() => navigate("/home")}>Exchange</li>
                    <li onClick={() => navigate("/profile")}>Profile</li>
                    <li>Portfolio</li>
                    {user ? <li onClick={() => navigate("/watchlist")}>Watchlist</li> : null}
                    <li onClick={() => navigate("/nftmain")}>NFT Details</li>
                    <li onClick={() => navigate("/wallet")}>Wallet</li>
                    <li onClick={() => navigate("/signup")}>SignUp</li>
                    <li onClick={handleClick}>{user ? "Logout" : "Login"}</li>
                </ul>
            </nav>
        </div>
    )
}

export default SideNavBar;
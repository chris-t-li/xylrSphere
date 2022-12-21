import { useNavigate } from "react-router-dom";
// import Nav from "react-bootstrap/Nav";

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
            <h1 id="xylrsphere-main-heading">XylrSphere</h1>
            <nav className="sideNavBar" >
                <ul>
                    <li onClick={() => navigate("/nfts")}>Exchange
                    </li>
                    {user && <li onClick={() => navigate("/profile")}>Profile</li>}
                    {user && <li onClick={() => navigate("/portfolio")}>Portfolio</li>}
                    {user && <li onClick={() => navigate("/watchlist")}>Watchlist</li>}

                    {user && <li onClick={() => navigate("/wallet")}>Wallet</li>}
                    <li onClick={handleClick}>{user ? "Logout" : "Login"}</li>
                    {!user && <li onClick={() => navigate("/signup")}>SignUp</li>}
                </ul>
            </nav>
        </div>
    )
}

export default SideNavBar;
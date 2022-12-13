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
                    <li onClick={() => navigate("/")}>Exchange</li>
                    <li>Profile</li>
                    <li>Portfolio</li>
                    <li>Watchlist</li>
                    <li>Wallet</li>
                    <li onClick={() => navigate("/signup")}>SignUp</li>
                    <li onClick={handleClick}>{user ? "Logout" : "Login"}</li>
                </ul>
            </nav>
        </div>
    )
}

export default SideNavBar;
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ user, setUser }) {
    const [loginData, setLoginData] = useState({ username: "", password: "" })
    const navigate = useNavigate();

    function handleChange(e) {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }

    function handleLogin(e) {
        e.preventDefault();
        fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData)
        })
            .then(r => {
                if (r.ok) {
                    r.json().then(user => {
                        setLoginData({ username: "", password: "" })
                        setUser(user)
                        navigate("/home")
                    })
                } else {
                    alert("Invalid Signin Details")
                }
            })

            .catch(e => console.error(e))
    }

    return (
        <div>
            <h3>Login Page</h3>
            <form onSubmit={handleLogin}>
                <input type="text" name="username" placeholder="username" onChange={handleChange} value={loginData.username} />
                <br />
                <input type="password" name="password" placeholder="password" onChange={handleChange} value={loginData.password} />
                <br />
                <input type="submit" name="login" value="login" />
            </form>
        </div>
    )
}

export default Login
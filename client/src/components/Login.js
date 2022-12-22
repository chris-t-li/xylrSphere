import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';

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
                        navigate("/nfts")
                    })
                } else {
                    alert("Invalid Signin Details")
                }
            })

            .catch(e => console.error(e))
    }

    return (
        <div id="login-container" className="col-4" style={{ backgroundColor: "black" }}>

            <img
                src="/futuregloba.gif"
                alt="futuristic globe"
                style={{
                    width: "90.2vw",
                    height: "100vh",
                    overflow: "hidden"

                }} />

            <Form autoComplete="off"
                onSubmit={handleLogin}
                style={{
                    position: "absolute",
                    top: "25vh",
                    left: "17vw",
                    backgroundColor: "rgba(100,100,100,0.5)",
                    padding: "3% 4% 1.5% 4%",
                    borderRadius: "8px",

                }}>
                <h3 style={{ color: "white", margin: "10% 0" }}>Login Page</h3>
                <Form.Group>
                    <Form.Control
                        type="text" placeholder="username" name="username"
                        onChange={handleChange}
                        value={loginData.username}
                        style={{
                            backgroundColor: "black",
                            color: "white",
                            borderColor: "darkblue",
                            margin: "5% 0"
                        }}
                    ></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        type="password" placeholder="Password" name="password"
                        onChange={handleChange}
                        value={loginData.password}
                        style={{
                            backgroundColor: "black",
                            color: "white",
                            borderColor: "darkblue"
                        }}
                    ></Form.Control>
                </Form.Group>

                <button
                    type="submit"
                    style={{ margin: "10% 32%" }}
                    className="btn btn-outline-light"
                >Login</button>
            </Form>
        </div >
    )
}

export default Login
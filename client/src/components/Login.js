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
                        navigate("/home")
                    })
                } else {
                    alert("Invalid Signin Details")
                }
            })

            .catch(e => console.error(e))
    }

    return (
        <div id="login-container" className="col-4" style={{ backgroundColor: "black" }}>

            <img src="/futuregloba.gif" alt="machine learning" style={{ width: "100vw" }} />

            <Form autocomplete="off"
                onSubmit={handleLogin}
                style={{
                    position: "absolute",
                    top: "25vh",
                    left: "17vw",
                    backgroundColor: "rgba(100,100,100,0.5)",
                    padding: "3% 4% 1.5% 4%",
                    borderRadius: "5%"

                }}>
                <h3>Login Page</h3>
                <Form.Group>
                    <Form.Label>User</Form.Label>
                    <Form.Control
                        type="text" placeholder="username" name="username"
                        onChange={handleChange}
                        value={loginData.username}
                        style={{
                            backgroundColor: "black",
                            color: "white",
                            borderColor: "darkblue"
                        }}
                    ></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
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
            {/* <form onSubmit={handleLogin}>
                <input type="text" name="username" placeholder="username" onChange={handleChange} value={loginData.username} />
                <br />
                <input type="password" name="password" placeholder="password" onChange={handleChange} value={loginData.password} />
                <br />
                <input type="submit" name="login" value="login" />
            </form> */}
        </div >
    )
}

export default Login
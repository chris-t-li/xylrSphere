import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';

function Signup({ setUser }) {
    const navigate = useNavigate();
    const [signUpData, setSignUpData] = useState({
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
        avatar_url: ""
    })

    function handleChange(e) {
        setSignUpData({ ...signUpData, [e.target.name]: e.target.value })
    }

    function handleSignUp(e) {
        e.preventDefault();
        if (signUpData.password !== signUpData.passwordConfirm) {
            alert("Passwords are not the same. Please try again")
        } else {
            // Create new user
            fetch("/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signUpData)
            })
                .then(r => r.json())
                .then(newUser => {
                    console.log(newUser);
                    setUser(newUser);
                    setSignUpData({
                        username: "",
                        email: "",
                        password: "",
                        passwordConfirm: "",
                        avatar_url: ""
                    })
                    navigate("/nfts");
                })
                .catch(e => console.error(e))
        }
    }

    return (
        <div id="signup-container">
            <img
                src="/futuregloba.gif"
                alt="futuristic globe"
                style={{
                    width: "90.2vw",
                    height: "100vh",
                    overflow: "hidden"

                }} />

            {signUpData.avatar_url ? <img src={signUpData.avatar_url} alt="avatar preview" /> : null}

            <Form autoComplete="off"
                onSubmit={handleSignUp}
                style={{
                    position: "absolute",
                    top: "25vh",
                    left: "17vw",
                    backgroundColor: "rgba(100,100,100,0.5)",
                    padding: "3% 4% 1.5% 4%",
                    borderRadius: "5%"

                }}>
                <h3 style={{ color: "white", margin: "10% 0" }}>SignUp Page</h3>
                <Form.Group>
                    <Form.Control
                        type="text"
                        name="username"
                        placeholder="username"
                        onChange={handleChange}
                        value={signUpData.username}
                        style={{
                            backgroundColor: "black",
                            color: "white",
                            borderColor: "darkblue",
                            margin: "5% 0"
                        }}>
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        type="text"
                        name="email"
                        placeholder="email"
                        onChange={handleChange}
                        value={signUpData.email}
                        style={{
                            backgroundColor: "black",
                            color: "white",
                            borderColor: "darkblue",
                            margin: "5% 0"
                        }}>
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Control type="password" name="password" required placeholder="password" onChange={handleChange} value={signUpData.password}
                        style={{
                            backgroundColor: "black",
                            color: "white",
                            borderColor: "darkblue",
                            margin: "5% 0"
                        }}
                    >
                    </Form.Control>

                </Form.Group>

                <Form.Group>
                    <Form.Control
                        type="password"
                        name="passwordConfirm"
                        required placeholder="confirm password"
                        onChange={handleChange}
                        value={signUpData.passwordConfirm}
                        style={{
                            backgroundColor: "black",
                            color: "white",
                            borderColor: "darkblue",
                            margin: "5% 0"
                        }}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        type="text"
                        name="avatar_url"
                        placeholder="avatar"
                        onChange={handleChange}
                        value={signUpData.avatar_url}
                        style={{
                            backgroundColor: "black",
                            color: "white",
                            borderColor: "darkblue"
                        }}
                    >

                    </Form.Control>
                </Form.Group>

                <button type="submit" name="Signup" value="Signup" style={{ margin: "10% 32%" }}
                    className="btn btn-outline-light">Signup</button>
            </Form>
        </div>
    )
}

export default Signup;
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
                    navigate("/home");
                })
                .catch(e => console.error(e))
        }
    }

    return (
        <div>
            <h2>SignUp Page</h2>
            {signUpData.avatar_url ? <img src={signUpData.avatar_url} alt="avatar preview" /> : null}
            <form onSubmit={handleSignUp} >
                <input type="text" name="username" placeholder="username" onChange={handleChange} value={signUpData.username} />
                <br />
                <input type="text" name="email" placeholder="email" onChange={handleChange} value={signUpData.email} />
                <br />
                <input type="password" name="password" required placeholder="password" onChange={handleChange} value={signUpData.password} />
                <br />
                <input type="password" name="passwordConfirm" required placeholder="confirm password" onChange={handleChange} value={signUpData.passwordConfirm} />
                <br />
                <input type="text" name="avatar_url" placeholder="avatar" onChange={handleChange} value={signUpData.avatar_url} />
                <br />
                <input type="submit" name="Signup" value="Signup" />
            </form>
        </div>
    )
}

export default Signup;
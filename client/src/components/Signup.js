import { useState } from "react";

function Signup() {
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
        console.log("submitted new user")
        fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(signUpData)
        })
            .then(r => r.json())
            .then(console.log)
            .catch(e => console.error(e))
    }

    return (
        <div>
            <h3>SignUp Page</h3>
            <form onSubmit={handleSignUp} >
                <input type="text" name="username" placeholder="username" onChange={handleChange} value={signUpData.username} />
                <br />
                <input type="text" name="email" placeholder="email" onChange={handleChange} value={signUpData.email} />
                <br />
                <input type="password" name="password" placeholder="password" onChange={handleChange} value={signUpData.password} />
                <br />
                <input type="password" name="passwordConfirm" placeholder="password" onChange={handleChange} value={signUpData.passwordConfirm} />
                <br />
                <input type="text" name="avatar_url" placeholder="avatar" onChange={handleChange} value={signUpData.avatar_url} />
                <br />
                <input type="submit" name="login" value="login" />
            </form>
        </div>
    )
}

export default Signup;
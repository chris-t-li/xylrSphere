
function Profile({ user }) {
    return (
        <div id="profile-container"
            // className="card"
            style={{
                margin: "auto",
                padding: "2em",
                width: "50%",

            }}
        >
            <h3>My Profile</h3>
            <img
                src={user.avatar_url}
                alt="profile avatar"
                style={{
                    width: "200px",
                    margin: "2em 0"
                }} />
            <div
                style={{
                    width: "50%",
                    padding: "2em",
                    display: "inline-block"
                }}>
                <p><em>User:</em> {user.username}</p>
                <p><em>Email:</em> {user.email}</p>
                <button>Edit</button>
            </div>

        </div>

    )
}

export default Profile
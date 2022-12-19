import './App.css';
import { useState, useEffect } from "react";
import Main from "./components/Main";
import SideNavBar from './components/SideNavBar';

function App() {
  const [user, setUser] = useState()
  useEffect(() => autoLogin(), []);

  function autoLogin() {
    fetch("/login")
      .then(r => {
        if (r.ok) {
          r.json().then(user => {
            // console.log(user)
            setUser(user)
          })
        } else {
          console.error("Login Error")
        }
      })
  }

  return (
    <>
      <SideNavBar user={user} setUser={setUser} />
      <Main user={user} setUser={setUser} autoLogin={autoLogin} />
    </>
  )

}

export default App;



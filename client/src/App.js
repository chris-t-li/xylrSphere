import './App.css';
import { useState, useEffect } from "react";
import Main from "./components/Main";
import SideNavBar from './components/SideNavBar';

function App() {
  const [user, setUser] = useState({})
  useEffect(() => autoLogin(), []);

  function autoLogin() {
    fetch("/login")
      .then(r => r.json())
      .then(user => setUser(user))
  }

  return (
    <>
      <SideNavBar user={user} setUser={setUser} />
      <Main user={user} setUser={setUser} />
    </>
  )

}

export default App;



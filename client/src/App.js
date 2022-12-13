import './App.css';
// import { useState, useEffect } from "react";
import Main from "./components/Main";

function App() {

  // useEffect(() => {
  //   fetch("/nfts")
  //     .then(r => r.json())
  //     .then(data => {
  //       console.log(data)
  //       setNFTs(data)
  //     })
  // }, []);

  return (
    <Main />
  )

}

export default App;

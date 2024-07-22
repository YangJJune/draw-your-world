import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const CLIENT_ID = "dqax641otg";
  const MAP_URL =
    "https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=" + CLIENT_ID;
  const GEO_URL =
    "https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=" +
    CLIENT_ID +
    "&submodules=geocoder";

  return <div>HELLO WORLD</div>;
}

export default App;

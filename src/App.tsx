import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

let mapInstance: naver.maps.Map;

function App() {
  const loadScript = (src: string, callback: () => void) => {
    console.log("나 왔음");
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = src;
    script.onload = () => callback();
    document.head.appendChild(script);
  };

  const [isMapLoaded, setMapLoaded] = useState(false);

  const initMap = () => {
    // 추가 옵션 설정
    const mapOptions = {
      zoomControl: true,
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.TOP_RIGHT,
      },
    };

    // 지도 초기화 확인
    if (document.getElementById("map")) {
      mapInstance = new naver.maps.Map("map", mapOptions);
    }

    // 지도 로드 완료
    setMapLoaded(true);
  };

  useEffect(() => {
    // 스크립트 로딩 확인
    if (typeof naver === "undefined") {
      loadScript(
        `"https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_MAP_API_KEY}"`,
        initMap
      );
    } else {
      initMap();
    }
    naver.maps.Event.addListener(mapInstance, "click", function (e) {
      console.log(e.coord.x);
      console.log(e.coord.y);
    });
  }, [,]);

  return (
    <>
      <div id="map"></div>
    </>
  );
}

export default App;

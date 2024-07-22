import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

let mapInstance: naver.maps.Map;
let arr: naver.maps.Marker[] = [];
function App() {
  const loadScript = (src: string, callback: () => void) => {
    console.log("나 왔음");
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = src;
    script.onload = () => callback();
    document.head.appendChild(script);
  };

  const [coord, setCoord] = useState<string[]>([]);
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
    var map = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(37.3700065, 127.121359),
      zoom: 14,
    });

    var polyline = new naver.maps.Polyline({
      map: map,
      path: [],
      strokeColor: "#5347AA",
      strokeWeight: 2,
    });

    naver.maps.Event.addListener(map, "click", function (e) {
      var point = e.coord;

      var path = polyline.getPath();
      path.push(point);
      setCoord((oldCoord) => [
        ...oldCoord,
        "(" + (point.x.toString() + "," + point.y.toString() + ")"),
      ]);
      arr.push(
        new naver.maps.Marker({
          map: map,
          position: point,
        })
      );
    });

    naver.maps.Event.addListener(map, "rightclick", function (e) {
      var path = polyline.getPath();
      try {
        path.pop();
        arr.pop()?.setVisible(false);

        setCoord((e) => e.slice(0, e.length - 1));
      } catch (error) {
        console.log(error);
        window.alert(
          "Array size is under 0! If this error occurs again, please refresh page."
        );
      }
    });
  }, [,]);

  return (
    <div id="container">
      <div id="map"></div>
      <textarea id="txt" rows={8} cols={28} value={coord}></textarea>
    </div>
  );
}

export default App;

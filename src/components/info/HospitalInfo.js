import React, { useEffect, useRef } from "react";

const HospitalInfo = () => {
  const mapContainer = useRef(null);

  useEffect(() => {
    const mapScript = document.createElement("script");
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&autoload=false`;
    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          const mapOption = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
          };
          new window.kakao.maps.Map(mapContainer.current, mapOption);
        });
      }
    };

    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => {
      mapScript.removeEventListener("load", onLoadKakaoMap);
    };
  }, []);

  return (
    <div
      id="map"
      style={{
        width: '1000px',
        height: '1000px',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
      ref={mapContainer}
    ></div>
  );
};

export default HospitalInfo;

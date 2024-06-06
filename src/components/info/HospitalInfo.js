import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";

const HospitalInfo = () => {
  const mapContainer = useRef(null);
  const [locationInfo, setLocationInfo] = useState(null);
  const [search, setSearch] = useState(null);
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const mapRef = useRef(null);
  const markers = useRef([]);

  const handleButtonClick = (buttonValue) => {
    switch (buttonValue) {
      case "병원":
        setSearch(locationInfo + " " + buttonValue);
        break;
      case "산부인과":
        setSearch(locationInfo + " " + buttonValue);
        break;
      default:
        setSearch(null);
    }
  };

  const searchPlaces = () => {
    if (!search) return;

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(search, placesSearchCB);
  };

  const placesSearchCB = (data, status) => {
    if (status === window.kakao.maps.services.Status.OK) {
      setPlaces(data);
    } else {
      setPlaces([]);
    }
  };

  useEffect(() => {
    searchPlaces();
  }, [search]);

  useEffect(() => {
    const mapScript = document.createElement("script");
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&autoload=false&libraries=services`;
    document.head.appendChild(mapScript);

    const getCurrentCoordinate = async () => {
      return new Promise((res, rej) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            function (position) {
              const lat = position.coords.latitude;
              const lon = position.coords.longitude;

              res({ lat, lon });
            },
            function (error) {
              rej(new Error("현재 위치를 불러올 수 없습니다."));
            }
          );
        } else {
          rej(new Error("Geolocation을 지원하지 않습니다."));
        }
      });
    };

    const displayCenterInfo = (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        for (let i = 0; i < result.length; i++) {
          if (result[i].region_type === "H") {
            const loc = result[i].address_name.split(" ");
            const filteredLoc = loc.slice(0, 2).join(" ");
            setLocationInfo(filteredLoc);
            break;
          }
        }
      }
    };

    const onLoadKakaoMap = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(async () => {
          try {
            const { lat, lon } = await getCurrentCoordinate();

            const mapOption = {
              center: new window.kakao.maps.LatLng(lat, lon),
              level: 3,
            };
            const map = new window.kakao.maps.Map(
              mapContainer.current,
              mapOption
            );

            mapRef.current = map;

            const geocoder = new window.kakao.maps.services.Geocoder();
            geocoder.coord2RegionCode(lon, lat, displayCenterInfo);

            const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

            setPlaces((prevPlaces) => {
              return prevPlaces;
            });

          } catch (error) {
            console.error(error);
          }
        });
      }
    };

    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => {
      mapScript.removeEventListener("load", onLoadKakaoMap);
    };
  }, []);

  useEffect(() => {
    if (mapRef.current && places.length > 0) {
      markers.current.forEach(marker => marker.setMap(null));
      markers.current = [];

      var bounds = new window.kakao.maps.LatLngBounds();
      places.forEach((place) => {
        const position = new window.kakao.maps.LatLng(place.y, place.x);
        addMarker(position, place);
        bounds.extend(position);
      });
      mapRef.current.setBounds(bounds);
    }
  }, [places]);

  const addMarker = (position, place) => {
    const marker = new window.kakao.maps.Marker({
      position: position,
    });

    marker.setMap(mapRef.current);
    markers.current.push(marker);

    const content = `
      <div style="padding:5px;">
        <h5>${place.place_name}</h5>
        <span>${place.road_address_name || place.address_name}</span>
        <span>${place.phone}</span>
      </div>
    `;

    const infowindow = new window.kakao.maps.InfoWindow({
      content: content,
    });

    window.kakao.maps.event.addListener(marker, "mouseover", function () {
      infowindow.open(mapRef.current, marker);
    });

    window.kakao.maps.event.addListener(marker, "mouseout", function () {
      infowindow.close();
    });
  };

  return (
    <>
      <div>
        <Box textAlign={"center"} margin={"auto"}>
          <Button bg='#e0ccb3' onClick={() => handleButtonClick("병원")}>병원</Button>
          <Button bg='#e0ccb3' onClick={() => handleButtonClick("산부인과")}>산부인과</Button>
        </Box>
        <div
          id="map"
          style={{
            width: "1500px",
            height: "600px",
            margin: "20px auto",
          }}
          ref={mapContainer}
        ></div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ul id="placesList" style={{ listStyleType: "none", padding: 0, textAlign: "center" }}>
            {places.map((place, index) => (
              <li
                key={index}

                style={{
                  backgroundColor:
                    selectedPlace && selectedPlace.id === place.id
                      ? "#f0f0f0"
                      : "inherit",
                  padding: "10px",
                  margin: "5px 0",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  width: "1500px",
                  textAlign: "center",
                }}
              >
                <Text fontWeight="bold" fontSize="xl">{place.place_name}</Text>
                <Text fontSize="md" color="gray.600">{place.road_address_name || place.address_name}</Text>
                <Text fontSize="md" color="gray.600">{place.phone}</Text>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </>
  );
};

export default HospitalInfo;
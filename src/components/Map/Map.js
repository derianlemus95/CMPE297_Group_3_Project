import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  ReactElement,
} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GoogleMapsProvider } from "@ubilabs/google-maps-react-hooks";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import SuperClusterAlgorithm from "./superClusterAlgorithm";
import mapData from "./test";
import mapData2 from "./test2";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import "./Map.css";
//class Map extends Component {
//  render() {
//    return <div>Map Page</div>;
//  }
//}

const mapOptions = {
  zoom: 12,
  center: {
    lat: 37.333332,
    lng: -121.9,
  },
};

export default function Map() {
  const [mapContainer, setMapContainer] = useState(null);
  //const [tweets, setTweets] = useState([]);
  //const [data, setData] = useState("");
  const onLoad = useCallback((map) => addMarkers(map), []);

  //useEffect(() => {
  //var objectsToArrays;
  //axios.get("/tweets/updatedMapData").then((response) => {
  //if (response) {
  //console.log(response.data);
  //setTweets(response.data);
  //console.log(response.data);
  //objectsToArrays = response.data.map((el) => Object.values(el));
  //setData(objectsToArrays);

  //console.log(objectsToArrays);
  //} else {
  //console.log("Error retrieving Tweets");
  //}
  //});
  //}, []);
  return (
    //<div>
    //{tweets.map((tweet) => {
    //return (
    //<div>
    //{"["}"{tweet.username}","{tweet.displayname}","{tweet.rawContent}",
    //{tweet.longitude}, {tweet.latitude}
    //{"],"}
    //</div>
    //);
    //})}
    //</div>
    //{tweets.map((tweet) => {
    //return (
    //<div>
    //{"["}"{tweet.rawContent}",{tweet.longitude}, {tweet.latitude}
    //{"],"}
    //</div>
    //);
    //})}
    //</div>
    <GoogleMapsProvider
      googleMapsAPIKey=
      mapOptions={mapOptions}
      mapContainer={mapContainer}
      onLoadMap={onLoad}
    >
      <div ref={(node) => setMapContainer(node)} style={{ height: "100vh" }} />
    </GoogleMapsProvider>
  );
}

function addMarkers(map) {
  console.log("inside markers");
  const infoWindow = new google.maps.InfoWindow();
  const markers = mapData2.map(([username, displayname, name, lng, lat]) => {
    const marker = new google.maps.Marker({ position: { lng, lat } });
    marker.addListener("click", () => {
      infoWindow.setPosition({ lng, lat });
      infoWindow.setContent(`
      <div class="tweet-window">
      <h2>${username}</h2>
      <b>Display Name: ${displayname}</b>
      <p>Tweet: ${name}</p>
      </div>`);
      infoWindow.open({ map });
    });

    return marker;
  });

  new MarkerClusterer({
    markers,
    map,
    algorithm: new SuperClusterAlgorithm({ radius: 100 }),
  });
}

//Export main component
//export default Map;

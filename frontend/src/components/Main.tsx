import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
  LatLng,
} from '@react-google-maps/api';

const API_KEY = 'SECRET,_TO_BE_REPLACED';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const defaultCenter = {
  lat: 37.541,
  lng: 126.986,
};

interface Waypoint {
  lat: number;
  lng: number;
}

export function Main() {
  const [directionsData, setDirectionsData] = useState<any>(null);
  const [waypointsArr, setWaypointsArr] = useState<Waypoint[]>([]);

  useEffect(() => {
    setWaypointsArr([
      // 웨이포인트 좌표를 추가하세요.
      { lat: 37.501, lng: 126.953 },
      { lat: 37.468, lng: 126.988 },
    ]);
  }, []);

  const directionsCallback = (response: any) => {
    if (response !== null) {
      setDirectionsData(response);
    }
  };

  return (
    <Container>
      <LoadScript googleMapsApiKey={API_KEY} libraries={['places']}>
        <GoogleMap
          id="direction-example"
          mapContainerStyle={mapContainerStyle}
          zoom={13}
          center={defaultCenter as LatLng}
        >
          <DirectionsService
            options={{
              origin: { lat: 37.543, lng: 126.976 } as LatLng, // 출발지
              destination: { lat: 37.478, lng: 126.965 } as LatLng, // 도착지
              waypoints: waypointsArr.map((waypoint) => ({
                location: waypoint as LatLng, // 웨이포인트
                stopover: true,
              })),
              travelMode: 'DRIVING', // 이동 방식
            }}
            callback={directionsCallback}
          />
          {directionsData && <DirectionsRenderer directions={directionsData} />}
          {waypointsArr.map((waypoint, index) => (
            <Marker key={index} position={waypoint as LatLng} />
          ))}
        </GoogleMap>
      </LoadScript>
    </Container>
  );
}

const Container = styled.div` // 그대로 유지
...
const Loading = styled.p`; // 그대로 유지

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

function MapAdvert({ el }) {
  return (
    <>
      <div className="container">
        <MapContainer
          center={el.position}
          zoom={11}
          style={{ height: '25rem' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={el.position}>
            <Popup>Город {el.city}</Popup>
          </Marker>
        </MapContainer>
      </div>{' '}
      <br />
    </>
  );
}

export default MapAdvert;

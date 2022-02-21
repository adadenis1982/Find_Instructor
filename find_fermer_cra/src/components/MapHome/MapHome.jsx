import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMap } from '../../redux/actionCreators/Map';
import { position } from '../../positionCity';

function MapHome() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMap());
  }, [dispatch]);

  const city = useSelector((state) => state.mapReducer);

  let tempCity;
  const tempArray = [];

  if (city.loading && city.map.data) {
    tempCity = city.map.data.uniqueAdvertsByCity;
    for (let i = 0; i < tempCity.length; i += 1) {
      for (let j = 0; j < position.length; j += 1) {
        if (tempCity[i].city === position[j].city) {
          tempCity[i].position = position[j].position;
        }
      }
    }
    if (tempCity) {
      for (let i = 0; i < tempCity.length; i += 1) {
        if (tempCity[i].position) {
          tempArray.push(tempCity[i]);
        }
      }
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div
        className="border border-dark d-flex justify-content-center"
        style={{ margin: '40px', width: '1750px' }}
      >
        <MapContainer
          center={[60.9131040956211, 93.83913401562502]}
          zoom={4}
          style={{
            height: '670px',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {tempArray
            ? tempArray.map((el) => (
                <Marker key={el.id} position={el.position}>
                  <Popup>
                    Город {el.city} <br /> Инструктор по {el.sport_type}
                  </Popup>
                </Marker>
              ))
            : 'Нет данных'}
        </MapContainer>
      </div>{' '}
      <br />
    </div>
  );
}

export default MapHome;

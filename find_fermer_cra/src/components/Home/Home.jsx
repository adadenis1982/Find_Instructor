import React from 'react';
import { useSelector } from 'react-redux';
import CardHome from '../CardHome/CardHome';
import ImageHome from '../ImageHome/ImageHome';
import SearchForm from '../SearchForm';
import MapHome from '../MapHome/MapHome';

function Home() {
  const city = useSelector((state) => state.mapReducer);

  let tempCity;

  if (city.loading && city.map.data) {
    tempCity = city.map.data.uniqueAdvertsByCity.slice(0, 6);
  }

  return (
    <div>
      <SearchForm />
      <ImageHome />
      <div className="row d-flex justify-content-center">
        {tempCity
          ? tempCity.map((el) => <CardHome key={`${el.id}`} el={el} />)
          : 'Нет данных'}
      </div>
      <MapHome />
    </div>
  );
}

export default Home;

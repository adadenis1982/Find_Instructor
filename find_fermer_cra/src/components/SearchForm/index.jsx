import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useLocation, useNavigate, createSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { env } from '../../secret';

import { searchAdverts } from '../../redux/actionCreators/SearchAdvertsAC';

function SearchForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();

  const onSearch = (event) => {
    event.preventDefault();

    let { city, sportType, orderBy, sortType } = event.target;

    city = city?.value === 'Выбрать город' ? '' : city?.value;
    sportType =
      sportType?.value === 'Выбрать вид спорта' ? '' : sportType?.value;
    orderBy = orderBy?.value === 'Сгруппировать по:' ? '' : orderBy?.value;
    sortType = sortType?.value === 'Сортировка по:' ? '' : sortType?.value;

    const params = {};

    if (city) {
      params.city = city;
    }
    if (sportType) {
      params.sportType = sportType;
    }
    if (orderBy) {
      params.orderBy = orderBy;
    }
    if (sortType) {
      params.sorttype = sortType;
    }

    const search = `?${createSearchParams(params)}`;
    const payload = { search };
    dispatch(searchAdverts(payload));

    navigate({
      pathname: '/search/result',
      search: `?${createSearchParams(params)}`,
    });
  };

  return (
    <>
      <form className="input-group container mt-5 mb-2" onSubmit={onSearch}>
        <Button type="submit" className="input-group-text btn-dark">
          Найти инструктора
        </Button>
        <Form.Select aria-label="Default select example" name="city">
          <option>Выбрать город</option>
          {env.city.map((el, i) => (
            <option key={`${i + 1}`} value={el}>
              {el}
            </option>
          ))}
        </Form.Select>
        <Form.Select aria-label="Default select example" name="sportType">
          <option>Выбрать вид спорта</option>
          {env.sport.map((el, i) => (
            <option key={`${i + 1}`} value={el}>
              {el}
            </option>
          ))}
        </Form.Select>
        {location.pathname === '/search/result' && (
          <>
            <Form.Select aria-label="Default select example" name="orderBy">
              <option>Сгруппировать по:</option>
              {env.orderBy.map((el, i) => (
                <option key={`${i + 1}`} value={el}>
                  {el}
                </option>
              ))}
            </Form.Select>
            <Form.Select aria-label="Default select example" name="sortType">
              <option>Сортировка по:</option>
              {env.sorttype.map((el, i) => (
                <option key={`${i + 1}`} value={el}>
                  {el}
                </option>
              ))}
            </Form.Select>
          </>
        )}
      </form>
      <br />
    </>
  );
}

export default SearchForm;

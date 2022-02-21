import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Card, Button, Row, Spinner } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import SearchForm from '../SearchForm';
import { searchAdverts } from '../../redux/actionCreators/SearchAdvertsAC';

function SearchResult() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    dispatch(searchAdverts({ search: location.search }));
  }, [dispatch, location.search]);

  const { adverts, loading, totalLength, page } = useSelector(
    (state) => state.searchAdvertsReducer,
  );
  console.log('adverts', adverts);
  console.log('totalLength', totalLength);
  console.log('page', page);

  function random() {
    const min = 0;
    const max = 1;
    const result = Math.floor(Math.random() * (max - min + 1) + min);
    return result === 1 ? 'sm' : '';
  }

  return (
    <Container className="d-flex flex-column align-items-center">
      <Col md="auto">
        <SearchForm />
      </Col>
      {loading ? (
        // <Spinner animation="border" role="status">
        //   <span className="visually-hidden">Loading...</span>
        // </Spinner>
        <Col className="align-items-center">
          {[...Array(25).keys()].map(() => (
            <div className="d-flex justify-content-center">
              <Spinner animation="grow" size={random()} variant="dark" />
              <Spinner animation="border" size={random()} variant="primary" />
              <Spinner animation="grow" size={random()} variant="primary" />
              <Spinner animation="border" size={random()} variant="secondary" />
              <Spinner animation="border" size={random()} variant="success" />
              <Spinner animation="border" size={random()} variant="danger" />
              <Spinner animation="grow" size={random()} variant="warning" />
              <Spinner animation="grow" size={random()} variant="danger" />
              <Spinner animation="border" size={random()} variant="warning" />
              <Spinner animation="border" size={random()} variant="info" />
              <Spinner animation="grow" size={random()} variant="info" />
              <Spinner animation="border" size={random()} variant="light" />
              <Spinner animation="grow" size={random()} variant="success" />
              <Spinner animation="border" size={random()} variant="dark" />
              <Spinner animation="grow" size={random()} variant="secondary" />
              <Spinner animation="grow" size={random()} variant="light" />
              <Spinner animation="grow" size={random()} variant="dark" />
              <Spinner animation="border" size={random()} variant="primary" />
              <Spinner animation="grow" size={random()} variant="primary" />
              <Spinner animation="border" size={random()} variant="secondary" />
              <Spinner animation="border" size={random()} variant="success" />
              <Spinner animation="border" size={random()} variant="danger" />
              <Spinner animation="grow" size={random()} variant="warning" />
              <Spinner animation="grow" size={random()} variant="danger" />
              <Spinner animation="border" size={random()} variant="warning" />
              <Spinner animation="border" size={random()} variant="info" />
              <Spinner animation="grow" size={random()} variant="info" />
              <Spinner animation="border" size={random()} variant="light" />
              <Spinner animation="grow" size={random()} variant="success" />
              <Spinner animation="border" size={random()} variant="dark" />
              <Spinner animation="grow" size={random()} variant="secondary" />
              <Spinner animation="grow" size={random()} variant="light" />
            </div>
          ))}
        </Col>
      ) : (
        <Col md="auto" className="d-flex flex-column align-items-center">
          {adverts.length === 0 ? (
            <h4 className="text-center">Нет объявлений</h4>
          ) : (
            adverts.map((el) => (
              <Card className="mb-3" style={{ width: '80%' }} key={el.id}>
                <Card.Header as="h5">{el.title}</Card.Header>
                <Row>
                  <Card.Body style={{ width: '65%' }}>
                    <Col>
                      <Card.Title>Вид спорта: {el.sport_type}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        Город: {el.city}
                      </Card.Subtitle>
                      <Card.Text>
                        {el.content}
                        <br />
                        <br />
                        {`Минимальная продолжительность занятия: ${el.duration_min} мин.`}
                        <br />
                        {`Стоимость: ${el.price}`}
                        <br />
                      </Card.Text>
                      <Button
                        className="position-relative bottom-0 start-0 mb-2 m-lg-2"
                        variant="dark"
                        onClick={() => navigate(`/adverts/${el.id}`)}
                      >
                        Подробнее
                      </Button>
                      <Rating
                        size={25}
                        initialValue={Number(el.rating)}
                        allowHover={false}
                        readonly
                      />
                    </Col>
                  </Card.Body>
                  <img src={el.picture} alt="sport" style={{ width: '35%' }} />
                </Row>
              </Card>
            ))
          )}

          {/* {totalLength >= adverts.length && ( */}
          {/*  <Button variant="dark" className="mt-3"> */}
          {/*    Показать ещё */}
          {/*  </Button> */}
          {/* )} */}
        </Col>
      )}
    </Container>
  );
}

export default SearchResult;

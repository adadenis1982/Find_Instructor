import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import { Card, Button } from 'react-bootstrap';

function CardHome({ el }) {
  const navigate = useNavigate();

  return (
    <Card style={{ width: '250px', margin: '25px' }}>
      <Card.Img className="card-img-top mt-2" variant="top" src={el.picture} />
      <Card.Body>
        <Card.Title>
          Инструктор по {el.sport_type}
          <br /> в городе {el.city}
        </Card.Title>
        <Card.Text className="position-relative position-relative-example">
          {el.content} <br />
          <Rating
            size={25}
            initialValue={Number(el.rating)}
            allowHover={false}
            readonly
          />
        </Card.Text>
        <br />
        <Button
          variant="dark"
          className="position-absolute bottom-0 start-0 m-2"
          type="submit"
          onClick={() => navigate(`adverts/${el.id}`)}
        >
          Подробнее
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CardHome;

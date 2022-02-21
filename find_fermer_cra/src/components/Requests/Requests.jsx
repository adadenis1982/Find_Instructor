import axios from 'axios';
import { Button, ListGroup, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { env } from '../../secret';
import style from './style.css';

export default function Requests({ dataUser }) {
  const submitBooking = async (bookingId) => {
    console.log('submit');
    let response;
    try {
      response = await axios.put(`${env.REACT_APP_URL}/bookings`, {
        action: true,
        bookingId,
      });
    } catch (error) {
      console.log(error);
      return <div>error.message</div>;
    }
    console.log('response', response);

    setTimeout(() => {
      const element = document.getElementById(`${response.data.id}`);
      const btn = document.getElementById(`${response.data.id}booking`);
      // element.variant = 'success';
      element.style.backgroundColor = '#d1e7dd';
      btn.style.visibility = 'hidden';
    }, 50);
  };

  const declineBooking = async (bookingId) => {
    console.log('decline');
    let response;
    try {
      response = await axios.put(`${env.REACT_APP_URL}/bookings`, {
        action: false,
        bookingId,
      });
    } catch (error) {
      console.log(error);
      return <div>error.message</div>;
    }

    console.log('response', response);
    setTimeout(() => {
      const element = document.getElementById(`${response.data.id}`);
      const btn = document.getElementById(`${response.data.id}booking`);

      element.style.backgroundColor = '#f8d7da';
      btn.style.visibility = 'hidden';
    }, 50);
  };

  if (!dataUser) {
    return <h5>Loading...</h5>;
  }

  if (!dataUser.adverts) {
    return <h5>Нет заявок</h5>;
  }

  return (
    <ListGroup as="ol" numbered>
      {dataUser.adverts.map((advert) =>
        advert.bookings.map((booking) => {
          let liStyle;

          if (booking.is_confirmed) {
            liStyle = 'success';
          } else if (
            booking.is_confirmed === false &&
            booking.is_confirmed !== null
          ) {
            liStyle = 'danger';
          } else {
            liStyle = 'light';
          }

          return (
            <ListGroup.Item
              key={booking.id}
              id={booking.id}
              action
              variant={liStyle}
              as="li"
              className="d-flex justify-content-between align-items-center"
            >
              <div className="ms-2 me-auto text-center">
                <div className="ms-2 me-auto fw-bold">
                  <Nav.Link
                    as={Link}
                    style={{ color: 'black' }}
                    to={`/adverts/${advert.id}`}
                  >
                    {advert.title}
                  </Nav.Link>
                </div>
                {booking.user.username}
                <br />
                {new Date(booking.date).toLocaleDateString()}
              </div>
              {booking.is_confirmed === null && (
                <div id={`${booking.id}booking`}>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => submitBooking(booking.id)}
                  >
                    Принять
                  </Button>
                  <Button
                    className="ms-3"
                    size="sm"
                    variant="secondary"
                    onClick={() => declineBooking(booking.id)}
                  >
                    Отклонить
                  </Button>
                </div>
              )}
            </ListGroup.Item>
          );
        }),
      )}
    </ListGroup>
  );
}

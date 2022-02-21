import { Button, Form, Toast } from 'react-bootstrap';
import DatePicker from 'sassy-datepicker';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createBooking } from '../../redux/actionCreators/BookingAC';

export default function BookingForm({ advert }) {
  const dispatch = useDispatch();

  const [showA, setShowA] = useState(false);

  const toggleShowA = () => setShowA(!showA);

  const { data } = useSelector((state) => state.bookingReducer);
  const { user, isAuthorized } = useSelector(
    (state) => state.checkSessionReducer,
  );

  const [date, setDate] = React.useState('');

  const advert_id = useParams().id;
  const user_id = user?.user?.id;

  const onChangeDate = (calendar) => {
    setDate(calendar);
  };

  const onSubmitDate = (event) => {
    event.preventDefault();
    setShowA(!showA);
    dispatch(createBooking({ date, advert_id, user_id }));

    setTimeout(() => {
      setShowA(showA);
      console.log('timeout');
    }, 1500);
  };

  console.log('data', data);

  return (
    <div
      className="p-3"
      style={{ border: '1px solid black', borderRadius: '10px' }}
    >
      <Form
        className="d-flex flex-column align-items-center"
        onSubmit={onSubmitDate}
      >
        <DatePicker onChange={onChangeDate} />
        <Button
          variant="dark"
          className="mt-3"
          type="submit"
          disabled={!isAuthorized}
        >
          Выберите желаемую дату занятия
        </Button>
        <Toast
          show={showA}
          onClose={toggleShowA}
          className="position-absolute"
          style={{ marginTop: '20%' }}
        >
          <Toast.Header>
            <img src="/sport.ico" className="rounded me-2" alt="" width="6%" />
            <strong className="me-auto">{advert.sport_type}</strong>
            <small>{advert.city}</small>
          </Toast.Header>
          <Toast.Body>Woohoo, ваша заявка отправлена!</Toast.Body>
        </Toast>
      </Form>
    </div>
  );
}

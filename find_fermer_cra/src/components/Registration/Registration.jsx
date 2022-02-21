import React from 'react';
import { Form, Button, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchRegister } from '../../redux/actionCreators/registerAC';

function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    if (event.target.password.value !== event.target.passwordConfirm.value) {
      document.querySelector('#feedback').textContent = 'Пароли не совпадают';
      document.querySelector('#feedback').style.display = 'block';
      return false;
    }

    const body = {
      username: event.target.username.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };

    const data = await dispatch(fetchRegister(body));

    if (data.payload) {
      dispatch(fetchRegister(body));
      navigate('/');
    } else {
      document.querySelector('#feedback').textContent = data.error.message;
      document.querySelector('#feedback').style.display = 'block';
    }
  };

  return (
    <Form className="container" onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Ваше имя</Form.Label>
        <Form.Control
          type="text"
          placeholder="Введите имя"
          name="username"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Почта</Form.Label>
        <Form.Control
          type="email"
          placeholder="Введите почту"
          name="email"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Пароль</Form.Label>
        <Form.Control
          type="password"
          minLength="8"
          placeholder="Введите пароль"
          name="password"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
        <Form.Label>Повторите пароль</Form.Label>
        <Form.Control
          type="password"
          minLength="8"
          placeholder="Подтвердите пароль"
          name="passwordConfirm"
          required
        />
      </Form.Group>
      <div id="feedback" className="invalid-feedback"></div>
      <br />
      <div className="position-relative position-relative-example">
        <Button
          className="position-absolute top-0 start-0"
          variant="dark"
          type="submit"
        >
          Зарегистрироваться
        </Button>
        <Nav.Link
          className="position-absolute top-0 end-0"
          style={{ color: 'black' }}
          onClick={() => navigate('/login')}
        >
          {' '}
          Уже есть аккаунт{' '}
        </Nav.Link>
        </div>
    </Form>
  );
}

export default Registration;

import React from 'react';
import { Form, Button, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchLogin } from '../../redux/actionCreators/LoginAC';

function Login() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onSubmit = async (event) => {
    event.preventDefault();

    const body = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    const data = await dispatch(fetchLogin(body));

    if (data.payload) {
      dispatch(fetchLogin(body));
      navigate(-1);
    } else {
      document.querySelector('#feedback').textContent = data.data.message;
      document.querySelector('#feedback').style.display = 'block';
    }
  };

  return (
    <Form className="container" onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Почта</Form.Label>
        <Form.Control type="email" placeholder="Введите почту" name="email" required />
      </Form.Group >
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Пароль</Form.Label>
        <Form.Control type="password" minLength="8" placeholder="Введите пароль" name="password" required />
      </Form.Group>
      <div id="feedback" className="invalid-feedback" />
      <br />
      <div className="position-relative position-relative-example">
      <Button className="position-absolute top-0 start-0" variant="dark" type="submit">
        Войти
      </Button>
      <Nav.Link className="position-absolute top-0 end-0" style={{ color: 'black' }} onClick={() => navigate('/register')}> Зарегистрироваться </Nav.Link>
      </div>
    </Form >
  );
}

export default Login;

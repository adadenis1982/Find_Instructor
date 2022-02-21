import { FloatingLabel, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../../redux/actionCreators/Person';
import { env } from '../../secret';

export default function FormUpdate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.checkSessionReducer.user.user);

  const id = data?.id;

  const [infoUser, setinfoUser] = useState();

  useEffect(() => {
    axios.get(`${env.REACT_APP_URL}/users/${id}`).then((result) => {
      setinfoUser(result.data.user);
    });
  }, [id]);

  let valueName;
  let valueAbout;

  if (infoUser) {
    valueName = infoUser.username;
    valueAbout = infoUser.about;
  } else {
    <div>Привет!!!!!!!!!!</div>;
  }

  const [img, setImg] = useState(null);

  const onChange = (e) => {
    setImg(e.target.files[0]);
  };

  const NewInfo = async (event) => {
    event.preventDefault();

    const newImg = new FormData();
    newImg.append('avatar', img);

    const body = {
      username: event.target.name.value,
      about: event.target.about.value,
      user_id: id,
    };

    dispatch(updateUser(newImg, body));
    navigate(`/users/${id}`);
  };

  return (
    <div className="content">
      <Form onSubmit={NewInfo}>
        <Form.Group className="mb-3">
          <Form.Label>Имя</Form.Label>
          <Form.Control
            name="name"
            defaultValue={valueName}
            type="text"
            placeholder="Имя"
          />
        </Form.Group>

        <Form.Label>Информация о пользователе</Form.Label>
        <FloatingLabel controlId="floatingTextarea2" label="about">
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: '100px' }}
            name="about"
            defaultValue={valueAbout}
          />
        </FloatingLabel>

        <Form.Group className="mb-3" style={{ maxWidth: '300px' }}>
          <Form.Label>Фото</Form.Label>
          <Form.Control type="file" onChange={onChange} />
        </Form.Group>

        <div id="buttonCreate">
          <Button variant="dark" type="submit">
            Изменить
          </Button>
        </div>
      </Form>
    </div>
  );
}

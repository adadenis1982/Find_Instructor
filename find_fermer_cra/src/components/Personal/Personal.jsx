import { Card, Button, Badge } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Trenings from '../Trenings/Trenings';
import { env } from '../../secret';
import Requests from '../Requests/Requests';
import style from './style.css';

export default function Pers() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.checkSessionReducer.user.user);
  const id = data?.id;
  let isUser = false;

  const booking = useSelector((state) => state.bookingReducer);
  console.log('booking', booking);

  const params = useParams();

  const [dataUser, setdataUser] = useState([]);
  useEffect(() => {
    axios.get(`${env.REACT_APP_URL}/users/${params.id}`).then((result) => {
      setdataUser(result.data.user);
    });
  }, [params.id]);

  const instructor = dataUser.is_instructor;
  if (id === params.id) isUser = true;

  // useEffect(() => {
  //   const statusColor = document.querySelector('.fuck');
  //   statusColor.style.backgroundColor =
  // }, [dataUser]);

  return (
    <>
      <div className="background"></div>
      <div className="containerTop">
        <div className="leftContent">
          <div className="user">
            <div className="whiteSquare"></div>
            <Card id="newCard" style={{ width: '100%' }}>
              <Card.Img id="imgCut" variant="top" src={`${dataUser.photo}`} />
              <Card.Body>
                {instructor ? (
                  <Badge pill bg="success">
                    Инструктор
                  </Badge>
                ) : (
                  <div></div>
                )}
                <Card.Title>{dataUser.username}</Card.Title>
                <Card.Text>{dataUser.about}</Card.Text>
                <div className="buttons">
                  {isUser ? (
                    <Link to="newTrening">
                      <Button variant="success">Создать тренировку</Button>
                    </Link>
                  ) : (
                    <div></div>
                  )}
                  {isUser ? (
                    <Link to="userInfo">
                      <Button variant="secondary">Редактировать профиль</Button>
                    </Link>
                  ) : (
                    <div></div>
                  )}
                </div>
              </Card.Body>
            </Card>
          </div>
          <h4 className="mt-5">Заявки</h4>
          <hr />
          <Requests dataUser={dataUser} />
        </div>
        <div className="MyTrenings">
          <h3 id="h3text">Все тренировки</h3>
          <Trenings />
        </div>
      </div>
    </>
  );
}

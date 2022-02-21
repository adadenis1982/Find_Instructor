import { Alert, Button, Form } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { Link, Navigate, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Rating } from 'react-simple-star-rating';
import style from './style.css';
import { env } from '../../secret';

export default function Trenings() {
  const navigate = useNavigate();
  const params = useParams();

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`${env.REACT_APP_URL}/users/${params.id}`, {
        withCredentials: true,
      })
      .then((result) => {
        setData(result.data.userAdverts);
      });
  }, []);

  const commentList = data.map((el) => (
    <Form className="announcement" key={el.id}>
      <Alert variant="dark">
        <div className="infoUserComment">
          <div className="photo">
            <img className="im" src={el.picture} alt=""></img>
            <Button
              onClick={() => navigate(`/adverts/${el.id}`)}
              variant="success"
            >
              Подробнее
            </Button>
          </div>
          <div className="description">
            <Alert.Heading>{el.title}</Alert.Heading>
            <p>{el.content}</p>
          </div>
        </div>
        <hr />
        <div className="stars">
          <div className="number">
            <div className="elem">
              <p className="p">
                <b>Рейтинг:</b>
              </p>
            </div>
            <div className="">
              <Rating size={35} ratingValue={el.rating * 20} readonly />
            </div>
          </div>
          <p className="p">
            <b>Продолжительность:</b> {el.duration_min}, мин
          </p>
        </div>
      </Alert>
    </Form>
  ));
  return commentList;
}

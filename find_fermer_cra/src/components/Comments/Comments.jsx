import { Alert } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import style from './style.css';
import { env } from '../../secret';

export default function Comments() {
  // const data = useSelector((state) => {
  //   console.log('state', state);
  //   return state.checkSessionReducer.user;
  // });

  const params = useParams();
  console.log(params);

  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`${env.REACT_APP_URL}/users/${params.id}`).then((result) => {
      setData(result.data.userAdverts.map((elem) => elem.comments));
    });
  }, []);

  console.log('dataUser===========>', data);
  // const comments = [
  //   {
  //     title: 'Персональная тренировка в зале',
  //     stars: 5,
  //     user_id: 'Sarah',
  //     comment: 'Всё классно!',
  //     photo: 'https://4tololo.ru/sites/default/files/images/20180511162104.jpg'
  //   },
  //   {
  //     title: 'Персональная тренировка в зале',
  //     stars: 5,
  //     user_id: 'Юлия',
  //     comment: 'Спасибо тренеру',
  //     photo: 'https://art-assorty.ru/uploads/posts/2018-03/1520330793_igor2-21031719245624_31.jpg'
  //   }
  // ]

  const commentList = data.map((el) => (
    <Alert variant="dark" key={el.id * 10000}>
      <div className="infoUserComment">
        <div className="photo">
          <img className="img" src={el.picture} alt=""></img>
          <p>{el.user_id}</p>
        </div>
        <Alert.Heading>{el.comment}</Alert.Heading>
      </div>
      <hr />
      <div className="stars">
        <div className="number">
          <h4>{el.stars}</h4>
          <img
            className="imgStar"
            src="https://pngicon.ru/file/uploads/zvezda.png"
            alt=""
          ></img>
        </div>
        <p>{el.title}</p>
      </div>
    </Alert>
  ));
  return commentList;
}

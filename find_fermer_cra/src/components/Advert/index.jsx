import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Button, Card, Form } from 'react-bootstrap';
import dayjs from 'dayjs';
import { Rating } from 'react-simple-star-rating';
import style from '../CreateTrening/style.css';
import { position } from '../../positionCity';
import * as advertActions from '../../redux/actionTypes/advert';
import { advertReducer } from '../../redux/reducers/advertReducer';
import {
  initAdvertError,
  initAdvertSuccess,
} from '../../redux/actionCreators/Advert';
import login from '../Login/Login';
import { fetchLogin } from '../../redux/actionCreators/LoginAC';
import MapAdvert from '../MapAdvert/MapAdvert';
import { createBooking } from '../../redux/actionCreators/BookingAC';
import BookingForm from '../BookingForm';
import FermersChat from '../FermersChat';
import { env } from '../../secret';

const advertSelector = (state) => state.advertReducer;
const isAuthorisedSelector = (state) => state.checkSessionReducer;
dayjs.locale('ru');

const Advert = () => {
  const [advert, setAdvert] = React.useState(null);
  const [comments, setComments] = React.useState([]);
  const params = useParams();
  const dispatch = useDispatch();
  const adverts = useSelector(advertSelector);
  const [rating, setRating] = React.useState(0);
  const { isAuthorized } = useSelector(isAuthorisedSelector);
  const huyusser = useSelector((state) => state.huyusser);
  let smhref = '';
  if (advert) smhref = `/smallMessenger/${advert.id}`;
  let advertPosition;

  if (advert) {
    advertPosition = position.filter((el) => el.city === advert.city);
  }

  const handleRating = (rate) => {
    setRating(rate);
    // other logic
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const body = {
      stars: rating / 20,
      comment: event.target.comment.value,
      advert_id: advert.id,
    };
    let newComment;
    try {
      newComment = await axios.post(`${env.REACT_APP_URL}/comments`, body, {
        withCredentials: true,
      });
    } catch (e) {
      console.log(e);
      return;
    }
    setComments((prev) =>
      [...prev, newComment.data].sort((a, b) =>
        dayjs(a.createdAt).isBefore(dayjs(b.createdAt)),
      ),
    );
    event.target.comment.value = '';
  };

  useEffect(() => {
    let tempAdvert;
    if (Array.isArray(adverts)) {
      tempAdvert = adverts.find((ad) => ad.id === params.id);
    }
    if (!tempAdvert) {
      axios
        .get(`${env.REACT_APP_URL}/adverts/${params.id}`, {
          withCredentials: true,
        })
        .then((res) => setAdvert(res.data))
        .catch((err) => console.log(err.message));
    } else {
      setAdvert({ ...tempAdvert });
    }
  }, [dispatch]);

  useEffect(() => {
    if (advert) {
      axios
        .get(`${env.REACT_APP_URL}/comments/${advert.id}`, {
          headers: { 'Cache-Control': 'no-cache' },
          withCredentials: true,
        })
        .then((fetchedComments) => {
          setComments(fetchedComments.data);
        })
        .catch((err) => console.log(err.message));
    }
  }, [dispatch, advert]);

  useEffect(() => {
    setTimeout(() => {
      console.log('raskritieBEFORRE');
      document.querySelector('#visibleOrNot').style.visibility = 'visible';
      console.log('raskritie');
    }, 800);
  }, []);

  if (!advert) {
    return <div>loading</div>;
  }

  return (
    <div className="container d-flex flex-column">
      <div className="mt-2">
        <div>
          <h3>{advert.title}</h3>
        </div>
        <div className="d-flex flex-row justify-content-between">
          <div className="d-flex flex-row">
            <div className="text-decoration-underline fw-bold fst-italic">
              {advert.city}
            </div>
            <div className="ms-3 text-muted fst-italic">
              {dayjs(advert.createdAt).format('DD/MM/YYYY')}
            </div>
            <div className="ms-3">
              <Rating
                size={25}
                initialValue={Number(advert.rating)}
                allowHover={false}
                readonly
              />
            </div>
          </div>
          <div>
            <button type="button" className="btn btn-secondary mx-3 py-1 px2">
              Like
            </button>
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '2em',
          maxWidth: '1300px',
        }}
      >
        <img
          alt="nnm"
          style={{
            maxWidth: '500px',
            maxHeight: '600px',
            borderRadius: '10px',
          }}
          src={advert.picture.toString()}
        />
        <BookingForm advert={advert} />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '4em',
        }}
      >
        <div
          className="my-2 mx-5"
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <div>{advert.user.username}</div>
          <img
            alt="nnm"
            style={{
              width: '50px',
              height: '50px',
              marginLeft: '30px',
              borderRadius: '9999px',
            }}
            src={advert.user.photo.toString()}
          />
        </div>
        <div className="m-2">Тип спорта: {advert.sport_type}</div>
        <div className="m-2">Описание: {advert.content}</div>
        <div className="m-2">
          Продолжительность сеанса: {advert.duration_min}
        </div>
        <div className="m-2">Цена: {advert.price}</div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '2em',
          flexDirection: 'column',
        }}
      >
        {advertPosition
          ? advertPosition.map((el) => <MapAdvert key={`${el.id}`} el={el} />)
          : 'loading'}{' '}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '36rem',
              marginLeft: '1em',
            }}
          >
            {isAuthorized && (
              <form
                style={{ width: '36rem', marginTop: '1em' }}
                onSubmit={onSubmit}
              >
                <div className="mb-2">
                  <div className="">
                    <Rating
                      onClick={handleRating}
                      size={35}
                      ratingValue={rating} /* Available Props */
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    id="comment"
                    name="comment"
                    rows="3"
                    placeholder="Оставте отзыв"
                  ></textarea>
                  <Button className="mt-3" variant="dark" type="submit">
                    Отправить
                  </Button>
                </div>
              </form>
            )}
            {comments.length ? (
              comments.map((el) => (
                <Card key={el.id} style={{ width: '36rem', marginTop: '1em' }}>
                  <Card.Body>
                    {/* <Card.Title>Card Title</Card.Title> */}
                    <Card.Subtitle
                      className="mb-2 justify-content-between"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}
                      >
                        <img
                          alt="nnm"
                          style={{
                            width: '50px',
                            height: '50px',
                            marginRight: '15px',
                            borderRadius: '9999px',
                          }}
                          src={el.user.photo.toString()}
                        />
                        <div className="text-muted">{el.user.username}</div>
                        <div className="ms-3">
                          <Rating
                            size={20}
                            initialValue={el.stars}
                            allowHover={false}
                            readonly
                          />
                        </div>
                      </div>
                      <div className="text-muted fst-italic">
                        {dayjs(el.createdAt).format('DD/MM/YYYY')}
                      </div>
                    </Card.Subtitle>
                    <Card.Text>{el.comment}</Card.Text>
                    {/* <Card.Link href="#">Card Link</Card.Link> */}
                    {/* <Card.Link href="#">Another Link</Card.Link> */}
                  </Card.Body>
                </Card>
              ))
            ) : (
              <div>Нет комментариев</div>
            )}
          </div>
          <div
            style={{
              marginTop: '4em',
              marginRight: '1em',
            }}
          >
            {huyusser.data && isAuthorized && advert && advert.user.token ? (
              // <FermersChat
              //   secondUserId={advert.user_id}
              //   advertId={advert.id}
              //   advertTitle={advert.title}
              //   advertImg={advert.picture}
              // />
              <div
                id="visibleOrNot"
                style={{
                  height: '600px',
                  width: '600px',
                  visibility: 'hidden',
                }}
              >
                <iframe
                  style={{ borderRadius: '5px' }}
                  title="123"
                  src={smhref}
                  width="100%"
                  height="100%"
                ></iframe>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advert;

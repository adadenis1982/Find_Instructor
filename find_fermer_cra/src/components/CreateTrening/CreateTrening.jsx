import { FloatingLabel, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import style from './style.css';
import { addAdvert } from '../../redux/actionCreators/Advert';
import { env } from '../../secret';

export default function CreateTrening() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.checkSessionReducer.user.user);
  const id = data?.id;

  const NewTrening = async (event) => {
    event.preventDefault();

    const body = {
      sport_type: event.target.sport.value,
      title: event.target.title.value,
      city: event.target.city.value,
      content: event.target.description.value,
      price: event.target.price.value,
      duration_min: event.target.duration.value,
      user_id: id,
    };

    const { status, data: advertData } = await dispatch(addAdvert(body));

    if (status === 200) {
      console.log('status', status);
      navigate(`/adverts/${advertData.advert.id}`);
    }
  };

  const { loading } = useSelector((state) => state.advertReducer);

  if (loading) {
    return <h2>Загрузка...</h2>;
  }

  return (
    <div className="content">
      <h2 id="createTrening">Создать свою тренировку</h2>
      <Form onSubmit={NewTrening}>
        {/* <Form.Group className="mb-3">
          <Form.Label>Вид спорта</Form.Label>
          <Form.Control name="sport" type="text" placeholder="Вид спорта" />
        </Form.Group> */}
        <Form.Select aria-label="Default select example" name="sport">
          <option>Выбрать вид спорта</option>
          {env.sport.map((el, i) => (
            <option key={`${i + 1}`} value={el}>
              {el}
            </option>
          ))}
        </Form.Select>

        <Form.Group className="mb-3">
          <Form.Label>Название</Form.Label>
          <Form.Control name="title" type="text" placeholder="Название" />
        </Form.Group>

        <Form.Select aria-label="Default select example" name="city">
          <option>Выбрать город</option>
          {env.city.map((el, i) => (
            <option key={`${i + 1}`} value={el}>
              {el}
            </option>
          ))}
        </Form.Select>

        {/* <Form.Group className="mb-3">
          <Form.Label>Город</Form.Label>
          <Form.Control name="city" type="text" placeholder="Город" />
        </Form.Group> */}

        <div className="space-top">
          <FloatingLabel controlId="floatingTextarea2" label="Описание">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: '100px' }}
              name="description"
            />
          </FloatingLabel>
        </div>

        <Form.Group className="mb-3">
          <Form.Label>Стоимость</Form.Label>
          <Form.Control name="price" type="number" placeholder="Стоимость" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Минимальная продолжительность</Form.Label>
          <Form.Control
            name="duration"
            type="number"
            placeholder="Длительность, мин"
          />
        </Form.Group>
        <div id="buttonCreate">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

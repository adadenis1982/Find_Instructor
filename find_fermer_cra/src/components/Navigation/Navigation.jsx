import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogout } from '../../redux/actionCreators/LogoutAC';
import { deleteChatToken } from '../../redux/actionCreators/huyusser';
import { deleteChatClient } from '../../redux/actionCreators/chatClient';

function Navigation() {
  const { isAuthorized, user } = useSelector(
    (state) => state.checkSessionReducer,
  );
  const chatClient = useSelector((state) => state.chatClient);

  const userID = user.user?.id;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logout = () => {
    dispatch(fetchLogout(navigate));
    chatClient.data.disconnect();
    dispatch(deleteChatToken());
    dispatch(deleteChatClient());
  };

  return (
    <div id="headerDelete">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Поиск инструктора
          </Navbar.Brand>
          <Nav className="justify-content-end">
            <Nav.Link as={Link} to="/">
              Главная
            </Nav.Link>
            {isAuthorized && (
              <>
                <Nav.Link as={Link} to={`/users/${userID}`}>
                  {' '}
                  Личный кабинет
                </Nav.Link>
                <Nav.Link as={Link} to="bigMessenger">
                  {' '}
                  Messenger
                </Nav.Link>
                <Nav.Link as={Link} to="#" onClick={logout}>
                  {' | '}
                  Выйти
                </Nav.Link>
              </>
            )}
            {!isAuthorized && (
              <>
                <Nav.Link as={Link} to="register">
                  Регистрация
                </Nav.Link>
                <Nav.Link as={Link} to="login">
                  Войти
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
      <br />
    </div>
  );
}

export default Navigation;

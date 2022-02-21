import { Routes, Route } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StreamChat } from 'stream-chat';
import Home from '../Home/Home';
import Registration from '../Registration/Registration';
import Login from '../Login/Login';
import Pers from '../Personal/Personal';
import SearchResult from '../SearchResult';
import { fetchCheckSession } from '../../redux/actionCreators/isAuthorizedAC';
import CreateTrening from '../CreateTrening/CreateTrening';
import Advert from '../Advert';
import FormUpdate from '../FormUpdate/FormUpdate';
import FermersChat from '../FermersChat';
import { initChatToken } from '../../redux/actionCreators/huyusser';
import Messenger from '../FermersChat/messenger';
import { initChatClient } from '../../redux/actionCreators/chatClient';
import Example from '../FermersChat/example';
import NotFound from '../NotFound';
import { initBookings } from '../../redux/actionCreators/BookingAC';

function App() {
  const dispatch = useDispatch();
  const huyusser = useSelector((state) => state.huyusser);
  const chatClient = useSelector((state) => state.chatClient);
  const session = useSelector((state) => state.checkSessionReducer);
  useEffect(() => {
    dispatch(fetchCheckSession());
  }, [dispatch]);

  useEffect(() => {
    if (session.isAuthorized) {
      dispatch(initChatToken());
    }
  }, [dispatch, session]);

  useMemo(() => {
    if (session.isAuthorized && huyusser.data) {
      dispatch(initChatClient({ session, userToken: huyusser.data.token }));
    }
  }, [dispatch, huyusser]);

  useEffect(() => {
    const body = {
      user_id: session?.user?.user?.id,
    };
    dispatch(initBookings({ body }));
  }, [session, dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="register" element={<Registration />} />
      <Route path="login" element={<Login />} />
      <Route path="users/:id" element={<Pers />} />
      <Route path="users/:id/newTrening" element={<CreateTrening />} />
      <Route path="users/:id/userInfo" element={<FormUpdate />} />
      <Route path="messenger" element={<Messenger />} />
      <Route path="smallMessenger/:advertId" element={<FermersChat />} />
      <Route path="bigMessenger" element={<Example />} />
      <Route path="search">
        <Route path="result" element={<SearchResult />} />
      </Route>
      <Route path="adverts/:id" element={<Advert />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

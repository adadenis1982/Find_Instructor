import React, { useEffect, useMemo, useState } from 'react';
import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
  LoadingIndicator,
} from 'stream-chat-react';
import hash from 'object-hash';
import 'stream-chat-react/dist/css/index.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { env } from '../../secret';
// { secondUserId, advertId, advertTitle, advertImg }
const FermersChat = () => {
  const params = useParams();
  const [advert, setAdvert] = React.useState(null);
  const auth = useSelector((state) => state.checkSessionReducer);
  const huyusser = useSelector((state) => state.huyusser);
  const chatClient = useSelector((state) => state.chatClient);
  const [channel, setChannel] = useState(null);
  useEffect(() => {
    if (auth.isAuthorized) {
      axios
        .get(`${env.REACT_APP_URL}/adverts/${params.advertId}`, {
          withCredentials: true,
        })
        .then((res) => setAdvert(res.data))
        .catch((err) => console.log(err.message));
    }
  }, [auth]);
  // if (advert?.user_id === auth?.user?.user?.id) return <div>1</div>;
  useEffect(() => {
    console.log('auth.isAuthorized', auth.isAuthorized);
    console.log('chatClient ', chatClient);
    console.log('advert ', advert);
    // console.log(
    //   'advert.user_id !== auth.user.user.id ',
    //   advert.user_id !== auth.user.user.id,
    // );
    if (auth.isAuthorized && chatClient.data && advert) {
      setChannel(
        chatClient.data.channel(
          'messaging',
          hash(`${advert.id}${auth.user.user.id}`),
          {
            // add as many custom fields as you'd like
            image: advert.picture,
            // name: advert.title,
            members: [auth.user.user.id, advert.user_id],
          },
        ),
      );
    }
  }, [advert, chatClient]);
  useEffect(() => {
    if (auth.isAuthorized && chatClient.data && advert) {
      console.log('---------------------------------------');
      console.log('MY_ID', auth?.user?.user?.id);
      console.log('ADVERT', advert);
      console.log('MD5', hash(`${advert.id}${auth?.user?.user?.id}`));
      console.log('CHANNEL', channel);
      console.log('---------------------------------------');
    }
  }, [channel]);

  const darkModeTheme = {
    '--grey-gainsboro': '#ffffff',
  };
  // theme="messaging light"

  if (
    document.querySelector('#headerDelete') &&
    document.querySelector('#footerDelete')
  ) {
    document.querySelector('#headerDelete').remove();
    document.querySelector('#footerDelete').remove();
  }
  setTimeout(() => {
    if (
      document.querySelector('#headerDelete') &&
      document.querySelector('#footerDelete')
    ) {
      document.querySelector('#headerDelete').remove();
      document.querySelector('#footerDelete').remove();
    }
  }, 50);

  if (!advert) {
    return <LoadingIndicator />;
  }
  if (!auth.isAuthorized) return <div>2</div>;
  if (advert.user_id === auth.user.user.id) return <div></div>;
  if (!chatClient.data) {
    return <LoadingIndicator />;
  }
  if (!channel) return <div>pizdec</div>;
  if (document.getElementsByClassName('str-chat__header-hamburger')) {
    setTimeout(() => {
      document.getElementsByClassName('str-chat__header-hamburger')[0].remove();
    }, 700);
  }
  return (
    <Chat
      client={chatClient.data}
      theme="messaging light"
      customStyles={darkModeTheme}
    >
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};
export default FermersChat;

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
  ChannelList,
} from 'stream-chat-react';

import 'stream-chat-react/dist/css/index.css';
import { useDispatch, useSelector } from 'react-redux';

const Messenger = () => {
  let userToken;
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.checkSessionReducer);
  const huyusser = useSelector((state) => state.huyusser);
  const chatClient = useSelector((state) => state.chatClient);

  console.log(chatClient);
  const darkModeTheme = {
    '--bg-gradient-end': '#101214',
    '--bg-gradient-start': '#070a0d',
    '--black': '#ffffff',
    '--blue-alice': '#00193d',
    '--border': '#141924',
    '--button-background': '#ffffff',
    '--button-text': '#005fff',
    '--grey': '#7a7a7a',
    '--grey-gainsboro': '#2d2f2f',
    '--grey-whisper': '#1c1e22',
    '--modal-shadow': '#000000',
    '--overlay': '#00000066',
    '--overlay-dark': '#ffffffcc',
    '--shadow-icon': '#00000080',
    '--targetedMessageBackground': '#302d22',
    '--transparent': 'transparent',
    '--white': '#101418',
    '--white-smoke': '#13151b',
    '--white-snow': '#070a0d',
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
  }, 1);

  if (!auth.isAuthorized) return <div>pizdec</div>;
  const sort = { last_message_at: -1 };
  const filters = {
    type: 'messaging',
    members: { $in: [auth.user.user.id] },
  };
  if (!chatClient.data) {
    return <LoadingIndicator />;
  }

  return (
    <Chat client={chatClient.data} theme="messaging light">
      <ChannelList filters={filters} sort={sort} />
      <Channel>
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
export default Messenger;

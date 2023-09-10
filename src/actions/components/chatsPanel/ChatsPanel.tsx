import { selectChats } from '../../redux/chats/chatsSelector';
import { fetchChats } from '../../redux/chats/chatsSlice';
import { useDispatch, useSelector } from 'react-redux';
import React, { Fragment, useEffect } from 'react';
import { AppDispatch } from '../../redux/store';
import ChatCard from './ChatCard';

const ChatsPanel: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { chats } = useSelector(selectChats);

  useEffect(() => {
    dispatch(fetchChats());
  }, []);

  return (
    <Fragment>
      {chats.map(({ cid, alias, chatImage }: any) => (
        <ChatCard key={cid} cid={cid} chatImage={chatImage} alias={alias} />
      ))}
    </Fragment>
  );
};

export default ChatsPanel;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { selectUser } from '../redux/user/userSelector';
import { VALIDATOR_REQUIRE } from '../Util/validators';
import { useDispatch, useSelector } from 'react-redux';
import { selectChat } from '../redux/chat/selectChat';
import { postMsg } from '../redux/chat/chatSlice';
import { AppDispatch } from '../redux/store';
import { useForm } from '../hooks/form-hook';
import {
  faEllipsisVertical,
  faPaperclip,
} from '@fortawesome/free-solid-svg-icons';
import Button from './FormElements/Button';
import PopUpElement from './PopUpElement';
import Input from './FormElements/input';
import MsgBubble from './MsgBubble';
import React from 'react';

const ChatPanel: React.FC = () => {
  const [formState, inputHandler] = useForm(
    {
      message: {
        value: '',
        isValid: false,
      },
    },
    false
  );
  const { chat, cid, chatImage, alias } = useSelector(selectChat);
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = formState.inputs.message.value;
    dispatch(postMsg({ cid, content: message, type: 'TEXT' }));
  };

  return (
    <div className={`flex w-full h-full  flex-col bg-white`}>
      {/* contact bar */}
      <div className='w-full h-32 flex justify-between bg-grayLight p-5'>
        <div className='flex'>
          {chatImage ? (
            <img
              src={`http://localhost:8000/${chatImage}`}
              alt=''
              className='w-20 h-20 mr-6 circle cursor-pointer transition hover:backdrop-blur-lg hover:opacity-95'
            />
          ) : (
            <div></div>
          )}
          <h3 className='text-3xl'>{alias}</h3>
        </div>
        <div className='flex'>
          {/* Info contact popup */}
          <PopUpElement icon={faPaperclip}>
            <span
              className='transition hover:bg-gray p-3'
              onClick={() => {
                /** */
              }}
            >
              More info
            </span>
          </PopUpElement>
          <PopUpElement icon={faEllipsisVertical}>
            <span
              className='transition hover:bg-gray p-3'
              onClick={() => {
                /** */
              }}
            >
              Add file
            </span>
          </PopUpElement>
        </div>
      </div>
      {/* chat area */}
      <div className='w-full h-0 grow bg-white overflow-y-auto'>
        {chat.map((e: any) => {
          if (e.senderId === user.uid) {
            return <MsgBubble key={e.mid} content={e.content} isRight={true} />;
          } else {
            return <MsgBubble key={e.mid} content={e.content} />;
          }
        })}
      </div>
      {/* Message input */}
      <div className='w-full h-24 flex justify-start items-center pl-5 pr-5 pt-3 pb-3 bg-grayDark'>
        <FontAwesomeIcon
          icon={faPaperclip}
          className='w-10 h-10 cursor-pointer p-3 transition rounded-full text-grayLight mr-3 hover:bg-gray'
        />
        <form
          className='flex w-full h-full space-x-5'
          onSubmit={(event) => handleSubmit(event)}
        >
          <Input
            element='textarea'
            id='message'
            type='text'
            rows={1}
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
          <Button
            rounded={true}
            onClick={handleSubmit}
            disabled={!formState.isValid}
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatPanel;

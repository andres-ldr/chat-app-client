import { Message } from '../types/message';
import moment from 'moment';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { useState } from 'react';
import { Socket } from 'socket.io-client';
import { User } from '../types/user';
import { useMessageSelectedStore } from '../store/messageStore';

interface MessageBuubleProps {
  socket: Socket;
  index: number;
  user: User | null;
  message: Message;
  messages: Message[];
}

const MessageBuuble = ({
  socket,
  index,
  user,
  message: { content, senderId, sender, creationDate },
  messages,
}: MessageBuubleProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { setMessage } = useMessageSelectedStore();

  const handleEditMessage = (message: Message) => {
    setMessage(message);
  };

  const handleDeleteMessage = (message: Message) => {
    socket.emit('delete-message', message);
  };

  const getDate = (date: Date) => {
    const time = moment(date).utc().format('HH:mm');
    return time;
  };

  return (
    <div
      key={index}
      className={`flex bg-slate-950 items-center gap-4 rounded-xl py-1 px-4 ${
        user && senderId === user.uid ? 'self-end' : 'self-start'
      } `}
    >
      {sender && sender.uid !== user?.uid ? (
        <Avatar>
          <AvatarImage
            src={`${import.meta.env.VITE_BACKEND_URL}${sender.profileImage}`}
            alt={sender.name}
          />
          <AvatarFallback>{sender.name[0]}</AvatarFallback>
        </Avatar>
      ) : null}

      <div className='flex gap-2'>
        <p>{content}</p>
        <div className='flex flex-col gap-2 justify-center'>
          {sender && sender.uid === user?.uid && (
            <DropdownMenu>
              <DropdownMenuTrigger>...</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  className='text-yellow-500 font-semibold'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditMessage(messages[index]);
                  }}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className='text-red-500 font-semibold'
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDeleteDialogOpen(true);
                  }}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <p className='text-xs text-slate-400'>{getDate(creationDate)}</p>
        </div>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        {isDeleteDialogOpen && (
          <DialogContent onClick={(e) => e.stopPropagation()}>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. Are you sure you want to
                permanently delete this file from our servers?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                className='bg-red-500 hover:bg-red-700'
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteMessage(messages[index]);
                  setIsDeleteDialogOpen(false);
                }}
              >
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default MessageBuuble;

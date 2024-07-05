import { Chat } from '../types/chat';
import { User } from '../types/user';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { Card } from './ui/card';
import { Avatar, AvatarImage } from './ui/avatar';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import GroupForm from './GroupForm';

interface ChatCardProps {
  chat: Chat;
  chatSelected: Chat;
  notifications: { [key: string]: number };
  user: User;
  handleChat: (chat: Chat) => void;
  onDeleteChat: (cid: string) => void;
  onEditChatGroup: (chat: Chat) => void;
}

const ChatCard = ({
  chat,
  chatSelected,
  notifications,
  user,
  handleChat,
  onDeleteChat,
  onEditChatGroup,
}: ChatCardProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const getImageUrl = () => {
    if (chat.isGroup) {
      return chat.chatImage;
    }
    return chat.members.filter((member) => member.uid !== user.uid)[0]
      .profileImage;
  };
  const getChatName = () => {
    if (chat.isGroup) {
      return chat.alias;
    }
    return chat.members.filter((member) => member.uid !== user.uid)[0].name;
  };

  return (
    <Card
      key={chat.cid}
      className={`${
        chat.cid === chatSelected?.cid && 'bg-slate-950'
      } text-slate-100 bg-slate-900 border-none flex gap-2 py-2 px-4 justify-between items-center hover:bg-slate-950 transition-colors duration-200 ease-in-out cursor-pointer`}
      onClick={() => handleChat(chat)}
    >
      <div className='flex gap-2'>
        <Avatar>
          <AvatarImage
            src={`${import.meta.env.VITE_BACKEND_URL}${getImageUrl()}`}
          />
          {/* <AvatarFallback>{}</AvatarFallback> */}
        </Avatar>
        <div>
          <p className='font-bold'>{getChatName()}</p>
        </div>
      </div>

      {user &&
        chat.isGroup &&
        chat.admins.some((admin: User) => admin.uid === user.uid) && (
          <DropdownMenu>
            <DropdownMenuTrigger>Options</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                className='text-yellow-500 font-semibold'
                onClick={(e) => {
                  e.stopPropagation();
                  onEditChatGroup(chat);
                  setIsEditDialogOpen(true);
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

      {notifications[chat.cid] > 0 && (
        <span className='flex items-center justify-center w-6 h-6 bg-blue-500 text-white rounded-full'>
          {notifications[chat.cid]}
        </span>
      )}

      <Dialog
        open={isEditDialogOpen || isDeleteDialogOpen}
        onOpenChange={
          isEditDialogOpen ? setIsEditDialogOpen : setIsDeleteDialogOpen
        }
      >
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
                  onDeleteChat(chat.cid);
                }}
              >
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        )}

        {isEditDialogOpen && (
          <DialogContent
            className='sm:max-w-[425px] max-h-[70%] overflow-y-auto bg-slate-950'
            onClick={(e) => e.stopPropagation()}
          >
            <DialogHeader className='text-slate-100'>
              <DialogTitle>Edit Group Chat</DialogTitle>
            </DialogHeader>
            <DialogDescription>Edit Group Chat</DialogDescription>
            <GroupForm onClose={() => setIsEditDialogOpen(false)} />
          </DialogContent>
        )}
      </Dialog>
    </Card>
  );
};

export default ChatCard;

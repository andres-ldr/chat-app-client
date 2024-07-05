import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  useCreateChatGroup,
  useUpdateChatGroup,
  useUser,
} from '../services/mutations';
import { User } from '../types/user';
import { useChats } from '../services/queries';
import { useGroupChatSelectedStore } from '../store/groupChatSelectedStore';
import { Card } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { toast } from 'sonner';

type Input = {
  alias: string;
  chatImage: FileList | null;
};

interface GroupFormProps {
  onClose?: () => void;
}

const GroupForm = ({ onClose }: GroupFormProps) => {
  const [members, setMembers] = useState<User[]>([]);
  const [admins, setAdmins] = useState<User[]>([]);
  const { reset, handleSubmit, register } = useForm<Input>();
  const [file, setFile] = useState<File | null>(null);
  const useGetUserEmailMutation = useUser();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const createChatGroupMutation = useCreateChatGroup();
  const getChatsQuery = useChats();
  const { groupChat, cleanGroupChat } = useGroupChatSelectedStore();
  const [chatImage, setChatImage] = useState<string | null>(null);
  const updateChatGroupMutation = useUpdateChatGroup();

  useEffect(() => {
    if (createChatGroupMutation.isSuccess) {
      getChatsQuery.refetch();
      toast(createChatGroupMutation.data.message);
      onClose && onClose();
    }
    if (updateChatGroupMutation.isSuccess) {
      getChatsQuery.refetch();
      toast(updateChatGroupMutation.data.message);
      onClose && onClose();
    }
    if (updateChatGroupMutation.error) {
      toast(updateChatGroupMutation.error.message);
      onClose && onClose();
    }
    if (createChatGroupMutation.error) {
      toast(createChatGroupMutation.error.message);
      onClose && onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    createChatGroupMutation.isSuccess,
    updateChatGroupMutation.isSuccess,
    updateChatGroupMutation.error,
    createChatGroupMutation.error,
  ]);

  useEffect(() => {
    if (groupChat) {
      reset({
        alias: groupChat.alias,
      });
      setMembers(groupChat.members);
      setChatImage(groupChat.chatImage);
      setAdmins(groupChat.admins);
    }
  }, [groupChat, reset]);

  const onSubmit = (data: Input) => {
    const membersIds = members.map((member) => member.uid);

    const formData = new FormData();

    formData.append('alias', data.alias);

    if (data.chatImage && data.chatImage[0]) {
      formData.append('chatImage', data.chatImage[0]);
    }

    membersIds.forEach((memberId) => formData.append('members', memberId));

    admins.forEach((admin) => formData.append('admins', admin.uid));

    if (groupChat) {
      formData.append('cid', groupChat.cid);
      updateChatGroupMutation.mutate(formData);
      cleanGroupChat();
    } else {
      createChatGroupMutation.mutate(formData);
    }

    reset();
    setMembers([]);
    setAdmins([]);
    setFile(null);
    setChatImage(null);
  };

  const handleUserSelected = (user: User) => {
    setMembers((prev) => [...prev, user]);
    useGetUserEmailMutation.reset();
    if (emailInputRef.current) {
      emailInputRef.current.value = '';
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    useGetUserEmailMutation.mutate({ email: e.target.value });
  };

  const onRemoveMember = (index: number) => {
    setMembers((prev) => prev.filter((_, i) => i !== index));
  };

  const onFileUploaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray: File[] = Array.from(e.target.files);
      setFile(filesArray[0]);
    }
  };

  const onDiscardChanges = () => {
    cleanGroupChat();
    reset({
      alias: '',
      chatImage: null,
    });
    setMembers([]);
    setAdmins([]);
    setFile(null);
    setChatImage(null);
    onClose && onClose();
  };

  return (
    <form
      className='flex flex-col gap-8 pt-8 text-slate-100'
      onSubmit={handleSubmit(onSubmit)}
      method='post'
    >
      <label className='flex flex-col gap-4'>
        <span className='text-slate-100 font-semibold'>Group Name</span>
        <input
          autoComplete='off'
          type='text'
          id='alias'
          className='bg-slate-900 border border-gray-400 rounded-md p-2'
          placeholder='Group Name'
          {...register('alias', {
            required: true,
          })}
        />
      </label>
      <label className='flex flex-col gap-6'>
        <span className='text-slate-100 font-semibold'>
          Add a Member by Email
        </span>
        <input
          autoComplete='off'
          type='email'
          ref={emailInputRef}
          placeholder='email@example.com'
          className='bg-slate-900 border border-gray-400 rounded-md p-2'
          onChange={handleEmailChange}
        />
        {useGetUserEmailMutation.isSuccess &&
        useGetUserEmailMutation.data.length > 0 ? (
          <div className='max-h-40 rounded-lg flex flex-col gap-1  overflow-y-auto shadow'>
            {useGetUserEmailMutation.data.map((user) => (
              <Card
                key={user.uid}
                className='bg-slate-800 flex gap-2  py-2 px-4 hover:bg-slate-700 hover:cursor-pointer transition duration-150 ease-in-out'
                onClick={() => handleUserSelected(user)}
              >
                <Avatar>
                  <AvatarImage
                    src={`${import.meta.env.VITE_BACKEND_URL}${
                      user.profileImage
                    }`}
                  />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <span className='text-slate-300'>{user.email}</span>
              </Card>
            ))}
          </div>
        ) : null}

        {members.length > 0 ? (
          <div className='flex flex-col gap-1'>
            {members.map((member, index) => (
              <Card
                key={index}
                className='bg-slate-950 rounded-lg py-2 px-4 flex flex-col gap-4 justify-between'
              >
                <span className='text-slate-300'> {member.email}</span>
                <div className='flex gap-2'>
                  <span
                    className='text-blue-500 hover:cursor-pointer'
                    onClick={() => setAdmins((prev) => [...prev, member])}
                  >
                    Add as Admin
                  </span>
                  <span
                    className='text-red-500 hover:cursor-pointer'
                    onClick={() => onRemoveMember(index)}
                  >
                    Remove
                  </span>
                </div>
              </Card>
            ))}
          </div>
        ) : null}
      </label>
      <div className='flex flex-col gap-2'>
        <span className='font-semibold'>Admins</span>
        {admins.length > 0 ? (
          <ul className='flex flex-col gap-1'>
            {admins.map((member, index) => (
              <li
                key={index}
                className='bg-slate-950 rounded-lg py-2 px-4 flex justify-between'
              >
                <span className=''> {member.email}</span>
                <button
                  className='text-red-500'
                  onClick={() =>
                    setAdmins((prev) => prev.filter((_, i) => i !== index))
                  }
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No more admins</p>
        )}
      </div>
      <label className='flex flex-col gap-4'>
        <span className='font-semibold'>Choose an Image</span>
        <input
          type='file'
          {...register('chatImage', {
            onChange: onFileUploaderChange,
          })}
        />
      </label>
      {file || chatImage ? (
        <>
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : import.meta.env.VITE_BACKEND_URL + chatImage
            }
            className='w-20 h-20 object-cover object-top rounded-full self-center'
          />
          <Button
            variant='outline'
            type='submit'
            onClick={() => {
              reset({
                chatImage: null,
              });
              setFile(null);
            }}
            className='text-red-500 bg-slate-950 border-red-500 hover:text-white hover:bg-red-500 transition duration-200 ease-in-out'
          >
            Remove Image
          </Button>
        </>
      ) : (
        <div className='w-20 h-20 flex justify-center items-center bg-grayReg border-2 border-dashed rounded-full self-center'>
          <svg
            className='w-full h-full object-cover rounded-full'
            viewBox='0 0 18 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M9 0C6.23858 0 4 2.23858 4 5C4 7.76142 6.23858 10 9 10C11.7614 10 14 7.76142 14 5C14 2.23858 11.7614 0 9 0ZM6 5C6 3.34315 7.34315 2 9 2C10.6569 2 12 3.34315 12 5C12 6.65685 10.6569 8 9 8C7.34315 8 6 6.65685 6 5Z'
              fill='#474747'
            />
            <path
              d='M5 12C3.67392 12 2.40215 12.5268 1.46447 13.4645C0.526784 14.4021 0 15.6739 0 17V19C0 19.5523 0.447715 20 1 20C1.55228 20 2 19.5523 2 19V17C2 16.2043 2.31607 15.4413 2.87868 14.8787C3.44129 14.3161 4.20435 14 5 14H13C13.7956 14 14.5587 14.3161 15.1213 14.8787C15.6839 15.4413 16 16.2044 16 17V19C16 19.5523 16.4477 20 17 20C17.5523 20 18 19.5523 18 19V17C18 15.6739 17.4732 14.4021 16.5355 13.4645C15.5979 12.5268 14.3261 12 13 12H5Z'
              fill='#474747'
            />
          </svg>
        </div>
      )}
      <button type='submit' className='bg-blue-500 text-white rounded-md p-2'>
        {groupChat ? 'Edit Group' : 'Create Group'}
      </button>
      {groupChat && (
        <button
          type='button'
          className='text-red-500 p-2 font-semibold'
          onClick={onDiscardChanges}
        >
          Discard Changes
        </button>
      )}
    </form>
  );
};

export default GroupForm;

interface FormMessageProps {
  register: any;
  handleSubmit: any;
  onSubmit: any;
  message: any;
}

const FormMessage = ({
  handleSubmit,
  register,
  message,
  onSubmit,
}: FormMessageProps) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex gap-2 py-2 px-4 bg-slate-950'>
      <input
        {...register('message')}
        type='text'
        placeholder='Message'
        className='bg-slate-900 w-11/12 py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200'
      />
      <button
        type='submit'
        className='rounded-full py-2 px-4 bg-blue-500 text-white hover:bg-blue-600 transition duration-200 font-bold text-center'
      >
        {message ? 'Edit' : 'Send'}
      </button>
    </form>
  );
};

export default FormMessage;

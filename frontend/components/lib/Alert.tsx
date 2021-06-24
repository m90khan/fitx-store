interface Props {
  bg: string;
  color: string;
  text?: any;
}

const Alert = ({
  status = 'Error',
  bg = 'bg-white',
  color = 'text-pink-600',
  text = 'Something went wrong',
}) => {
  const container = `inline-flex items-center ${bg} leading-none ${color} rounded-full p-2 shadow text-teal text-sm`;
  return (
    <div className='text-center p-2'>
      <div className={container}>
        <span className='inline-flex bg-pink-600 text-white rounded-full h-6 px-3 justify-center items-center'>
          {status}
        </span>
        <span className='inline-flex px-2'>{text}</span>
      </div>
    </div>
  );
};

export default Alert;

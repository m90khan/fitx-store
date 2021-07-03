interface Props {
  bg: string;
  color: string;
  text?: any;
}

const Alert = ({
  status = 'Error',
  bg = 'bg-gray-900',
  color = 'text-white',
  text = 'Something went wrong',
}) => {
  const container = `inline-flex items-center ${bg} leading-none ${color} rounded p-2 shadow text-teal text-sm`;
  return (
    <div className='text-center p-2'>
      <div className={container}>
        <span className='inline-flex bg-gray-600 text-white font-bold rounded h-6 px-3 justify-center items-center'>
          {status}:
        </span>
        <span className='inline-flex px-2 font-semibold'>{text}</span>
      </div>
    </div>
  );
};

export default Alert;

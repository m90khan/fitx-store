import Link from 'next/link';
import Page from '../../components/Page';

const accountPage = () => {
  return (
    <Page>
      <div className='flex flex-col w-auto gap-y-6	 h-96 justify-items-center justify-center items-center text-center'>
        <div className='w-1/6 bg-gray-900 text-white py-2 px-2 grid-span-1 cursor-pointer hover:bg-gray-700 shadow-lg rounded '>
          <Link href='/account/login'>
            <h1>Login</h1>
          </Link>
        </div>
        <div className='w-1/6 bg-gray-900 text-white py-2 px-2 grid-span-1 cursor-pointer hover:bg-gray-700 shadow-lg rounded '>
          <Link href='/account/register'>
            <h1>Register</h1>
          </Link>
        </div>
        <div className='w-1/6 bg-gray-900 text-white py-2 px-2 grid-span-1 cursor-pointer hover:bg-gray-700 shadow-lg rounded '>
          <Link href='/account/resetpassword'>
            <h1>Forgot Password?</h1>
          </Link>
        </div>
      </div>
    </Page>
  );
};

export default accountPage;

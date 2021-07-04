import Link from 'next/link';
import getUser from '../../components/GetUser';
import Page from '../../components/Page';

const accountPage = () => {
  const user = getUser();
  return (
    <Page>
      <div className='flex flex-col w-auto gap-y-6	 h-96 justify-items-center justify-center items-center text-center'>
        {!user && (
          <>
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
          </>
        )}
        {user && (
          <>
            <div className='w-1/6 bg-gray-900 text-white py-2 px-2 grid-span-1 cursor-pointer hover:bg-gray-700 shadow-lg rounded '>
              <Link href='/account/update'>
                <h1>Edit Profile</h1>
              </Link>
            </div>
            <div className='w-1/6 bg-gray-900 text-white py-2 px-2 grid-span-1 cursor-pointer hover:bg-gray-700 shadow-lg rounded '>
              <Link href='/account/myproducts'>
                <h1>My Products</h1>
              </Link>
            </div>
          </>
        )}
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

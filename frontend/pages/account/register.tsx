import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import { CURRENT_USER_QUERY } from '../../components/GetUser';
import useForm from '../../utils/useForm';
import Page from './../../components/Page';
import Alert from './../../components/lib/Alert';

const REGISTER_MUTATION = gql`
  mutation REGISTER_MUTATION($email: String!, $name: String!, $password: String!) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      id
      email
      name
    }
  }
`;

const Register = () => {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    name: '',
  });
  const [register, { data, error, loading }] = useMutation(REGISTER_MUTATION, {
    variables: inputs,
    // refetch current logged in users
    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  console.log(inputs);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await register();
    resetForm(e);
    setTimeout(() => {
      Router.push({ pathname: '/account/login' });
    }, 2000);
  };
  return (
    <Page>
      <form className='flex h-4/5  items-center justify-center  ' onSubmit={handleSubmit}>
        <div className='grid bg-white rounded-lg shadow-xl w-8/9 md:w-9/12 lg:w-1/3'>
          <div className='flex justify-center py-4'>
            <div className='flex bg-purple-200 rounded-full md:p-4 p-2 border-2 border-purple-300'>
              <svg
                className='w-8 h-8 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
                ></path>
              </svg>
            </div>
          </div>

          <div className='flex justify-center'>
            <div className='flex flex-col'>
              <h1 className='text-gray-600 font-bold md:text-2xl text-xl'>
                Register New Account
              </h1>
              {loading && <Alert text='Loading ...' status='Registering User' />}

              {data?.createUser && (
                <Alert text='Account created successfully...' status='Success' />
              )}
              {error && <Alert text={error.message} />}
            </div>
          </div>
          {/* {error && <Alert text={error.message} />}
        {loading && <Alert text='Loading ...' status='Creating Product' />}
    {data && <Alert text='Product uploaded successfully...' status='Success' />} */}
          <fieldset>
            <div className='grid grid-cols-1 mt-5 mx-7'>
              <label
                className='uppercase md:text-sm text-xs text-gray-500 text-light font-semibold'
                htmlFor='name'
              >
                Your Name
              </label>
              <input
                className='py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
                type='text'
                placeholder='Name'
                id='name'
                name='name'
                required
                autoComplete='name'
                value={inputs.name}
                onChange={handleChange}
              />
            </div>
            <div className='grid grid-cols-1 mt-5 mx-7'>
              <label
                className='uppercase md:text-sm text-xs text-gray-500 text-light font-semibold'
                htmlFor='email'
              >
                Email
              </label>
              <input
                className='py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
                type='email'
                placeholder='Email Address'
                id='email'
                name='email'
                required
                autoComplete='email'
                value={inputs.email}
                onChange={handleChange}
              />
            </div>

            <div className='grid grid-cols-1 mt-5 mx-7'>
              <label
                className='uppercase md:text-sm text-xs text-gray-500 text-light font-semibold'
                htmlFor='password'
              >
                Password
              </label>
              <input
                className='py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
                type='password'
                placeholder='Password'
                id='password'
                name='password'
                required
                autoComplete='password'
                value={inputs.password}
                onChange={handleChange}
              />
            </div>

            <div className='flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5'>
              <button className='w-auto bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2'>
                Cancel
              </button>
              <button
                className='w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2'
                type='submit'
              >
                Register
              </button>
            </div>
          </fieldset>
        </div>
      </form>
    </Page>
  );
};

export default Register;

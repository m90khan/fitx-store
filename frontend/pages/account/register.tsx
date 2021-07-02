import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { default as Router, default as router } from 'next/router';
import { useEffect } from 'react';
import getUser from '../../components/GetUser';
import useForm from '../../utils/useForm';
import Alert from './../../components/lib/Alert';
import FormHeader from './../../components/lib/FormHeader';
import Page from './../../components/Page';

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
  const user = getUser();
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    await register();
    resetForm(e);
    setTimeout(() => {
      Router.push({ pathname: '/account/login' });
    }, 2000);
  };
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        router.push('/');
      }, 1000);
    }
  }, [user]);
  if (user)
    return <Alert text='You are logged in. Cannot access this route' status='Error' />;
  return (
    <Page>
      <form
        className='flex h-4/5 py-4 items-center justify-center  '
        onSubmit={handleSubmit}
      >
        <div className='grid bg-white rounded-lg shadow-xl w-8/9 md:w-9/12 lg:w-1/3 py-4'>
          <FormHeader text='Register New Account' />

          <div className='flex justify-center'>
            <div className='flex flex-col'>
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
                className='py-2 px-3 rounded-lg border-2 border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent'
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
                className='py-2 px-3 rounded-lg border-2 border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent'
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
                className='py-2 px-3 rounded-lg border-2 border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent'
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
                className='w-auto bg-gray-900 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2'
                type='submit'
              >
                Register
              </button>
            </div>
          </fieldset>
          <p className='py-2 px-4'>
            Already have an account?{' '}
            <span
              className='cursor-pointer bg-gray-900 text-white hover:bg-gray-700 hover:text-white py-1 px-2 rounded-lg'
              onClick={() =>
                Router.push({
                  pathname: `/account/login`,
                })
              }
            >
              Login
            </span>
          </p>
        </div>
      </form>
    </Page>
  );
};

export default Register;

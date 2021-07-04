import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { default as router, default as Router } from 'next/router';
import { useEffect } from 'react';
import getUser, { CURRENT_USER_QUERY } from '../../components/GetUser';
import useForm from '../../utils/useForm';
import Alert from './../../components/lib/Alert';
import FormHeader from './../../components/lib/FormHeader';
import Page from './../../components/Page';

const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION($id: ID!, $name: String!, $email: String!) {
    updateUser(id: $id, data: { email: $email, name: $name }) {
      id
      name
      email
    }
  }
`;

const Update = () => {
  const user = getUser();

  const { inputs, handleChange, resetForm } = useForm({
    email: user?.email,
    name: user?.name,
  });
  const [updateUser, { error, loading }] = useMutation(UPDATE_USER_MUTATION, {
    variables: {
      id: user?.id,
      name: inputs.name,
      email: inputs.email,
    },
    // refetch current logged in users
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser();
    resetForm(e);
    Router.push({ pathname: '/' });
  };
  useEffect(() => {
    if (!user) {
      setTimeout(() => {
        router.push('/');
      }, 1000);
    }
  }, [user]);
  if (!user)
    return (
      <Alert text='You are not logged in. Cannot access this route' status='Error' />
    );
  return (
    <Page>
      <form
        className='flex h-4/5  items-center justify-center py-4'
        method='POST'
        onSubmit={handleSubmit}
      >
        <div className='grid bg-white rounded-lg shadow-xl w-8/9 md:w-9/12 lg:w-1/3 py-4'>
          <FormHeader text='Update Profile' />
          {error && <Alert text={error.message} status='Error: ' />}
          {loading && <Alert status='Loading ...' text='Loggin You In' />}
          <fieldset>
            <div className='grid grid-cols-1 mt-5 mx-7'>
              <label
                className='uppercase md:text-sm text-xs text-gray-500 text-light font-semibold'
                htmlFor='name'
              >
                Name
              </label>
              <input
                className='py-2 px-3 rounded-lg border-2 border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent'
                type='text'
                placeholder='name'
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

            <div className='flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5'>
              <button className='w-auto bg-gray-500 hover:bg-gray-700 rounded  shadow-xl font-medium text-white px-4 py-2'>
                Cancel
              </button>
              <button
                className='w-auto bg-gray-900 hover:bg-gray-700 rounded shadow-xl font-medium text-white px-4 py-2'
                type='submit'
              >
                Update Me
              </button>
            </div>
          </fieldset>
        </div>
      </form>
    </Page>
  );
};

export default Update;

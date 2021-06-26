import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Router, { useRouter } from 'next/router';
import getUser, { CURRENT_USER_QUERY } from '../../components/GetUser';
import useForm from '../../utils/useForm';
import Page from '../../components/Page';
import Alert from '../../components/lib/Alert';
import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';

const CHANGE_PASSWORD_WITH_TOKEN = gql`
  mutation ChangePasswordWithToken($token: String!, $password: String!) {
    changePasswordWithToken(token: $token, password: $password) {
      id
    }
  }
`;

const GET_PASSWORD_TOKEN = gql`
  query GET_PASSWORD_TOKEN($token: String!, $accessedAt: DateTime) {
    passwordTokens: allForgottenPasswordTokens(
      where: { token: $token, expiresAt_gte: $accessedAt }
    ) {
      id
    }
  }
`;

const ChangePassword = () => {
  const accessedAt = new Date().toISOString();
  const { query } = useRouter();
  const token = query.key;
  const user = getUser();
  const [errorState, setErrorState] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { inputs, handleChange, resetForm } = useForm({
    password: '',
  });
  const { data, loading, error } = useQuery(GET_PASSWORD_TOKEN, {
    variables: token && { token, accessedAt },
  });
  console.log('data', data);
  console.log(typeof token, token);

  const [startPasswordRecovery, { error: mutationError }] = useMutation(
    CHANGE_PASSWORD_WITH_TOKEN,
    {
      onCompleted: () => {
        Router.push('/account/login');
      },
    }
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (inputs.password !== inputs.confirmPassword) {
    //   setErrorState('Passwords do not match');
    // } else if (inputs.password.length < 8) {
    //   setErrorState('Passwords must be longer than 8 characters');
    // } else {
    //   setErrorState('');
    //   setNewPassword(inputs.password);
    // }
    resetForm(e);
    await startPasswordRecovery({ variables: { token, inputs } });
    // Router.push({ pathname: '/' });
  };

  return (
    <Page>
      {loading && !data ? (
        <Alert text='Loading ...' status='Loggin You In' />
      ) : error || !data.passwordTokens || !data.passwordTokens.length ? (
        <Alert text={error.message} status='Loggin You In' />
      ) : (
        <form
          className='flex h-4/5  items-center justify-center'
          method='POST'
          onSubmit={handleSubmit}
        >
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
              <div className='flex'>
                <h1 className='text-gray-600 font-bold md:text-2xl text-xl'>
                  Password Reset Request
                </h1>
              </div>
            </div>
            {error && <Alert text={error.message} />}
            {loading && <Alert text='Loading ...' status='Password Reset In Progress' />}
            <fieldset>
              <div className='grid grid-cols-1 mt-5 mx-7'>
                <label
                  className='uppercase md:text-sm text-xs text-gray-500 text-light font-semibold'
                  htmlFor='password'
                >
                  password
                </label>
                <input
                  className='py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
                  type='password'
                  placeholder='password Address'
                  id='password'
                  name='password'
                  required
                  autoComplete='password'
                  value={inputs.password}
                  onChange={handleChange}
                />
              </div>
              <div className='grid grid-cols-1 mt-5 mx-7'>
                <label
                  className='uppercase md:text-sm text-xs text-gray-500 text-light font-semibold'
                  htmlFor='confirmPassword'
                >
                  password Confirm
                </label>
                <input
                  className='py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
                  type='password'
                  placeholder='confirmPassword'
                  id='confirmPassword'
                  name='confirmPassword'
                  required
                  autoComplete='confirmPassword'
                  value={inputs.confirmPassword}
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
                  Reset Password
                </button>
              </div>
            </fieldset>
          </div>
        </form>
      )}
    </Page>
  );
};

export default ChangePassword;

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//   const token = query.key;
//   console.log(token);
//   return { props: { token } };
// };

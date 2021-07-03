import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import getUser from '../../components/GetUser';
import Alert from '../../components/lib/Alert';
import FormHeader from '../../components/lib/FormHeader';
import Page from '../../components/Page';
import useForm from '../../utils/useForm';

const CHANGE_PASSWORD_WITH_TOKEN = gql`
  mutation CHANGE_PASSWORD_WITH_TOKEN($token: String!, $password: String!) {
    changePasswordWithToken(token: $token, password: $password) {
      name
      email
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

const ChangePasswordForm = ({ token, accessedAt }) => {
  const user = getUser();
  const [errorState, setErrorState] = useState('');
  const { inputs, handleChange, resetForm } = useForm({
    password: '',
    confirmPassword: '',
  });

  const { data, loading, error } = useQuery(GET_PASSWORD_TOKEN, {
    variables: token && { token, accessedAt },
  });

  const [
    startPasswordRecovery,
    { data: dataNewPassword, loading: dataNewLoading, error: mutationError },
  ] = useMutation(CHANGE_PASSWORD_WITH_TOKEN, {
    onCompleted: () => {
      Router.push('/account/login');
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputs.password !== inputs.confirmPassword) {
      setErrorState('Passwords do not match');
    } else if (inputs.password.length < 8) {
      setErrorState('Passwords must be longer than 8 characters');
    } else {
      setErrorState('');
      await startPasswordRecovery({ variables: { token, password: inputs.password } });
      resetForm(e);
      setTimeout(() => {
        Router.push({ pathname: '/' });
      }, 2000);
    }
  };

  useEffect(() => {
    if (user) Router.push({ pathname: '/' });
  }, [user]);
  return (
    <Page>
      {/* {loading && !data ? (
        <Alert text='Loading ...' status='Loggin You In' />
      ) : error || !data.passwordTokens || !data.passwordTokens.length ? (
        <Alert text={error.message} status='Loggin You In' />
      ) : ( */}
      <form
        className='flex h-4/5  items-center justify-center'
        method='POST'
        onSubmit={handleSubmit}
      >
        <div className='grid bg-white rounded-lg shadow-xl w-8/9 md:w-9/12 lg:w-1/3'>
          <FormHeader text='Password Reset Request' />
          {error && <Alert text={error.message} />}
          {dataNewLoading && (
            <Alert text='Loading: ' status='Password Reset In Progress ...' />
          )}
          {dataNewLoading && (
            <Alert status='Loading: ' text='Password Reset In Progress...' />
          )}
          {dataNewPassword && (
            <Alert status='Success: ' text='Password has been updated successfully.' />
          )}
          <fieldset>
            <div className='grid grid-cols-1 mt-5 mx-7'>
              <label
                className='uppercase md:text-sm text-xs text-gray-500 text-light font-semibold'
                htmlFor='password'
              >
                password
              </label>
              <input
                className='py-2 px-3 rounded-lg border-2 border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent'
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
                className='py-2 px-3 rounded-lg border-2 border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent'
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
              <button className='w-auto bg-gray-500 hover:bg-gray-700 rounded shadow-xl font-medium text-white px-4 py-2'>
                Cancel
              </button>
              <button
                className='w-auto bg-gray-900 hover:bg-gray-700 rounded shadow-xl font-medium text-white px-4 py-2'
                type='submit'
              >
                Reset Password
              </button>
            </div>
          </fieldset>
        </div>
      </form>
      {/* )} */}
    </Page>
  );
};

const ChangePassword = ({ token, accessedAt }) => {
  if (!token) {
    Router.push('/');
  }
  return <ChangePasswordForm token={token} accessedAt={accessedAt} />;
};
export async function getServerSideProps(context) {
  const token = context.query.key;
  const accessedAt = new Date().toISOString();
  return { props: { token, accessedAt } };
}

export default ChangePassword;

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//   const token = query.key;
//   console.log(token);
//   return { props: { token } };
// };

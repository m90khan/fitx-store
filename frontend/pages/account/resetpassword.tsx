import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import { useState } from 'react';
import Alert from '../../components/lib/Alert';
import FormHeader from '../../components/lib/FormHeader';
import Page from '../../components/Page';
import useForm from '../../utils/useForm';

const PASSWORD_RESET_MUTATION = gql`
  mutation startPasswordRecovery($email: String!) {
    startPasswordRecovery(email: $email) {
      user {
        name
        email
      }
    }
  }
`;

const ResetPassword = () => {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });
  const [successStatus, setSuccessStatus] = useState(false);
  const [resetPassword, { data, error, loading }] = useMutation(PASSWORD_RESET_MUTATION);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await resetPassword({
      variables: inputs,
    });
    resetForm(e);
    setSuccessStatus(true);
    setTimeout(() => {
      Router.push({ pathname: '/' });
    }, 2000);
  };
  return (
    <Page>
      <form
        className='flex h-4/5  items-center justify-center py-4'
        method='POST'
        onSubmit={handleSubmit}
      >
        <div className='grid bg-white rounded-lg shadow-xl w-8/9 md:w-9/12 lg:w-1/3'>
          <FormHeader text=' Password Reset Request' />
          {error && <Alert status='Error: ' text={error.message} />}
          {successStatus && (
            <Alert
              status='Success: '
              text='An email has been sent to you, proceed with the instructions provided in email'
            />
          )}
          {loading && <Alert status='Loading: ' text='Password Reset In Progress ...' />}
          <fieldset>
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
                className='w-auto bg-gray-900 hover:bg-gray-700 rounded  shadow-xl font-medium text-white px-4 py-2'
                type='submit'
              >
                Reset Password
              </button>
            </div>
          </fieldset>
        </div>
      </form>
    </Page>
  );
};

export default ResetPassword;

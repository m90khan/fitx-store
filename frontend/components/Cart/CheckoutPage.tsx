import { useMutation } from '@apollo/client';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import nProgress from 'nprogress';
import { useEffect, useState } from 'react';
import getUser, { CURRENT_USER_QUERY } from '../GetUser';
import Alert from '../lib/Alert';
import FormHeader from '../lib/FormHeader';

/*
- Handle credit card payments | Elements
- Load Stripe onto browser | loadStripe

*/
const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

function CheckoutForm() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [zipCode, setZipCode] = useState('');

  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [checkout, { error: graphQLError }] = useMutation(CREATE_ORDER_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  const handleSubmit = async (e) => {
    // 1. Stop the form from submitting and turn the loader one
    e.preventDefault();
    setLoading(true);
    // 2. Start the page transition
    nProgress.start();
    // 3. Create the payment method via stripe (Token comes back here if successful)
    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card', // credit card
      card: elements.getElement(CardElement), // refers to stripe element card]
    });
    console.log(paymentMethod);
    // 4. Handle any errors from stripe
    if (stripeError) {
      // @ts-ignore
      setError(stripeError);
      nProgress.done();
      return; // stops the checkout from happening
    }
    // 5. Send the token from step 3 to our keystone server, via a custom mutation!
    const order = await checkout({
      variables: {
        token: paymentMethod.id,
      },
    });
    console.log(`Finished with the order!!`);
    // 6. Change the page to view the order
    router.push({
      pathname: `/order/[id]`,
      query: {
        id: order.data.checkout.id,
      },
    });

    // 8. turn the loader off
    setLoading(false);
    nProgress.done();
  };
  const user = getUser();
  useEffect(() => {
    if (!user) {
      router.push({
        pathname: `/`,
      });
    }
  }, [user]);
  if (!user)
    return (
      <Alert status='Error' text='You do not have permission to access this route' />
    );
  return (
    <form
      onSubmit={handleSubmit}
      className='flex h-4/5  items-center justify-center py-6  '
    >
      {loading && <Alert status='Loading' text='Loading Checkout' />}
      {error && (
        // @ts-ignore
        <Alert status='error' text={error.message} />
      )}
      {graphQLError && <Alert status='error' text={graphQLError.message} />}
      <div className='grid   rounded-lg shadow-xl w-8/9 md:w-9/12 lg:w-1/3 bg-gray-400 py-4 px-6'>
        <FormHeader text='Payment' />

        <div className='mt-10 grid grid-cols-3 justify-center items-center  bg-gray-700 px-2  border-b-2 border-gray-100 border-opacity-20'>
          <label
            className='uppercase  col-span-1  font-bold   mr-5 text-white text-light font-semibold'
            htmlFor='address'
          >
            Address
          </label>
          <input
            className='py-2 px-3 col-span-2 font-semibold bg-transparent  text-white  mt-1 focus:outline-none   focus:border-transparent'
            type='text'
            placeholder='Address'
            id='address'
            name='address'
            required
            autoComplete='address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className='grid grid-cols-3 justify-center items-center  bg-gray-700 px-2  border-b-2 border-gray-100 border-opacity-20'>
          <label
            className='uppercase  col-span-1  font-bold   mr-5 text-white text-light font-semibold'
            htmlFor='city'
          >
            City
          </label>
          <input
            className='py-2 px-3 col-span-2 font-semibold bg-transparent  text-white  mt-1 focus:outline-none   focus:border-transparent'
            type='text'
            placeholder='city'
            id='city'
            name='city'
            required
            autoComplete='city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className='grid grid-cols-3 justify-center items-center  bg-gray-700 px-2  border-b-2 border-gray-100 border-opacity-20'>
          <label
            className='uppercase  col-span-1  font-bold   mr-5 text-white text-light font-semibold'
            htmlFor='country'
          >
            Country
          </label>
          <input
            className='py-2 px-3 col-span-2 font-semibold bg-transparent  text-white  mt-1 focus:outline-none   focus:border-transparent'
            type='text'
            placeholder='country'
            id='country'
            name='country'
            required
            autoComplete='country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className='grid grid-cols-3 justify-center items-center  bg-gray-700 px-2  border-b-2 border-gray-100 border-opacity-20'>
          <label
            className='uppercase  col-span-1  font-bold   mr-5 text-white text-light font-semibold'
            htmlFor='zipcode'
          >
            Zip Code
          </label>
          <input
            className='py-2 px-3 col-span-2 font-semibold bg-transparent  text-white  mt-1 focus:outline-none   focus:border-transparent'
            type='text'
            placeholder='zipcode'
            id='zipcode'
            name='zipcode'
            required
            autoComplete='zipcode'
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>
        <div className='mt-10 py-2 px-3 bg-gray-600 flex-1 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent'>
          <CardElement
            options={{
              iconStyle: 'solid',
              hidePostalCode: true,
              style: {
                base: {
                  iconColor: '#fff',
                  color: '#fff',
                  fontWeight: 500,
                  fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                  fontSize: '18px',
                  fontSmoothing: 'antialiased',
                  ':-webkit-autofill': {
                    color: '#fce883',
                  },
                  '::placeholder': {
                    color: '#fff',
                  },
                },
                invalid: {
                  iconColor: '#fa4b1f',
                  color: '#f33f3f',
                },
              },
            }}
          />{' '}
        </div>
        <button
          disabled={!stripe}
          className='flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded-full shadow item-center hover:bg-gray-900 focus:shadow-outline focus:outline-none'
        >
          <span className='ml-2 mt-5px'>Pay</span>
        </button>
      </div>
    </form>
  );
}
const Checkout = () => {
  return (
    <>
      <Elements stripe={stripeLib}>
        <CheckoutForm />
      </Elements>
    </>
  );
};

export default Checkout;

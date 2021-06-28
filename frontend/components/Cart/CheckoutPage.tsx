import { useMutation } from '@apollo/client';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import nProgress from 'nprogress';
import { useState } from 'react';
import { useCart } from '../../utils/globalContext';
import { CURRENT_USER_QUERY } from '../GetUser';

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
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { closeCart } = useCart();
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
    console.log(order);
    // 6. Change the page to view the order
    // router.push({
    //   pathname: `/order/[id]`,
    //   query: {
    //     id: order.data.checkout.id,
    //   },
    // });
    // 7. Close the cart
    // closeCart();

    // 8. turn the loader off
    setLoading(false);
    nProgress.done();
  };

  return (
    <form onSubmit={handleSubmit} className='flex h-4/5  items-center justify-center'>
      {error && (
        <p style={{ fontSize: 12 }}>
          {
            //@ts-ignore
            error.message
          }
        </p>
      )}
      {/* {graphQLError && <p style={{ fontSize: 12 }}>{graphQLError.message}</p>} */}
      <div className='grid bg-white rounded-lg shadow-xl w-8/9 md:w-9/12 lg:w-1/3'>
        <h1>Enter Card Number</h1>
        <CardElement />
        <button className='flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-purple-800 rounded-full shadow item-center hover:bg-purple-700 focus:shadow-outline focus:outline-none'>
          <span className='ml-2 mt-5px'>Procceed to checkout</span>
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

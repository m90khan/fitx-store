import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import getUser from '../../components/GetUser';
import Page from '../../components/Page';

const USER_PRODUCTS_QUERY = gql`
  query USER_PRODUCTS_QUERY($id: ID) {
    allProducts(where: { user: { id: $id } }) {
      id
      name
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductsDashboard = ({ user }) => {
  const router = useRouter();

  //   const { data, error, loading } = useQuery(USER_PRODUCTS_QUERY, {
  //     variables: {
  //       id: '',
  //     },
  //   });

  //   console.log(data);
  //   useEffect(() => {
  //     if (!user) {
  //       router.push('/');
  //     }
  //   }, [user]);

  return (
    <Page>
      <div className='flex justify-center my-6'>
        <div className='flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5'>
          <div className='container max-w-screen-xl mx-auto flex items-center flex-wrap pt-4  '>
            <nav id='store' className='w-full z-10 top-0 px-6 py-1'>
              <div className='w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3'>
                <div className=' tracking-wide no-underline hover:no-underline  '>
                  <h1 className='uppercase font-bold text-gray-800 text-xl'>
                    {' '}
                    Welcome {user && user.name}
                  </h1>
                  <p>{user && user.email}</p>
                </div>

                <div className='flex items-center z-0' id='store-nav-content'>
                  <h1 className='uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl '>
                    Total Products:
                  </h1>
                </div>
              </div>
            </nav>{' '}
          </div>
          <hr className='pb-6 mt-6' />

          <div className='flex-1'>
            <div className='flex items-center z-0' id='store-nav-content'>
              <h1 className='uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl '>
                My Products
              </h1>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

const MyProducts = () => {
  const user = getUser();
  return <ProductsDashboard user={user} />;
};

export default MyProducts;

import Link from 'next/link';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import formatCurrency from '../../utils/formatCurrency';
import AddToCartBtn from '../Buttons/AddToCartBtn';
import getUser from '../GetUser';
import PrimaryBtn from './../lib/PrimaryBtn';
const ProductDetails = ({ product }) => {
  const user = getUser();
  console.log(product);
  return (
    <>
      <section className='text-gray-700 body-font overflow-hidden bg-white py-4'>
        <div className='container px-5   mx-auto'>
          <div className='lg:w-4/5 mx-auto flex flex-wrap  justify-center items-center'>
            <div className='lg:w-1/3  object-cover object-center self-start'>
              <p className='py-4'>
                Home/product/{product.name.split(' ').join('').toLowerCase()}
              </p>
              <img
                alt={product.name}
                className=' w-full object-cover object-center h-auto rounded border border-gray-200'
                src={product.photo.image.publicUrlTransformed}
              />
            </div>
            <div className='lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0'>
              <h2 className='text-sm title-font text-gray-500 tracking-widest'>
                BRAND NAME
              </h2>
              <h1 className='text-gray-900 text-3xl title-font font-medium mb-1'>
                {product.name}
              </h1>
              <p className='title-font font-medium text-2xl text-gray-900 py-5'>
                {formatCurrency(product.price)}
              </p>
              <div className='flex mb-4'>
                <span className='flex items-center'>
                  {[1, 2, 3, 4].map((item) => (
                    <svg
                      fill='currentColor'
                      stroke='currentColor'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      className='w-4 h-4 text-gray-500'
                      viewBox='0 0 24 24'
                    >
                      <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'></path>
                    </svg>
                  ))}

                  <svg
                    fill='none'
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    className='w-4 h-4 text-gray-500'
                    viewBox='0 0 24 24'
                  >
                    <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'></path>
                  </svg>
                  <span className='text-gray-600 ml-3'>4 Reviews</span>
                </span>
              </div>
              <p className='leading-relaxed'>
                {product.description.replace(/(<([^>]+)>)/gi, '')}
              </p>
              {/* <div className='flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5'>
              <div className='flex'>
                <span className='mr-3'>Color</span>
                <button className='border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none'></button>
                <button className='border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none'></button>
                <button className='border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none'></button>
              </div>
              <div className='flex ml-6 items-center'>
                <span className='mr-3'>Size</span>
                <div className='relative'>
                  <select className='rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10'>
                    <option>SM</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                  </select> 
                  <span className='absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center'>
                    <svg
                      fill='none'
                      stroke='currentColor'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      className='w-4 h-4'
                      viewBox='0 0 24 24'
                    >
                      <path d='M6 9l6 6 6-6'></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div> */}

              <div className='flex py-6 justify-start'>
                {user ? (
                  <AddToCartBtn id={product.id} />
                ) : (
                  <Link href='/account/login'>
                    <a>
                      <PrimaryBtn text='Login for checkout' svg={true} />
                    </a>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='text-gray-700 overflow-hidden bg-gray-900 py-4 '>
        <div className='container px-5   mx-auto'>
          <div className='lg:w-2/4 mx-auto flex flex-wrap  justify-center items-center'>
            <Carousel axis='vertical' autoPlay useKeyboardArrows showStatus={false}>
              {product.gallery.map((item) => (
                <div>
                  <img
                    className='object-contain '
                    src={item.image.publicUrlTransformed}
                  />
                  {/* <p className='legend'>{item.altText}</p> */}
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;

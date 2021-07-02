import PrimaryBtn from './../components/lib/PrimaryBtn';
import Page from './../components/Page';
const about = () => {
  return (
    <Page>
      <div
        className='w-full bg-center bg-cover min-h-screen flex items-center justify-center'
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1616464916356-3a777b2b60b1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)',
        }}
      >
        <div className='flex items-center flex-col py-4 justify-center w-full h-full bg-gray-900 bg-opacity-50'>
          <div className='text-center'>
            <h1 className='text-2xl font-semibold text-white uppercase lg:text-3xl'>
              We build awesome Furniture <br></br>for your{' '}
              <span className='text-gray-400 underline'>Home</span>
            </h1>
          </div>
          <PrimaryBtn text='Learn More' />
        </div>
      </div>

      <section className='container py-10 px-16 mx-auto bg-white dark:bg-gray-800'>
        <h2 className='text-xl font-medium text-gray-800 capitalize dark:text-white md:text-2xl'>
          Our Team
        </h2>

        <div className='flex items-center justify-center'>
          <div className='grid gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            <div className='w-full max-w-xs text-center'>
              <img
                className='object-cover object-center w-full h-48 mx-auto rounded-lg'
                src='https://images.unsplash.com/photo-1493863641943-9b68992a8d07?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=739&q=80'
                alt='avatar'
              />

              <div className='mt-2'>
                <h3 className='text-lg font-medium text-gray-700 dark:text-gray-200'>
                  Ahmed Omer
                </h3>
                <span className='mt-1 font-medium text-gray-600 dark:text-gray-300'>
                  CEO
                </span>
              </div>
            </div>

            <div className='w-full max-w-xs text-center'>
              <img
                className='object-cover object-center w-full h-48 mx-auto rounded-lg'
                src='https://images.unsplash.com/photo-1516756587022-7891ad56a8cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80'
                alt='avatar'
              />

              <div className='mt-2'>
                <h3 className='text-lg font-medium text-gray-700 dark:text-gray-200'>
                  Jane Doe
                </h3>
                <span className='mt-1 font-medium text-gray-600 dark:text-gray-300'>
                  Co-founder
                </span>
              </div>
            </div>

            <div className='w-full max-w-xs text-center'>
              <img
                className='object-cover object-center w-full h-48 mx-auto rounded-lg'
                src='https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80'
                alt='avatar'
              />

              <div className='mt-2'>
                <h3 className='text-lg font-medium text-gray-700 dark:text-gray-200'>
                  Steve Ben
                </h3>
                <span className='mt-1 font-medium text-gray-600 dark:text-gray-300'>
                  Designer
                </span>
              </div>
            </div>

            <div className='w-full max-w-xs text-center'>
              <img
                className='object-cover object-center w-full h-48 mx-auto rounded-lg'
                src='https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80'
                alt='avatar'
              />

              <div className='mt-2'>
                <h3 className='text-lg font-medium text-gray-700 dark:text-gray-200'>
                  Patterson Johnson
                </h3>
                <span className='mt-1 font-medium text-gray-600 dark:text-gray-300'>
                  Marketing
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='bg-gray-500 dark:bg-gray-900 lg:py-12 lg:flex lg:justify-center'>
        <div className='bg-white dark:bg-gray-800 lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg'>
          <div className='lg:w-1/2'>
            <div
              className='h-64 bg-cover lg:rounded-lg lg:h-full'
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1616627408260-a72f00c8af29?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80')",
              }}
            ></div>
          </div>

          <div className='max-w-xl px-6 py-12 lg:max-w-5xl lg:w-1/2'>
            <h2 className='text-2xl font-bold text-gray-500 dark:text-white md:text-3xl'>
              Build Your New{' '}
              <span className='text-gray-900 dark:text-indigo-400'>Custom Furniture</span>
            </h2>
            <p className='mt-4 text-gray-600 dark:text-gray-400'>
              We provide handcrafted, solid wood furniture with fully customizable options
              and quality that built to last. Let our team at SANDO help you find exactly
              what you are looking for your dream home.
            </p>

            <div className='mt-8'>
              <a
                href='#'
                className='px-5 py-2 font-semibold text-gray-100 transition-colors duration-200 transform bg-gray-900 rounded-md hover:bg-gray-700'
              >
                Start Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
};

export default about;

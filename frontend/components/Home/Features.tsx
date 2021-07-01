const Features = () => {
  return (
    <div className='flex flex-col md:flex-row mx-6 mt-10 md:py-24   rounded-md py-20'>
      <div className=' w-4/5 sm:w-1/2 md:w-2/5 lg:w-1/3 mx-auto lg:mx-0 flex md:flex-col lg:flex-row items-start md:items-center justify-start md:justify-center md:text-center lg:text-left md:border-r-2 last:border-r-0 md:border-primary-lighter pb-3 md:pb-0'>
        <div>
          <img
            src='/images/site/box.svg'
            className='w-12 h-12 object-contain object-center'
            alt='icon'
          />
        </div>
        <div className='ml-6 md:mt-3 lg:mt-0'>
          <h3 className='font-hk font-semibold text-primary text-xl tracking-wide'>
            Free shipping
          </h3>
          <p className='font-hk text-secondary-lighter text-base tracking-wide'>
            On all orders over $900
          </p>
        </div>
      </div>

      <div className=' my-4 w-4/5 sm:w-1/2 md:w-2/5 lg:w-1/3 mx-auto lg:mx-0 flex md:flex-col lg:flex-row items-start md:items-center justify-start md:justify-center md:text-center lg:text-left md:border-r-2 last:border-r-0 md:border-primary-lighter pb-3 md:pb-0'>
        <div>
          <img
            src='/images/site/support.svg'
            className='w-12 h-12 object-contain object-center'
            alt='icon'
          />
        </div>
        <div className='ml-6 md:mt-3 lg:mt-0'>
          <h3 className='font-hk font-semibold text-primary text-xl tracking-wide'>
            Always available
          </h3>
          <p className='font-hk text-secondary-lighter text-base tracking-wide'>
            24/7 call center available
          </p>
        </div>
      </div>

      <div className='w-4/5 sm:w-1/2 md:w-2/5 lg:w-1/3 mx-auto lg:mx-0 flex md:flex-col lg:flex-row items-start md:items-center justify-start md:justify-center md:text-center lg:text-left   last:border-r-0 md:border-primary-lighter pb-3 md:pb-0'>
        <div>
          <img
            src='/images/site/refund.svg'
            className='w-12 h-12 object-contain object-center'
            alt='icon'
          />
        </div>
        <div className='ml-6 md:mt-3 lg:mt-0'>
          <h3 className='font-hk font-semibold text-primary text-xl tracking-wide'>
            Free returns
          </h3>
          <p className='font-hk text-secondary-lighter text-base tracking-wide'>
            15 days free return policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;

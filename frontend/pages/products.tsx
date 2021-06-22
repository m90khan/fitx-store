import Page from './../components/Page';
import Products from './../components/Products';
const productsPage = () => {
  let a = 5;
  console.log(a);
  return (
    <Page>
      <h1>Sando - eCommerce Store Project with Headless CMS keystone.js</h1>
      <Products />
    </Page>
  );
};
export default productsPage;

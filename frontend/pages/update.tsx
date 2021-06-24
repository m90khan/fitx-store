import { useRouter } from 'next/router';
import UpdateProduct from '../components/Product/UpdateProduct';
import Page from '../components/Page';

export default function UpdatePage() {
  const { query } = useRouter();
  return (
    <Page>
      <UpdateProduct id={query.id} />
    </Page>
  );
}

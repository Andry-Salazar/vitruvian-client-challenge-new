import { useRouter } from 'next/router';
import CustomerForm from '@/src/components/CustomerForm';

export default function Page() {
  const { query } = useRouter();

  return (
    <>
      <CustomerForm id={query.id ? String(query.id) : undefined} />
    </>
  );
}

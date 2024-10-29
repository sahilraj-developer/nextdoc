import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Index() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/home');
    } else if (status === 'unauthenticated') {
      router.push('/login'); 
    }
  }, [status, router]);

  if (status === 'loading') {
    return <p>Loading...</p>; 
  }

  return null; 
}

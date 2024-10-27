import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Index() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/home'); // Redirect to home if authenticated
    } else if (status === 'unauthenticated') {
      router.push('/login'); // Redirect to login if not authenticated
    }
  }, [status, router]);

  if (status === 'loading') {
    return <p>Loading...</p>; // Loading state
  }

  return null; // Empty content as users will be redirected
}

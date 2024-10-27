import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <p>Loading...</p>; // Show loading state while session is being fetched
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="p-4 bg-blue-600 text-white flex justify-between items-center">
        <h1 className="text-xl font-bold">Welcome, {session?.user?.name}</h1>
        <button onClick={() => signOut()} className="px-4">Logout</button>
      </header>
      <main className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">You are logged in!</h2>
      </main>
    </div>
  );
}

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        if (result.error) {
            console.error(result.error);
        } else {
            router.push('/');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Sign In</button>
        </form>
    );
};

export default SignIn;

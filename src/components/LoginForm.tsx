'use client'

import { useState } from "react"
import { signIn } from 'next-auth/react'
import { useRouter } from "next/navigation"

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !password) {
            setError('Username and password are required');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const result = await signIn('credentials', {
                username,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError('Invalid username or password');
                setIsLoading(false);
                return;
            }

            router.push('/home');
            router.refresh();
        } catch (error) {
            setError('An error occured. Please try again.');
            setIsLoading(false);
        }
    };

    const handleGuestLogin = () => {
        router.push('/home');
    };

    return (
        <div className="w-full max-w-md">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">
                        Username:
                    </label>
                    <input
                        id="username"
                        type="text"
                        placeholder="bora155"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                <div>
                    <label htmlFor="password">
                        Password:
                    </label>
                    <input
                        id="password"
                        type="text"
                        placeholder="emre1234kaynar"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? '...' : 'Attempt'}
                </button>
                <button
                    type="button"
                    onClick={handleGuestLogin}
                    disabled={isLoading}
                >
                    Continue as guest...
                </button>
            </form>
        </div>
    );
}
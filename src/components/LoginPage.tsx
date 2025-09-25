import React, { useState } from 'react';
import axios from 'axios';
// Import useNavigate for programmatic navigation
import { useNavigate } from 'react-router-dom';

// SVG component for the main Regions logo (remains unchanged)
const RegionsLogo = () => (
    <svg className="w-48 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 242 41" role="img" fillRule="evenodd" data-testid="logo" aria-label="Regions logo">
    <path className="regions-logo__pyramid" d="M15.1,20l9.19,20.35H0ZM29.44.48l5.75,7.73L29.44,40.32,23.72,8.18ZM43.83,19.9,59,40.32H34.78Zm-8.13-11,7.65,10.29L31.94,40.32ZM23.23,9l3.85,31.34-11.42-21Z"/>
    <g className="regions-logo__lockup">
    <path d="M98.09,38.38a28.25,28.25,0,0,1-3.58-5.61L94.09,32c-1.62-2.92-3.32-5.72-5.07-6.11v-.1c4.21-1.17,5.91-3.86,5.91-6.79,0-4-3.26-7.19-11.36-7.19H69.66v.82c3.15.6,3.7,1.53,3.7,3.91V35.93c0,2.29-1.3,3.47-3.7,3.67v.83H83.57V39.6c-2.7-.4-3.75-1.46-3.75-4V26.78c2.6,0,3.6,0,4.9,1.32,2.25,2.2,4.35,8.61,7.55,12.33h8.47V39.6A4.12,4.12,0,0,1,98.09,38.38ZM79.82,25.17V13.43h2c4,0,6.11,2,6.11,5.67C87.93,23.85,85.37,25.57,79.82,25.17Z"/>
    <path d="M121.18,18.3v4.91h-.66c-.73-2.83-1.59-3.66-4.1-3.66h-4.37V28.7h4c1.82,0,2.67-.75,3.14-2.76h.73v6.85h-.73C118.9,30.86,117.89,30,116,30h-4v6.51c0,2,.85,2.72,3.1,2.72h1.31c2.78,0,4-2,4.76-4.12h.65l-.42,5.37H104.19v-.64c2.52-.53,2.87-1.29,2.87-3.56V22c0-1.93-.47-2.62-2.87-3.07V18.3Z"/>
    <path d="M138.52,17.73c3.44,0,5,1.33,6.46,1.33a2.12,2.12,0,0,0,1.62-.76h.7v6.2h-.7A8.45,8.45,0,0,0,138.82,19c-4.64,0-7.19,4.09-7.19,10.93,0,7.08,3.1,9.84,7.27,9.84,2,0,3.41-.53,3.41-2.35V34.11A2.47,2.47,0,0,0,140,31.39v-.65h9.52v.65c-1.67.45-2.21,1.29-2.21,3.33v4.69A21.74,21.74,0,0,1,138.52,41c-8.17,0-12.31-5.79-12.31-11.46C126.21,22.76,131.43,17.73,138.52,17.73Z"/>
    <path d="M164.71,18.3v.64c-2.71.61-2.86,1.44-2.86,3.56V36.68c0,2,.5,2.54,2.86,3.1v.65H154v-.65c2.69-.65,2.85-1.38,2.85-3.37V22.05c0-2-.5-2.54-2.85-3.11V18.3Z"/>
    <path d="M182.21,17.74c-7.16,0-12.32,4.87-12.32,11.65S175.05,41,182.21,41s12.33-4.84,12.33-11.61S189.4,17.74,182.21,17.74Zm0,22c-5.11,0-6.89-4.84-6.89-10.17,0-7,2.43-10.6,6.89-10.6,4.95,0,6.92,4.35,6.92,10.56C189.13,36.84,186,39.75,182.21,39.75Z"/>
    <path d="M205.3,18.3l13.24,14.83v-10c0-2.69-.46-3.71-2.87-4.24V18.3h7.66v.64c-2.58.15-3.28,1.67-3.28,3.63V40.7h-.74L203,22.72V36.27c0,2.42.74,3.1,3.33,3.51v.65h-7.82v-.65c2.44-.37,3-1.66,3-3.81V21.14c-1.74-1.75-2.09-2-3-2.2V18.3Z"/>
    <path d="M240.52,17.73v5.83h-.66C239,21,236.57,19,234.25,19c-2.05,0-3.72,1.32-3.72,3a3.4,3.4,0,0,0,1.13,2.35c1.12,1.09,6.31,3.77,7.7,5.14a6.8,6.8,0,0,1,2.47,5.11c0,4.88-4.49,6.43-7.27,6.43s-4.37-.87-5.54-.87a1.25,1.25,0,0,0-1.15.72h-.67V34.19h.67c.65,3.29,2.82,5.56,6.07,5.56,2.43,0,4.18-1.32,4.18-3.14A3.64,3.64,0,0,0,237,34.08c-1.75-1.71-5.73-3.34-7.62-5.19a6.4,6.4,0,0,1-2-4.69c0-3.82,2.94-6.47,7.12-6.47a10.7,10.7,0,0,1,2.32.3,9.25,9.25,0,0,0,1.94.31,1.74,1.74,0,0,0,1.16-.61Z"/>
    </g>
    </svg>
);


// Main App Component
const LoginPage: React.FC = () => {
    // State to manage form inputs
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    // State for loading and error handling
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Hook for navigation
    const navigate = useNavigate();

    // This function now handles the entire form submission process
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null); // Clear previous errors
        if(username=='abc@gmail.com' && password=='123'){
            navigate('/loan-form');
            setLoading(false);
            localStorage.setItem('isLogged', 'true');
            return;
        }

        try {
            const response = await axios.post('https://api.example.com/login', {
                username,
                password
            });
            const test= await axios.get('https://arc-backend-4nt4.onrender.com/');
            console.log(test.data);

            // Assuming the API returns a success flag or a token
            if (response.data.success) {
                console.log('Login successful:', response.data);
                localStorage.setItem('isLogged', 'true');
                // Navigate to the next page on successful login
                navigate('/loan-form');
            } else {
                 // Handle cases where the API indicates a failure (e.g., wrong password)
                setError(response.data.message || 'Invalid username or password.');
            }
        } catch (err) {
            console.error('Login failed:', err);
            // Handle network errors or other exceptions
            setError('Login failed. Please try again later.');
        } finally {
            // This will run whether the request succeeded or failed
            setLoading(false);
        }
    };

    return (
        <>
            <style>{`
                .regions-logo__pyramid { fill: #5A8A22; }
                .regions-logo__lockup { fill: #565656; }
            `}</style>
            <div className="bg-white text-gray-800 font-sans leading-normal">
                {/* Main container with padding and centered content */}
                <div className="container mx-auto px-4 py-8 md:py-6">
                    <div className="max-w-md mx-auto text-center">
                        
                        {/* Header with Logo */}
                        <header className="mb-8">
                           <RegionsLogo />
                        </header>
                        
                        {/* Page Titles */}
                        <h1 className="text-4xl md:text-4xl font-light text-[#4C4C4C] mb-4">ARC</h1>
                        <p className="text-lg text-[#565656] mb-8">Log in to Automated Refinance Calculator</p>

                        {/* Login Form Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 text-left">
                            <form onSubmit={handleSubmit}>
                                {/* Username Input Field */}
                                <div className="mb-6">
                                    <label htmlFor="username" className="block text-sm font-medium text-[#565656] mb-2">Username</label>
                                    <input 
                                        type="email" 
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5A8A22]"
                                        disabled={loading} // Disable input when loading
                                    />
                                </div>

                                {/* Password Input Field */}
                                <div className="mb-6">
                                    <label htmlFor="password" className="block text-sm font-medium text-[#565656] mb-2">Password</label>
                                    <input 
                                        type="password" 
                                        id="password" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5A8A22]"
                                        disabled={loading} // Disable input when loading
                                    />
                                </div>

                                {/* Display error message if there is one */}
                                {error && (
                                    <div className="mb-4 text-center text-red-600">
                                        {error}
                                    </div>
                                )}
                                
                                <div>
                                    <button 
                                        type="submit" 
                                        className="w-full bg-[#5a8a22] text-white font-bold py-3 px-4 rounded-full hover:bg-[#4a741e] transition duration-300 disabled:bg-gray-400"
                                        disabled={loading} // Disable button when loading
                                    >
                                        {loading ? 'Logging in...' : 'Continue'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;

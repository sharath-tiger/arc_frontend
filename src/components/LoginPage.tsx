import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const RegionsLogo = () => (
  <svg
    className="w-40 mx-auto"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 242 41"
    role="img"
    fillRule="evenodd"
    data-testid="logo"
    aria-label="Regions logo"
  >
    <path
      className="regions-logo__pyramid"
      d="M15.1,20l9.19,20.35H0ZM29.44.48l5.75,7.73L29.44,40.32,23.72,8.18ZM43.83,19.9,59,40.32H34.78Zm-8.13-11,7.65,10.29L31.94,40.32ZM23.23,9l3.85,31.34-11.42-21Z"
    />
    <g className="regions-logo__lockup">
      <path d="M98.09,38.38a28.25,28.25,0,0,1-3.58-5.61L94.09,32c-1.62-2.92-3.32-5.72-5.07-6.11v-.1c4.21-1.17,5.91-3.86,5.91-6.79,0-4-3.26-7.19-11.36-7.19H69.66v.82c3.15.6,3.7,1.53,3.7,3.91V35.93c0,2.29-1.3,3.47-3.7,3.67v.83H83.57V39.6c-2.7-.4-3.75-1.46-3.75-4V26.78c2.6,0,3.6,0,4.9,1.32,2.25,2.2,4.35,8.61,7.55,12.33h8.47V39.6A4.12,4.12,0,0,1,98.09,38.38ZM79.82,25.17V13.43h2c4,0,6.11,2,6.11,5.67C87.93,23.85,85.37,25.57,79.82,25.17Z" />
      <path d="M121.18,18.3v4.91h-.66c-.73-2.83-1.59-3.66-4.1-3.66h-4.37V28.7h4c1.82,0,2.67-.75,3.14-2.76h.73v6.85h-.73C118.9,30.86,117.89,30,116,30h-4v6.51c0,2,.85,2.72,3.1,2.72h1.31c2.78,0,4-2,4.76-4.12h.65l-.42,5.37H104.19v-.64c2.52-.53,2.87-1.29,2.87-3.56V22c0-1.93-.47-2.62-2.87-3.07V18.3Z" />
      <path d="M138.52,17.73c3.44,0,5,1.33,6.46,1.33a2.12,2.12,0,0,0,1.62-.76h.7v6.2h-.7A8.45,8.45,0,0,0,138.82,19c-4.64,0-7.19,4.09-7.19,10.93,0,7.08,3.1,9.84,7.27,9.84,2,0,3.41-.53,3.41-2.35V34.11A2.47,2.47,0,0,0,140,31.39v-.65h9.52v.65c-1.67.45-2.21,1.29-2.21,3.33v4.69A21.74,21.74,0,0,1,138.52,41c-8.17,0-12.31-5.79-12.31-11.46C126.21,22.76,131.43,17.73,138.52,17.73Z" />
      <path d="M164.71,18.3v.64c-2.71.61-2.86,1.44-2.86,3.56V36.68c0,2,.5,2.54,2.86,3.1v.65H154v-.65c2.69-.65,2.85-1.38,2.85-3.37V22.05c0-2-.5-2.54-2.85-3.11V18.3Z" />
      <path d="M182.21,17.74c-7.16,0-12.32,4.87-12.32,11.65S175.05,41,182.21,41s12.33-4.84,12.33-11.61S189.4,17.74,182.21,17.74Zm0,22c-5.11,0-6.89-4.84-6.89-10.17,0-7,2.43-10.6,6.89-10.6,4.95,0,6.92,4.35,6.92,10.56C189.13,36.84,186,39.75,182.21,39.75Z" />
      <path d="M205.3,18.3l13.24,14.83v-10c0-2.69-.46-3.71-2.87-4.24V18.3h7.66v.64c-2.58.15-3.28,1.67-3.28,3.63V40.7h-.74L203,22.72V36.27c0,2.42.74,3.1,3.33,3.51v.65h-7.82v-.65c2.44-.37,3-1.66,3-3.81V21.14c-1.74-1.75-2.09-2-3-2.2V18.3Z" />
      <path d="M240.52,17.73v5.83h-.66C239,21,236.57,19,234.25,19c-2.05,0-3.72,1.32-3.72,3a3.4,3.4,0,0,0,1.13,2.35c1.12,1.09,6.31,3.77,7.7,5.14a6.8,6.8,0,0,1,2.47,5.11c0,4.88-4.49,6.43-7.27,6.43s-4.37-.87-5.54-.87a1.25,1.25,0,0,0-1.15.72h-.67V34.19h.67c.65,3.29,2.82,5.56,6.07,5.56,2.43,0,4.18-1.32,4.18-3.14A3.64,3.64,0,0,0,237,34.08c-1.75-1.71-5.73-3.34-7.62-5.19a6.4,6.4,0,0,1-2-4.69c0-3.82,2.94-6.47,7.12-6.47a10.7,10.7,0,0,1,2.32.3,9.25,9.25,0,0,0,1.94.31,1.74,1.74,0,0,0,1.16-.61Z" />
    </g>
  </svg>
);

const App = () => {
  const { setUserDetails } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Clear previous errors

    if (username === "mlo@regions.com" && password === "123") {
      setUserDetails("John Doe", "MLO");
      navigate("/dashboard/filter-loans");
      localStorage.setItem(
        "auth",
        JSON.stringify({ user: "John Doe", role: "MLO" })
      );
    } else if (username === "analyst@regions.com" && password === "123") {
      setUserDetails("Jane Doe", "ARC Analyst");
      navigate("/dashboard/viable-loans");
      localStorage.setItem(
        "auth",
        JSON.stringify({ user: "Jane Doe", role: "ARC Analyst" })
      );
    } else {
      setError("Invalid username or password.");
    }
    setLoading(false);
  };

  return (
    <>
      <style>{`
     html, body {
   margin: 0;
   padding: 0;
   height: 100%;
 }
        body {
          font-family: 'Inter', sans-serif;
        }
        .regions-logo__pyramid { fill: #5A8A22; }
        .regions-logo__lockup { fill: #565656; }
      `}</style>
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
        {/* Page Titles */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Log In to Online Banking
          </h1>
          <p className="text-gray-600 mt-1">
            Monitor your accounts, make payments, move money and more.
          </p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white w-full max-w-4xl rounded-lg shadow-md p-4">
          <header className="mb-6">
            <RegionsLogo />
          </header>

          <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 mb-8">
            <span className="font-bold text-blue-900 text-[12px]">FDIC</span>
            <span>
              FDIC - Insured - Backed by the full faith and credit of the U.S.
              Government
            </span>
          </div>

          {/* Centering container for the form */}
          <div className="max-w-sm mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Input Field */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="email"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter Username"
                  className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5A8A22]"
                  disabled={loading}
                />
              </div>

              {/* Password Input Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5A8A22]"
                  disabled={loading}
                />
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-[#5A8A22] focus:ring-[#5A8A22] border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember my username
                </label>
              </div>

              {/* Display error message */}
              {error && (
                <div className="text-center text-red-600 text-sm pt-2">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#5a8a22] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#4a741e] transition duration-300 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login With SSO"}
                </button>
              </div>

              <div className="text-center text-sm">
                <a
                  href="#"
                  className="font-medium text-[#5A8A22] hover:underline"
                >
                  Forgot Username or Password?
                </a>
              </div>

              <div className="text-center text-sm text-gray-600">
                Don't have an Online Banking Account?{" "}
                <a
                  href="#"
                  className="font-medium text-[#5A8A22] hover:underline"
                >
                  Enroll Now
                </a>
              </div>
            </form>
          </div>

          <hr className="my-6" />

          {/* Footer Section */}
          <footer className="text-center">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-600 mb-4">
              <a href="#" className="hover:underline">
                Terms and Conditions
              </a>
              <a href="#" className="hover:underline">
                Privacy Pledge
              </a>
              <a href="#" className="hover:underline">
                Security
              </a>
              <a href="#" className="hover:underline">
                Notice at Collection
              </a>
              <a href="#" className="hover:underline">
                Online Tracking & Advertising
              </a>
              <a href="#" className="hover:underline">
                Accessible Banking
              </a>
              <a href="#" className="hover:underline">
                Leave Feedback
              </a>
            </div>
            <p className="text-xs text-gray-600">
              Call{" "}
              <span className="font-semibold text-gray-800">
                1-800-REGIONS (1-800-734-4667)
              </span>{" "}
              or Visit Regions Help & Support.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default App;

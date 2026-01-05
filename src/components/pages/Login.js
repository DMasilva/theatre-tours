import React from 'react';

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#F5F1E8', paddingTop: '100px', paddingBottom: '50px' }}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: '#FF7420' }}>Login</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              style={{ borderColor: '#E8E0D1' }}
              id="email"
              type="email"
              placeholder="Enter your email"
              onFocus={(e) => e.target.style.borderColor = '#FF7420'}
              onBlur={(e) => e.target.style.borderColor = '#E8E0D1'}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              style={{ borderColor: '#E8E0D1' }}
              id="password"
              type="password"
              placeholder="Enter your password"
              onFocus={(e) => e.target.style.borderColor = '#FF7420'}
              onBlur={(e) => e.target.style.borderColor = '#E8E0D1'}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all"
              style={{ backgroundColor: '#FF7420' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#E65A00'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#FF7420'}
              type="button"
            >
              Sign In
            </button>
            <a className="inline-block align-baseline font-bold text-sm transition-colors" style={{ color: '#FF7420' }} onMouseEnter={(e) => e.target.style.color = '#E65A00'} onMouseLeave={(e) => e.target.style.color = '#FF7420'} href="#">
              Forgot Password?
            </a>
          </div>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Don't have an account? <a className="font-bold transition-colors" style={{ color: '#FF7420' }} onMouseEnter={(e) => e.target.style.color = '#E65A00'} onMouseLeave={(e) => e.target.style.color = '#FF7420'} href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;

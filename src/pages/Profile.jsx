import { Link } from 'react-router-dom';

const Profile = () => {
  const img = localStorage.getItem('img');
  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail');

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-base-100">
      <div className="mb-6">
        <Link
          to="/"
          className="text-lg text-gray-300 underline hover:text-yellow-400 transition duration-300"
        >
          &larr; Back to home
        </Link>
      </div>
      <div className="max-w-md w-full bg-gray-800 rounded-xl overflow-hidden shadow-lg p-10 transform hover:scale-105 transition duration-300">
        <div className="flex justify-center">
          <div className="relative">
            <img
              src={img}
              alt="Avatar"
              className="rounded-full h-40 w-40 object-cover border-4 border-yellow-500 shadow-lg transition-transform duration-500 hover:rotate-6"
            />
            <div className="absolute bottom-0 right-0 transform translate-x-4 translate-y-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-yellow-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a8 8 0 100 16 8 8 0 000-16zM6 10a4 4 0 118 0 4 4 0 01-8 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold text-white hover:text-yellow-400 transition duration-300">
            {userName}
          </h2>
          <p className="text-gray-400">{userEmail}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [img, setImg] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '')
      return toast.error('Please fill all the fields');
    if (!localStorage.getItem('products')) {
      localStorage.setItem('products', JSON.stringify([]));
    }
    dispatch(
      setUserData({
        name: name,
        email: email,
        img: img,
        products: [],
        isSignedUp: true,
      })
    );

    localStorage.setItem('isSignedUp', 'true');
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    navigate('/');
    toast.success('Signed Up Successfully');
  };

  const imgHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const img = document.querySelector('#formImgLoad');

    reader.onload = () => {
      const base64img = reader.result;
      localStorage.setItem('img', base64img);
      setImg(base64img);
      img.classList.remove('hidden');
      img.classList.add('flex');
    };

    reader.readAsDataURL(file);
    toast.success('Image uploaded successfully');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 p-5">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body w-full">
          <h2 className="card-title text-center">Sign Up</h2>
          <form>
            <div>
              <div
                id="formImgLoad"
                className="hidden items-center justify-center"
              >
                <img
                  src={img}
                  className="rounded-full h-40 w-40 object-cover"
                  alt="avatar"
                />
              </div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="file_input"
              >
                Upload avatar
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="file_input_help"
                onChange={imgHandler}
                id="file_input"
                type="file"
              />
              <p
                className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="file_input_help"
              >
                SVG, PNG, JPG or GIF .
              </p>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full max-w-xs"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full max-w-xs"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full max-w-xs"
                required
              />
            </div>
            <div className="form-control mt-4">
              <button
                className="btn btn-primary"
                type="submit"
                onClick={submitHandler}
              >
                Sign Up
              </button>
            </div>
          </form>
          <p className="text-sm text-center mt-2">
            Already have an account?{' '}
            <Link to="/login" className="link link-primary">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

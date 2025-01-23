import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from '../utils/localStorage';
import { useEffect } from 'react';

const Navbar = () => {
  const dispatch = useDispatch();
  const isSignedUp = localStorage.getItem('isSignedUp') === 'true';
  const img = localStorage.getItem('img');
  const items = useSelector((state) => state.user.products);
  const total = items
    .map((price) => price.price)
    .reduce((a, b) => a + b, 0)
    .toFixed(2);

  const handleSignOut = () => {
    dispatch(
      setUserData({
        isSignedUp: false,
        products: [],
      })
    );
    toast.success('Successfully logged out!');
    localStorage.clear();
    window.location.reload();
  };

  const handleDeleteItem = (id) => {
    const updatedProducts = items.filter((item) => item.id !== id);
    saveToLocalStorage('products', updatedProducts);
    dispatch(setUserData({ products: updatedProducts }));
    toast.success('Item deleted successfully!');
  };

  const handlePayClick = () => {
    dispatch(setUserData({ products: [] }));
    removeFromLocalStorage('products');
    toast.success('Payment successful!');
  };

  useEffect(() => {
    const products = getFromLocalStorage('products', []);

    if (products.length > 0) {
      dispatch(setUserData({ isSignedUp, products }));
    }
  }, [dispatch, isSignedUp]);

  return (
    <div className="navbar bg-neutral text-neutral-content">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Shop
        </Link>
      </div>
      {isSignedUp ? (
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {items.length}
                </span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
            >
              <div className="card-body bg-neutral">
                <span className="text-lg font-bold">
                  {items.length} {items.length === 1 ? 'Item' : 'Items'}
                </span>
                <span className="text-info">Subtotal: {total}$</span>
                <div className="card-actions">
                  <button
                    className="btn btn-primary btn-block"
                    onClick={() =>
                      document.getElementById('my_modal_1').showModal()
                    }
                  >
                    View cart
                  </button>
                  <dialog id="my_modal_1" className="modal">
                    <div className="modal-box bg-neutral">
                      <h3 className="font-bold text-lg mb-4">Cart</h3>
                      <div className="flex flex-wrap justify-center items-center gap-6">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-6 bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 w-full md:w-64"
                          >
                            <Link
                              to={`/product/${item.id}`}
                              className="flex-shrink-0"
                            >
                              <div className="w-28 h-28 overflow-hidden rounded-md">
                                <img
                                  src={item.img}
                                  className="w-full h-full object-cover"
                                  alt={item.title}
                                />
                              </div>
                            </Link>
                            <div className="flex flex-col">
                              <h2 className="card-title text-xl font-semibold text-gray-800">
                                {item.title}
                              </h2>
                              <p className="text-lg text-gray-600 mt-2">
                                <span className="font-bold">{item.price}</span>{' '}
                                $
                              </p>
                              <button
                                className="btn btn-primary"
                                onClick={() => handleDeleteItem(item.id)}
                              >
                                Delete item
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="modal-action">
                        <form
                          method="dialog"
                          className="flex items-center gap-4"
                        >
                          <button className="btn">Close</button>
                          <button
                            className="btn btn-primary"
                            onClick={handlePayClick}
                          >
                            Pay
                          </button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Avatar"
                  src={
                    img
                      ? img
                      : 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content  bg-neutral rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/settings">Settings</Link>
              </li>
              <li>
                <Link to="/" onClick={handleSignOut}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <Link to="/signup" className="btn btn-primary">
          Sign Up
        </Link>
      )}
    </div>
  );
};

export default Navbar;

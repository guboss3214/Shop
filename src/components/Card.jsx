import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUserData } from '../redux/action';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

const Card = ({ id, title, descr, price, img }) => {
  const cart = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    const products = {
      id,
      title,
      price,
      img,
    };
    const updatedCart = [...cart, products];
    saveToLocalStorage('products', updatedCart);
    dispatch(setUserData({ products: updatedCart }));
  };
  return (
    <div className="card bg-neutral w-72 shadow-xl transition-all ease-in duration-200  hover:scale-105 text-neutral-content">
      <Link to={`/product/${id}`}>
        <figure>
          <img src={img} alt="Shoes" />
        </figure>
      </Link>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <div className="h-2/3">
          <p>{descr}</p>
        </div>
        <span>{price} $</span>
        <div className="card-actions justify-end">
          {localStorage.getItem('isSignedUp') === 'true' ? (
            <button className="btn btn-primary" onClick={handleAddToCart}>
              Add to Cart
            </button>
          ) : (
            <Link to="/signup">
              <button className="btn btn-primary">Sign Up</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;

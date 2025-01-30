import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../redux/userSlice';

const Card = ({ id, title, descr, price, img }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ id, title, price, img }));
  };

  return (
    <div className="card bg-neutral w-72 shadow-xl transition-all ease-in duration-200 hover:scale-105 text-neutral-content">
      <Link to={`/product/${id}`}>
        <figure>
          <img src={img} alt={title} />
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

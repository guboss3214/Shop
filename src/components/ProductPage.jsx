import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const isSignedUp = localStorage.getItem('isSignedUp') === 'true';
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="h-screen flex flex-col justify-center items-center p-4">
      <div className="w-full flex items-start">
        <Link
          to="/"
          className="text-lg text-gray-300 underline hover:text-yellow-400 transition duration-300"
        >
          &larr; Back to home
        </Link>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full md:w-1/3 rounded-lg shadow-lg"
        />
        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-300">{product.description}</p>
          <p className="text-xl font-semibold mt-2">${product.price}</p>
          <div className="mt-4">
            {isSignedUp ? (
              <button className="btn btn-primary">Add to Cart</button>
            ) : (
              <Link to="/signup" className="btn btn-primary">
                Sign Up to Add to Cart
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

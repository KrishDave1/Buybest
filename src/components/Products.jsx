import { useGlobalContext } from '../context';
import {useNavigate} from 'react-router-dom';

const Products = () => {
  const { loading, products, categoriesProducts, searchTerm, selectProduct, cartItems, addToCart} = useGlobalContext();
  const navigate = useNavigate();

  const displayProducts = categoriesProducts.length > 0 ? categoriesProducts : products;

  const FinaldisplayProduct = displayProducts.filter((item) => {
    return searchTerm.toLowerCase() === '' ? item : item.title.toLowerCase().includes(searchTerm.toLowerCase())
  })

  if (loading) {
    return <section className='section-loading'>
      <h4>Loading...</h4>
    </section>
  }


  if (FinaldisplayProduct.length < 1) {
    return <section className='section-noitems'>
      <h4>No Products matched your search. Please try again.</h4>
    </section>
  }
  
  const handleCheckout = (productId) => {
    navigate('/payments');
  };

  const handleBuyNow = (productId) => {
    if (!cartItems[productId]) {
      addToCart(productId);
    }
    handleCheckout(productId);
  };

  return (
    <section className='section-center'>
      {FinaldisplayProduct.map((singleProduct) => {
        const { id, title, image, price } = singleProduct
        const cartItemAmount = cartItems[id];
        return (
          <article key={id} className='single-product'>
            <img src={image} alt={title} className='img' onClick={() => selectProduct(id)} />
            <footer className='text-area'>
              <div className='title-text'><h5>{title}</h5></div>
              <div className='mrp-text'><h5>MRP :</h5><h4>$ {price}</h4></div>
              <div className='cart-buy-btn'><button className='cart-btn btn' onClick={() => addToCart(id)}>Add to Cart {cartItemAmount > 0 && <> ({cartItemAmount})</>}</button>
                <button className='buy-btn btn' onClick={() => handleBuyNow(id)}>Buy Now</button>
              </div>
            </footer>
          </article>
        )
      })}

    </section>
  )
}
export default Products
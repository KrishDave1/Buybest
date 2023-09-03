import { useGlobalContext } from '../context'
import { ImBin } from 'react-icons/im'

const CartItem = (props) => {
  const { loading, selectProduct, cartItems, addToCart, removeFromCart, updateCartItemCount } = useGlobalContext();

  if (loading) {
    return <section className='section-loading'>
      <h4>Loading...</h4>
    </section>
  }

  const { id, title, price, image } = props.data;
  return (
    <article key={id} className='single-product'>
      <img src={image} alt={title} className='img' onClick={() => selectProduct(id)} />
      <footer className='text-area'>
        <div className='title-text'><h5>{title}</h5></div>
        <div className='mrp-text'><h5>MRP :</h5><h4>$ {price}</h4></div>
        <div className="countHandler">
          <button onClick={() => removeFromCart(id)} className='count-button'> - </button>
          <input className='count-input'
            value={cartItems[id]}
            onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
          />
          <button onClick={() => addToCart(id)} className='count-button-plus'> + </button>
          <button className='btn bin-btn' onClick={() => updateCartItemCount(0, id)}><ImBin /></button>
        </div>
      </footer>
    </article>
  )
}

export default CartItem;
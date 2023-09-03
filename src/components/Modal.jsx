import { useGlobalContext } from '../context'

const Modal = () => {
  const { selectedProduct, closeModal, cartItems, addToCart } = useGlobalContext()

  const { id, image, title, price, description, category, rating } = selectedProduct//rating -> rate, count
  const cartItemAmount = cartItems[id];
  return (
    <aside className='modal-overlay'>
      <div className='modal-container'>
        <img src={image} className="img modal-img" />
        <div className='modal-content'>
          <h3>{title}</h3>
          <span className='modal-category'>Category : {category}</span>
          <h5>Review : {rating.rate} &#9733;&#9733;&#9733;&#9733;&#9733; ({rating.count} reviews) </h5>
          <p>{description}</p>
          <span className='modal-price'>MRP :  $ {price} </span>
          <button className='cart-btn btn' onClick={() => addToCart(id)}>Add to Cart {cartItemAmount > 0 && <> ({cartItemAmount})</>}</button>
          <button className='modal-buy'>Buy Now</button>
        </div>
        <button onClick={closeModal} className='close-modal'>&#10060;</button>
      </div>
    </aside>
  )
}

export default Modal;
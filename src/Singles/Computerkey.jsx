import { computerData } from '../../data/computers'
import Navbar from '../Components/Navbar'
import { Link, useParams } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

const Computerkey = () => {

  const {id} = useParams()
  const { addToCart } = useStore()
  // console.log(id);
  const product = computerData.find((item)=> item.id === id)

  const productWithMeta = { ...product, type: product.product.toLowerCase() }

  return (
    <>
    <Navbar/>

    <div className="itemsection">

      <div className="item1-img">
        <img src={product.image} />
      </div>

      <div className="my-item">

        <div className="item1-name">
          {product.company} {product.model} <br /> <br />
          <p> ${product.price}</p> <br />
        </div>

        <div className="item1-descript">
          {product.description}
        </div>

        <div className="item1-cart">
          <button onClick={() => addToCart(productWithMeta)}>Add to Cart</button>
          <Link to="/payment" state={{ product: productWithMeta }}><button>Buy Now</button></Link>
        </div>

      </div>

    </div>
    </>
  )
}

export default Computerkey
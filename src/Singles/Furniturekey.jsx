import React from 'react'
import { furnitureData } from '../../data/furniture'
import Navbar from '../Components/Navbar'
import { useParams } from 'react-router-dom'

const Furniturekey = () => {

  const {id} = useParams()
  // console.log(id);
  const product = furnitureData.find((item)=> item.id === id)
  

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
          <button>Add to Cart</button>
        </div>

      </div>

    </div>
    </>
  )
}

export default Furniturekey
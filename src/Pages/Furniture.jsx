import React from 'react'
import { furnitureData } from '../../data/furniture'
import { Link } from 'react-router-dom'

const Furniture = () => {
  const FirstFiveImage = furnitureData.slice(4,9)
  
    return (
      <>
      <h3 className='item-name'>Furniture</h3>
      <div className='images'>
          {
              FirstFiveImage.map((item)=>{
                  return(
                      <div key={item.id}>
                          
                          <Link to = {`/furniture/${item.id}`} >
                          <div className="image-box">
                              <img src={item.image} />
                          </div>
                          </Link>
                              <h3 className='item-text'>{item.company}{item.model}</h3>
  
                      </div>
                  )
              })
          }
      </div>
      </>
    )
  }

export default Furniture
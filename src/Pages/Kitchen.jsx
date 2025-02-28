import React from 'react'
import {kitchenData} from '../../data/kitchen'
import { Link } from 'react-router-dom'

const Kitchen = () => {
  const FirstFiveImage = kitchenData.slice(0,5)
  
    return (
      <>
      <h3 className='item-name'>Kitchen</h3>
      <div className='images'>
          {
              FirstFiveImage.map((item)=>{
                  return(
                      <div key={item.id}>
                          
                          <Link to = {`/kitchen/${item.id}`} >
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
  
export default Kitchen
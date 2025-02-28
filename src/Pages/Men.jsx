import React from 'react'
import { menData } from '../../data/men'
import { Link } from 'react-router-dom'


const Men = () => {
    const FirstFiveImage = menData.slice(0,5)
  
    return (
      <>
      <h3 className='item-name'>men's fashion</h3>
      <div className='images'>
          {
              FirstFiveImage.map((item)=>{
                  return(
                      <div key={item.id}>
                          
                          <Link to = {`/men/${item.id}`} >
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

export default Men
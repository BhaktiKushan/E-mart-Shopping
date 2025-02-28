import React from 'react'
import { womanData } from '../../data/woman'
import { Link } from 'react-router-dom'


const Woman = () => {
  const FirstFiveImage = womanData.slice(0,5)
  
    return (
      <>
      <h3 className='item-name'>woman's fashion</h3>
      <div className='images'>
          {
              FirstFiveImage.map((item)=>{
                  return(
                      <div key={item.id}>
                          
                          <Link to = {`/woman/${item.id}`} >
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

export default Woman
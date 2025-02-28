import React from 'react'
import { watchData } from '../../data/watch'
import { Link } from 'react-router-dom'


const Watch = () => {
  const FirstFiveImage = watchData.slice(0,5)
  
    return (
      <>
      <h3 className='item-name'>Watch</h3>
      <div className='images'>
          {
              FirstFiveImage.map((item)=>{
                  return(
                      <div key={item.id}>
                          
                          <Link to = {`/watch/${item.id}`} >
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

export default Watch
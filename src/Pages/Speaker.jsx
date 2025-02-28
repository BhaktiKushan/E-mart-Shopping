import React from 'react'
import { speakerData } from '../../data/speaker'
import { Link } from 'react-router-dom'


const Speaker = () => {
   const FirstFiveImage = speakerData.slice(0,5)
  
    return (
      <>
      <h3 className='item-name'>Speaker</h3>
      <div className='images'>
          {
              FirstFiveImage.map((item)=>{
                  return(
                      <div key={item.id}>
                          
                          <Link to= {`/speaker/${item.id}`} >
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

export default Speaker
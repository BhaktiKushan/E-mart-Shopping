import React from 'react'
import { tvData } from '../../data/tv'
import { Link } from 'react-router-dom'


const Tv = () => {
    const FirstFiveImage = tvData.slice(0,5)
    
      return (
        <>
        <h3 className='item-name'>Tv</h3>
        <div className='images'>
            {
                FirstFiveImage.map((item)=>{
                    return(
                        <div key={item.id}>
                            
                            <Link to={`/tv/${item.id}`} >
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

export default Tv
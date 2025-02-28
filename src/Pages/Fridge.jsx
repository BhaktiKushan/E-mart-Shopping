import React from 'react'
import { fridgeData } from '../../data/fridge'
import { Link } from 'react-router-dom'

const Fridge = () => {

    const FirstFiveImage = fridgeData.slice(0,5)

  return (
    <>
    <h3 className='item-name'>Fridge</h3>
    <div className='images'>
        {
            FirstFiveImage.map((item)=>{
                return(
                    <div key={item.id}>
                        
                        <Link to = {`/fridge/${item.id}`} >
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

export default Fridge
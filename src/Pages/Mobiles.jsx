import React from 'react'
import { mobileData } from '../../data/mobiles'
import { Link } from 'react-router-dom'

const Mobiles = () => {

    const FirstFiveImage = mobileData.slice(0,5)

  return (
    <>
    <h3 className='item-name'>Mobiles</h3>
    <div className='images'>
        {
            FirstFiveImage.map((item)=>{
                return(
                    <div key={item.id}>
                        
                        <Link to = {`/mobiles/${item.id}`} >
                        <div className="image-box">
                            <img src={item.image} />
                        </div>
                        </Link>

                        <h3 className='item-text'>{item.company} {item.model}</h3>

                    </div>
                )
            })
        }
    </div>
    </>
  )
}

export default Mobiles
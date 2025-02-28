import React from 'react'
import { computerData } from '../../data/computers'
import { Link } from 'react-router-dom'


const Mobiles = () => {

    const FirstFiveImage = computerData.slice(0,5)

  return (
    <>
    <h3 className='item-name'>Computer</h3>
    <div className='images'>
        {
            FirstFiveImage.map((item)=>{
                return(
                    <div key={item.id}>
                        
                        <Link to = {`/computers/${item.id}`} >
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

export default Mobiles
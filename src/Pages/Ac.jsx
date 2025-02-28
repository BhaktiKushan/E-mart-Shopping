import React from 'react'
import {acData} from '../../data/ac'
import { Link } from 'react-router-dom'


const  Ac= () => {

    const FirstFiveImage = acData.slice(1,6)

  return (
    <>
    <h3 className='item-name'>Ac</h3>
    <div className='images'>
        {
            FirstFiveImage.map((item)=>{
                return(
                    <div key={item.id}>
                        
                        <Link to = {`/ac/${item.id}`} >
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

export default Ac
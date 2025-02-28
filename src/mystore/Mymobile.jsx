import React from 'react'
import { mobileData } from '../../data/mobiles'
import Navbar from '../Components/Navbar'
import { Link } from 'react-router-dom'

const Mymobile = () => {
  return (
    <>
    <Navbar/>
    <center>
    <h1>Mobiles</h1>
    </center>
    <div className='prosection'>
        {
            mobileData.map((item)=>{
                return(
                    <div key={item.id}>
                    <Link to = {`/mobiles/${item.id}`} >

                        <div className="proimage">
                            <img src={item.image} />
                        </div>
                    </Link>
                    
                            <h3>{item.company} {item.model}</h3>
                        
                    </div>
                )
            })
        }
    </div>
    </>
  )
}

export default Mymobile
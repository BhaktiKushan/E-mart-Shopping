import React from 'react'
import Navbar from '../Components/Navbar'
import { menData } from '../../data/men'
import { Link } from 'react-router-dom'

const Mymen = () => {
    return (
        <>
        <Navbar/>
        <center>
        <h1>men's fashion</h1>
        </center>

        <div className='prosection1'>
            {
                menData.map((item)=>{
                     return(
                        <div key={item.id}>
                        <Link to = {`/men/${item.id}`} >
    
                            <div className="proimage1">
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

export default Mymen
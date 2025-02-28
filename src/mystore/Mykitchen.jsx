import React from 'react'
import Navbar from '../Components/Navbar'
import { kitchenData } from '../../data/kitchen'
import { Link } from 'react-router-dom'

const Mykitchen = () => {
    return (
        <>
        <Navbar/>
        <center>
        <h1>Kitchen</h1>
        </center>

        <div className='prosection1'>
            {
                kitchenData.map((item)=>{
                    return(
                        <div key={item.id}>
                        <Link to = {`/kitchen/${item.id}`} >
    
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
export default Mykitchen
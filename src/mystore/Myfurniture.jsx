import React from 'react'
import { furnitureData } from '../../data/furniture'
import Navbar from '../Components/Navbar'
import { Link } from 'react-router-dom'


const Myfurniture = () => {
    return (
        <>
        <Navbar/>
        <center>
        <h1>Furniture</h1>
        </center>

        <div className='prosection1'>
            {
                furnitureData.map((item)=>{
                    return(
                        <div key={item.id}>
                        <Link to = {`/furniture/${item.id}`} >
    
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

export default Myfurniture
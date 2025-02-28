import React from 'react'
import Navbar from '../Components/Navbar'
import { fridgeData } from '../../data/fridge'
import { Link } from 'react-router-dom'

const Myfridge = () => {
    return (
        <>
        <Navbar/>
        <center>
        <h1>Fridge</h1>
        </center>

        <div className='prosection'>
            {
                fridgeData.map((item)=>{
                    return(
                        <div key={item.id}>
                        <Link to = {`/fridge/${item.id}`} >
    
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

export default Myfridge
import React from 'react'
import Navbar from '../Components/Navbar'
import { acData } from '../../data/ac'
import { Link } from 'react-router-dom'

const Myac = () => {
    return (
        <>
        <Navbar/>
        <center>
        <h1>Ac</h1>
        </center>

        <div className='prosection'>
            {
                acData.map((item)=>{
                    return(
                        <div key={item.id}>
                        <Link to = {`/ac/${item.id}`} >
    
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
    

export default Myac
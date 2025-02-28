import React from 'react'
import Navbar from '../Components/Navbar'
import { tvData } from '../../data/tv'
import { Link } from 'react-router-dom'


const Mytv = () => {
    
    return (
        <>
        <Navbar/>
        <center>
        <h1>Tv</h1>
        </center>

        <div className='prosection'>
            {
                tvData.map((item)=>{
                    
                    return(
                        <div key={item.id}>
                            <Link to={`/tv/${item.id}`} >
                            <div className="proimage">
                                <img src={item.image} />
                            
                            </div>
                            </Link>
                                <h3>{item.brand} {item.model}</h3>
                        </div>
                    )
                })
            }
        </div>
        </>
      )
    }
export default Mytv
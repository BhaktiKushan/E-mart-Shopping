import React from 'react'
import Navbar from '../Components/Navbar'
import { watchData } from '../../data/watch'
import { Link } from 'react-router-dom'

const Mywatch = () => {
    return (
        <>
        <Navbar/>
        <center>
        <h1>Watch</h1>
        </center>

        <div className='prosection'>
            {
                watchData.map((item)=>{
                    return(
                        <div key={item.id}>
                            <Link to = {`/watch/${item.id}`} >
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
    

export default Mywatch
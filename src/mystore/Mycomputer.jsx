import React from 'react'
import { computerData } from '../../data/computers'
import Navbar from '../Components/Navbar'
import { Link } from 'react-router-dom'



const Mycomputer = () => {
    return (
        <>
        <Navbar/>
        <center>
        <h1>Computers</h1>
        </center>

        <div className='prosection'>
            {
                computerData.map((item)=>{
                    return(
                        <div key={item.id}>
                    <Link to = {`/computers/${item.id}`} >

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
export default Mycomputer
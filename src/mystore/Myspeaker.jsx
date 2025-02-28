import React from 'react'
import Navbar from '../Components/Navbar'
import { speakerData } from '../../data/speaker'
import { Link } from 'react-router-dom'

const Myspeaker = () => {
    return (
        <>
        <Navbar/>
        <center>
        <h1>Speaker</h1>
        </center>

        <div className='prosection'>
            {
                speakerData.map((item)=>{
                    return(
                        <div key={item.id}>
                            <Link to= {`/speaker/${item.id}`} >
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

export default Myspeaker
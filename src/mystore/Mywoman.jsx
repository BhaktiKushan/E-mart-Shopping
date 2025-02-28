import React from 'react'
import { womanData } from '../../data/woman'
import Navbar from '../Components/Navbar'
import { Link } from 'react-router-dom'

const Mywoman = () => {
        return (
          <>
          <Navbar/>
          <center>
          <h1>Woman's fashion</h1>
          </center>

          <div className='prosection1'>
              {
                  womanData.map((item)=>{
                    return(
                        <div key={item.id}>
                        <Link to = {`/woman/${item.id}`} >
    
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
export default Mywoman
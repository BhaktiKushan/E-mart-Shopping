import './App.css'
import Landingpage from './Landingpage'
import { Route, Routes } from 'react-router-dom'
import Mymobile from './mystore/Mymobile'
import Mycomputer from './mystore/Mycomputer'
import Myfridge from './mystore/Myfridge'
import Myfurniture from './mystore/Myfurniture'
import Mykitchen from './mystore/Mykitchen'
import Mymen from './mystore/Mymen'
import Mywoman from './mystore/Mywoman'
import Myac from './mystore/Myac'
import Myspeaker from './mystore/Myspeaker'
import Mytv from './mystore/Mytv'
import Mywatch from './mystore/Mywatch'
// Dynamic Routing
import MobilesKey from './Singles/MobilesKey'
import Computerkey from './Singles/Computerkey'
import Fridgekey from './Singles/Fridgekey'
import Furniturekey from './Singles/Furniturekey'
import Kitchenkey from './Singles/KitchenKey'
import Menkey from './Singles/Menkey'
import Womankey from './Singles/Womankey'
import Ackey from './Singles/Ackey'
import Speakerkey from './Singles/Speakerkey'
import Tvkey from './Singles/Tvkey'
import Watchkey from './Singles/Watchkey'


function App() {

  return (

      <Routes>
        
        <Route path='/' element={ <Landingpage/>}/>
        <Route path='/mobiles' element={<Mymobile/>}/>
        <Route path='/computers' element={<Mycomputer/>}/>
        <Route path='/fridge' element={<Myfridge/>}/>
        <Route path='/furniture' element={<Myfurniture/>}/>
        <Route path='/kitchen' element={<Mykitchen/>} />
        <Route path='/men' element={<Mymen/>} />
        <Route path='/woman' element={<Mywoman/>} />
        <Route path='/ac' element={<Myac/>} />
        <Route path='/speaker' element={<Myspeaker/>} />
        <Route path='/tv' element={<Mytv/>} />
        <Route path='/watch' element={<Mywatch/>} />
        {/* Dynamic Routing */}
        <Route path='/mobiles/:id' element={<MobilesKey/>} />
        <Route path='/computers/:id' element={<Computerkey/>} />
        <Route path='/fridge/:id' element={<Fridgekey/>} />
        <Route path='/furniture/:id' element={<Furniturekey/>} />
        <Route path='/kitchen/:id' element={<Kitchenkey/>} />
        <Route path='/men/:id' element={<Menkey/>} />
        <Route path='/woman/:id' element={<Womankey/>} />
        <Route path='/ac/:id' element={<Ackey/>} />
        <Route path='/speaker/:id' element={<Speakerkey/>}/>
        <Route path='/tv/:id' element={<Tvkey/>}/>
        <Route path='/watch/:id' element={<Watchkey/>}/>


      </Routes>
  )
}

export default App

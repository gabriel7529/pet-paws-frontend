
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from '../views/Home';

export const MainRouter=()=>{
  return(
    <BrowserRouter>
      <Routes>
                <Route path="/" element={<Home></Home>}/>
            </Routes>
    </BrowserRouter>
  )
}


import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from '../views/Home';
import Feed from '../views/Feed';

export const MainRouter=()=>{
  return(
    <BrowserRouter>
      <Routes>
                <Route path="/" element={<Home></Home>}/>,
                <Route path="/feed" element={<Feed></Feed>}/>
      </Routes>
    </BrowserRouter>
  )
}

import {Routes, Route } from 'react-router-dom'
import Siteroutes from '../../features/config/'

function Routing() {
  return (
    <div>
      <Routes>
          {Siteroutes.map((route,index) => (
            <Route path={route.path} element={route.content} key={index} />
          ))}
      </Routes>
    </div>
  )
}

export default Routing

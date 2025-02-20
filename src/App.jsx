import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Components/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div className='bg-gray-900 text-white h-screen p-2'>
    <Home></Home>
   </div>
  )
}

export default App

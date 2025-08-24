import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './components/header/header';
import IndividualIntervalsExample from './components/body/cerasoleSilder'
import Cetagory from './components/body/cetagorySection';
import FeshionSection from './components/body/feshionSecion';
import BestOffer from './components/body/BestOfferSection';

function App() {
  const [count, setCount] = useState(0)
  return (
    <div className='Container-fluid w-100 bg-white' >
      <Header />
      <IndividualIntervalsExample />
      <Cetagory />
      <FeshionSection />
      <BestOffer />
    </div>
  )
}

export default App

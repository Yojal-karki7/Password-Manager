import './App.css'
import Navbar from './components/Navbar'
import Manger from './components/Manger'
import Footer from './components/Footer'

function App() {

  return (
    <>
    <Navbar/>
    <div className=" bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
      <Manger/>
    </div>
    <Footer/>
    </>
  )
}

export default App

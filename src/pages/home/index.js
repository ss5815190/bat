import Sidebar from "./components/Sidebar.js"
import Chat from "./components/Chat.js"
import './style/home.css'
 const Home = () => {
  return (
    <div className="home">
      <div className="container">
      <Sidebar/>
      <Chat/>
      </div>
    </div>
   
  )
}
export default Home
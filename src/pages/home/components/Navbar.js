import { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../../../publicCompontents/firebase.js'
import { AuthContext } from '../../../context/AuthContext.js'

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
  
  return (
    <div className="navbar">
        <span className="logo">xxx Chat</span>
        <div className="user">
            <img src={currentUser.photoURL} alt="" />
            <span>{currentUser.displayName}</span>
            <button onClick={()=>signOut(auth)}>登出</button>
        </div>
    </div>
  )
}

export default Navbar
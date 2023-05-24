import { useContext, useEffect,useRef } from "react"
import { AuthContext } from "../../../context/AuthContext"
import { ChatContext } from "../../../context/ChatContext"

const Message = ({message}) => {
    const {currentUser}=useContext(AuthContext)
    const {data}=useContext(ChatContext)
    const ref=useRef()
/*
    useEffect(()=>{
        ref.current.scrollIntoView({behavior:"smooth"})
        
    },[message])
*/
  return (
    <div  className={`message ${message.senderId === currentUser.uid && "owner"}`} ref={ref} >
        <div className="messageinfo">
            <img src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          } alt="" />
            <span>{
            message.senderId === currentUser.uid
              ? currentUser.displayName
              : data.user.userName
          }</span>
        </div>
        <div className="messagecontent" >
            {message.img && <img src={message.img} alt="" />}
            <p>{message.text}</p>
        </div>
    </div>
  )
}

export default Message
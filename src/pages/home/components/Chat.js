import Input from "./Input.js"
import Messages from "./Messages.js"
import { useContext } from "react"
import { ChatContext } from "../../../context/ChatContext"


const Chat = () => {
  const {data}=useContext(ChatContext)
  return (
    <div className="chat">
      <div className="chatbar">{data.user?.userName}</div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat
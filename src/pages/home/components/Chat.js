import Input from "./Input.js"
import Messages from "./Messages.js"
import { useContext } from "react"
import { ChatContext } from "../../../context/ChatContext"


const Chat = () => {
  const {data}=useContext(ChatContext)

  const onclickBack=()=>{
    const chat =  document.getElementById('chat');
        const sidebar =  document.getElementById('sidebar');
        chat.classList.remove('active');
        sidebar.classList.remove('n-active');
        console.log("好友欄打開聊天室收起來")
  }
  return (
    <div className="chat" id="chat">
      <div className="chatbar">
        <button className="phone_back" name="back" onClick={()=>onclickBack()}>
        <i className="fa-solid fa-circle-arrow-left"></i>
        </button>
        {data.user?.userName}
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat
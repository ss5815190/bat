import Input from "./Input.js"
import Messages from "./Messages.js"


const Chat = () => {
  return (
    <div className="chat">
      <div className="chatbar">name:</div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat
import { useContext,useEffect,useState } from "react"
import { doc, onSnapshot } from "firebase/firestore";
import { ChatContext } from "../../../context/ChatContext"
import { db } from "../../../publicCompontents/firebase.js";
import Message from './Message.js'

const Messages = () => {

    const {data}=useContext(ChatContext)
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
          doc.exists() && setMessages(doc.data().messages);
        });
    
        return () => {
          unSub();
        };
      }, [data.chatId]);
  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  )
}

export default Messages
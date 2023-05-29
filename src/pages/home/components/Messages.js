import { useContext,useEffect,useRef,useState } from "react"
import { doc, onSnapshot } from "firebase/firestore";
import { ChatContext } from "../../../context/ChatContext"
import { db } from "../../../publicCompontents/firebase.js";
import Message from './Message.js'

const Messages = () => {

    const {data}=useContext(ChatContext)
    const [messages, setMessages] = useState([]);
    /*當有新的訊息時，捲動到最下面 */
    const ref=useRef(null)
    useEffect(()=>{
        ref.current.scrollTop=ref.current.scrollHeight
    },[messages])
    /*實時更新 新訊息 */
    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
          doc.exists() && setMessages(doc.data().messages);
        });
    
        return () => {
          unSub();
        };
      }, [data.chatId]);
  return (
    <div className="messages" ref={ref}>
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  )
}

export default Messages
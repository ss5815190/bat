import {arrayUnion,doc,serverTimestamp,Timestamp,updateDoc,} from "firebase/firestore";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { ChatContext } from "../../../context/ChatContext";
import { db,storage } from "../../../publicCompontents/firebase.js";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from "uuid";
const Input = () => {
    const [text,setText]=useState("")
    const [img, setImg] = useState(null);

    const {currentUser}=useContext(AuthContext)
    const { data } = useContext(ChatContext);

    const handleSend = async () => {
        if (img) {
          const storageRef = ref(storage, uuid());
    
          const uploadTask = uploadBytesResumable(storageRef, img);
    
          uploadTask.on(
            (error) => {
              //TODO:Handle Error
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                await updateDoc(doc(db, "chats", data.chatId), {
                  messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                    img: downloadURL,
                  }),
                });
              });
            }
          );
        } else {
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
            }),
          });
        }
    
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [data.chatId + ".lastMessage"]: {
            text,
          },
          [data.chatId + ".date"]: serverTimestamp(),
        });
    
        await updateDoc(doc(db, "userChats", data.user.uid), {
          [data.chatId + ".lastMessage"]: {
            text,
          },
          [data.chatId + ".date"]: serverTimestamp(),
        });
    
        setText("");
        setImg(null);
      };
      
        
    
  return (
    <div className="input">
        <textarea name="message" placeholder="輸入訊息" rows="1"
        onChange={(e) => setText(e.target.value)}
        value={text}
        ></textarea>
        <div className="send">
            <label htmlFor="file">
                <img src="./imgs/img.png" alt="img" />
                <input type="file" style={{display:'none'}}id='file'
                 accept="image/*" onChange={(e) => setImg(e.target.files[0])}/>
            </label>
            <button className="sendmessage" onClick={handleSend}>send</button>
        </div>
    </div>
  )
}

export default Input;
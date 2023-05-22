import {collection,query,where,getDocs,setDoc,doc,updateDoc,serverTimestamp,getDoc,} from "firebase/firestore";
import { db } from "../../../publicCompontents/firebase.js";
import { AuthContext } from "../../../context/AuthContext.js";
import {useContext, useState } from "react";
const Search = () => {
    const [username, setUsername] = useState("");//搜尋的名字
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);
    const { currentUser } = useContext(AuthContext);
    
    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
      };
      //搜尋
    const handleSearch = async () => {
        const q = query(
          collection(db, "users"),
          where("userName", "==", username)
        );
    
        try {
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            setUser(doc.data());
          });
        } catch (err) {
          setErr(true);
        }
      };
      //檢查firestore 中的聊天是否存在，不存在的話創建 
      const handleSelect = async () => {
       
        const combinedId =
          currentUser.uid > user.uid
            ? currentUser.uid + user.uid
            : user.uid + currentUser.uid;
        try {
          const res = await getDoc(doc(db, "chats", combinedId));
    
          if (!res.exists()) {
            //在聊天集合中創建聊天
            await setDoc(doc(db, "chats", combinedId), { messages: [] });
    
            //創建用戶聊天(自己)
            await updateDoc(doc(db, "userChats", currentUser.uid), {
              [combinedId + ".userInfo"]: {
                uid: user.uid,
                userName: user.userName,
                photoURL: user.photoURL,
              },
              [combinedId + ".date"]: serverTimestamp(),
            });
            //創建用戶聊天(對方)
            await updateDoc(doc(db, "userChats", user.uid), {
              [combinedId + ".userInfo"]: {
                uid: currentUser.uid,
                userName: currentUser.userName,
                photoURL: currentUser.photoURL,
              },
              [combinedId + ".date"]: serverTimestamp(),
            });
          }
        } catch (err) {}
    
        setUser(null);
        setUsername("")
      };
      
  return (
    <div className='search'>
        <div className="searchform">
            <input type="text" placeholder='find a user' 
            onKeyDown={handleKey}
            onChange={(e) => setUsername(e.target.value)}
            value={username}/>
            <div className="dropdown" id="dropdown">
                {err && <span>User not found!</span>}
                {user && (
                <div className="userChat" onClick={handleSelect}>
                    <img src={user.photoURL} alt="" />
                    <div className="userChatInfo">
                        <span>{user.userName}</span>
                    </div>
                </div>
                )}
            </div>
        

        </div>
        <div className="userfriendform">
            <div className="userfriend">
                <img src="" alt="" />
                <div className="userfriendinfo">
                    <span className="userfriendname">abcccj</span>
                    <p>hello</p>  
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Search
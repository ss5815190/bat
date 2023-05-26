import {collection,query,where,getDocs,setDoc,doc,updateDoc,serverTimestamp,getDoc,onSnapshot} from "firebase/firestore";
import { db } from "../../../publicCompontents/firebase.js";
import { AuthContext } from "../../../context/AuthContext.js";
import {useContext, useEffect, useState } from "react";
import { ChatContext } from "../../../context/ChatContext.js";
const Search = () => {
    const [username, setUsername] = useState("")//搜尋的名字
    const [user, setUser] = useState(null)
    const [err, setErr] = useState(false)
    const [chats,setChats]=useState([])

    const { currentUser } = useContext(AuthContext)
    const{dispatch}=useContext(ChatContext)
    
    /*按下enter時觸發handleSearch()*/ 
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
          setErr(false)
        } catch (err) {
          setErr(true)
          console.log("handleSearch err")
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
            console.log("對方uid",user.uid,"我的uid",currentUser.uid);
            
            //創建用戶聊天(自己) 
            await updateDoc(doc(db, "userChats",currentUser.uid), {
              [combinedId]: {
                userInfo: {
                  uid: user.uid,
                  userName: user.userName,
                  photoURL: user.photoURL,
                },
                date: serverTimestamp(),
              },
            });//創建用戶聊天(對方 )之前變數打錯整筆資料寫不進去
            
            await updateDoc(doc(db, "userChats",user.uid), {
              [combinedId]: {
                userInfo: {
                  uid: currentUser.uid,
                  userName: currentUser.displayName,//之前打錯變數名稱
                  photoURL: currentUser.photoURL,
                },
                date: serverTimestamp(),
              },
            })
           
             
           }
        } catch (err) {}
    
        setUser(null);
        setUsername("")
      };
      //實時更新好友欄位用onSnapshot()方法
      useEffect(()=>{
        //重整會發生錯誤 沒拿到currentUser.uid
        const  getchats=async()=>{
            const unsub =await onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                //console.log("Current data: ", doc.data());
                //Object.entries()把物件轉為陣列
                setChats(doc.data())
            });

            return () => {
                unsub()
            };
        }
        //如果currentUser.uid 不為null，執行getchats()
        currentUser.uid && getchats();
      },[currentUser.uid])

      //當好友欄位被點擊時
      const Selectfriend=(u)=>{
        dispatch({ type: "CHANGE_USER", payload: u });
        /*rwd手機畫面收合側邊欄位 */
        const chat =  document.getElementById('chat');
        const sidebar =  document.getElementById('sidebar');
        chat.classList.toggle('active');
        sidebar.classList.toggle('n-active');
        console.log("好友欄位被點擊!!!sidebar收起來");
      }
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
            {                //用於對陣列中的元素進行排序。使用降序排列讓最新的日期在最前面
                Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat)=>(
                <div className="userfriend"  key={chat[0]} 
                onClick={() => Selectfriend(chat[1].userInfo)}>
                    <img src={chat[1].userInfo.photoURL} alt="" />
                    <div className="userfriendinfo">
                        <span className="userfriendname">{chat[1].userInfo.userName}</span>
                        <p>{chat[1].lastMessage?.text}</p>  
                    </div>
                </div>
                
                ))
            }
            
        </div>
    </div>
  )
}

export default Search
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword , updateProfile} from 'firebase/auth';
import { auth, db, storage } from "../../../publicCompontents/firebase"
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import '../style/login.css'
import { useNavigate} from "react-router-dom";
const Login=()=>{
    const [Login,setLogin]=useState('login')
    const [err,setErr]=useState(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);//怕有人手賤
    const navigate = useNavigate();

    const RegisterOrLogin=()=>{//切換註冊登入
        if(Login==='login')setLogin('signup')
        else setLogin('login')
        
    }
    //註冊頁面送出表單
    const onSubmit=async (e) =>{

        e.preventDefault()
        setIsButtonDisabled(true);//送出表單，先禁用按鈕
        const userName=(e.target[0].value)
        const email=(e.target[1].value)
        const password=(e.target[2].value)
        const userAvatar=(e.target[3].files[0])

        try{
            /*註冊信箱密碼 */
            const res=await  createUserWithEmailAndPassword(auth, email, password)
           
            const date = new Date().getTime();
            //圖片名字
            const storageRef = ref(storage, `${userName + date}`)
            //上傳圖片到firebase storage
            await uploadBytesResumable(storageRef, userAvatar).then(
                () => {
                    //從firebase storage拿到圖片網址
                getDownloadURL(storageRef).then(async (downloadURL) => {
                  try {
                    //更新個人資料
                    await updateProfile(res.user, {
                        displayName: userName,
                      photoURL: downloadURL,
                    });
                    //建立個人資料
                    await setDoc(doc(db, "users", res.user.uid), {
                      uid: res.user.uid,
                      userName,
                      email,
                      photoURL: downloadURL,
                    });
                    //建立對話內容
                    await setDoc(doc(db, "userChats", res.user.uid), {});
                    alert('註冊成功:', userName)
                    setErr(false)
                    setTimeout(()=>{
                      navigate("/chatroom");//跳轉到聊天室
                    }
                    ,3000)
                    
                  } catch (err) {
                    console.log(err)
                    setErr(true)
                    
                  }
                });
              });
        }catch(err){
            setErr(true)
        }
          
        setIsButtonDisabled(false);
    }
    //登入
    const handleLogin = async (e) => {
      e.preventDefault();
      const email = e.target[0].value;
      const password = e.target[1].value;
  
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/chatroom")
      } catch (err) {
        setErr(true)
      }
    };
    
    return(
        <div className="view">
            {/*登入畫面 */}
            
            
            <div className="login" style={{display: Login==='login' ? 'flex' : 'none' }}>
            <div>測試信箱:bill@yahoo.com</div>
            <div>密碼:12345678</div>
            <div className="title">Login</div>
                <form onSubmit={handleLogin}>
                    <input type="email" name="email" placeholder="email"
                    required/>
                    <input type="password" name="password" placeholder="password"
                      required/>
                    <button className="sign_in" disabled={isButtonDisabled}>sign in</button>
                </form>
                <p>you don't have an account? <button onClick={()=>RegisterOrLogin()}>Register</button></p>
            </div>
             {/*註冊畫面 */}
            <div className="login" style={{display: Login==='signup' ? 'flex' : 'none' }}>
            <div className="title">Register</div>
                <form onSubmit={onSubmit}>
                    <input type="text" name="username" placeholder="Username"  
                    maxLength="20"                   
                     required/>
                    <input type="email" name="email" placeholder="email"     
                     required/>
                    <input type="password" name="password" placeholder="password >=8"
                    minLength="8" required/>
                    <span>頭像 (Avatar)</span>
                    <input type="file" id="file" accept="image/*" required/>
                    <button className="sign_in" disabled={isButtonDisabled}>Register up</button>
                </form>
                <p>you do have an account?  <button onClick={()=>RegisterOrLogin()}>Login</button></p>
            {err&&<span>發生錯誤!</span>}
            </div>
            {isButtonDisabled&&<p>資料處裡中，請稍後</p>}
        </div>
    )
}
export default Login;
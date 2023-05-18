import { useState } from "react";
import '../style/login.css'
const Login=()=>{
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const UserNameOnchange=()=>{

    }
    const PasswordOnchange=()=>{

    }
    return(
        <div className="view">
            <div className="login">
            <div className="title">Login</div>
                <form >
                    <input type="text" name="username" placeholder="Username"
                    onChange={UserNameOnchange} required/>
                    <input type="password" name="password" placeholder="password"
                     onChange={PasswordOnchange} required/>
                    <button className="sign_in">sign in</button>
                </form>
            </div>
        </div>
    )
}
export default Login;
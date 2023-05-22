
const Input = () => {
  return (
    <div className="input">
        <textarea name="message" placeholder="輸入訊息" rows="1"></textarea>
        <div className="send">
            <label htmlFor="file">
                <img src="./imgs/img.png" alt="img" />
                <input type="file" style={{display:'none'}}id='file' accept="image/*"/>
            </label>
            <button className="sendmessage">send</button>
        </div>
    </div>
  )
}

export default Input
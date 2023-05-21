const Respon=()=>{
	return(
						/*判斷誰的訊息*/
		<div className={`${1===2?"myrespon":"respon"}`}>
			<div className="avater">					
			</div>
			<div className="content">
				content	
			</div>
		</div>
		)
}
const Ex4=()=>{
	return(
		<div className="ex_wrap">
			<div className="ex4">
				<h1>題目四 : 規劃聊天室的 component</h1>
				<div className="chatroom">
				{Respon()}
					<div className="enter">
						<textarea className="input" name="text"id="" 
						cols="40" rows="10"></textarea>

						<button>+</button>
					</div>
				</div>

			</div>
		</div>
		)
}
export default Ex4;
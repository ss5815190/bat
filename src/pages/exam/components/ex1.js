import {useState}from 'react';
const Ex1=()=>{

	const[value,setValue]=useState(0);
	const[ans,setAns]=useState(0);
	const Calc=(n)=>{
		/*有規律，1 3 5分別得出1 0 -1，
				 2 4 6得出3 4 5*/
		if(n!==0){
			if(n%2!==0) n=((n-5)/2-n+4);//基數	
			else n=(n/2)+2;//偶數
			setAns(n);
		}		
	}
	const onChange=(e)=>{//input欄位發生變化
		setValue(e.target.value);
	}
	const KeyDown=(e)=>{
		if(e.key === 'Enter') Calc(value);
	}
	return(
		<div className="ex_wrap">
			<div className="ex1">
				<h1>題目一 : 1+2-3+4-5+6-.....+ 或 - N</h1>
				<div className="ex1_ans">
					輸入N :
					<input type="text" value={value} onChange={onChange} onKeyDown={KeyDown}/>
					<button onClick={()=>Calc(value)} className="ex1_enter">
						送出
					</button>
				</div>
				結果 :{ans}
			</div>
		</div>
		)
} 
export default Ex1;
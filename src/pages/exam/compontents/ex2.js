import {useState}from 'react';

const Prize=({el,quantity})=>{
	return(
		<div className="prize">
			<div className="name">{el.name} </div>
			<div className="weight">機率: {el.weight}%</div>
			<div className="quantity">數量:{quantity}</div>
		</div>
		)
}
const Ex2=()=>{
	const[prizes,setPrizes]=useState([
			{"name": "一獎", "weight": 3,"quantity":1}, 
		    {"name": "二獎", "weight": 7,"quantity":1}, 
		    {"name": "三獎", "weight": 30,"quantity":2},
		    {"name": "四獎", "weight": 20,"quantity":3},
		    {"name": "五獎", "weight": 40,"quantity":7}]);
	const draw=()=>{
		//如果全部獎品數量皆為0
		if(prizes.filter((q)=>q.quantity===0).length===5) alert("獎項以全部抽完")
			else{
				let newP=[...prizes];
				let i;
				let n=Math.floor(Math.random()*100+1);
				(n<=3)?i=0:(n<=10)?i=1:(n<=30)?i=3:
				(n<=60)?i=2:(n<=100)?i=4:console.log("draw error")
				if(newP[i].quantity!==0){//獎品數量不為0的話
					newP[i].quantity-=1;
					setPrizes(newP);
					alert("恭喜你抽到"+(i+1)+"獎!");
				}else draw();
		}
	}
	return(
		<div className="ex_wrap">
			<div className="ex2">
				<h1>題目二 : 抽抽樂</h1>
				{prizes.map((el,id)=>(
					<Prize key={id}el={el} quantity={el.quantity}/>
					))}
				<button onClick={()=>draw()}className="lottery">抽獎</button>
			</div>
		</div>
		)
} 
export default Ex2;
import '../style/animation.css';
import { useEffect} from 'react';
const Animation=()=>{
	
	
	useEffect(() => {
		const allBox = document.querySelectorAll('div.animation');
		console.log(allBox)
	    const checkbox=()=>{
	   
			allBox.forEach((box)=>{
				 //條件一：頂部小於頁面高度
		        const currentPosition = window.scrollY + window.innerHeight;
		        const boxPosition = box.offsetTop;
		        const boxAppear = currentPosition > boxPosition;
		        //條件二：底部高於頁面高度
		        const boxBottom = box.offsetTop + box.clientHeight;
		        const boxOnWindow = window.scrollY < boxBottom;

		        if(boxOnWindow && boxAppear) {
		        //符合出現條件，加上active此class
		          box.classList.add('active');
		          box.classList.remove('n-active');
		        } else {
		        //不符合出現條件，移除active此class
		          box.classList.remove('active');
		          box.classList.add('n-active');
		      		
		        };
				})
		
		}
		checkbox();//手動調用 剛渲染完不會觸發
	    window.addEventListener('scroll', checkbox,true);

	    return () => {
	       window.removeEventListener('scroll', checkbox,true);
	    };
	  }, []);
	const FNAME="NOOOO";
	const NAME="SMOKEcigarette"

	return(
		<div className="a">
			<div className="animation">
				<div className="box">1</div>
				<div className="box">2</div>
				<div className="box">3</div>
				<div className="box">4</div>
				<div className="box">5</div>
			</div>
			<div className="animation">
				<div className="shadow">
					<button className="btn">
						BUTTON
					</button>
				</div>
			</div>
			<div style={{backgroundColor:"black"}}className="animation">
				<div className="cigarette">
					<span style={{'--i':'1'}}><i>{FNAME}</i>{NAME}</span>
					<span style={{'--i':'2'}}><i>{FNAME}</i>{NAME}</span>
					<span style={{'--i':'3'}}><i>{FNAME}</i>{NAME}</span>
					<span style={{'--i':'4'}}><i>{FNAME}</i>{NAME}</span>
					<span style={{'--i':'5'}}><i>{FNAME}</i>{NAME}</span>
					<span style={{'--i':'6'}}><i>{FNAME}</i>{NAME}</span>
					<span style={{'--i':'7'}}><i>{FNAME}</i>{NAME}</span>
					<span style={{'--i':'8'}}><i>{FNAME}</i>{NAME}</span>
					<span style={{'--i':'9'}}><i>{FNAME}</i>{NAME}</span>
					<span style={{'--i':'10'}}><i>{FNAME}</i>{NAME}</span>

				</div>	
			</div>
		</div>
		)
}
export default Animation;
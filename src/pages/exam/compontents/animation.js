import '../style/animation.css';
import { useEffect} from 'react';
/*7hWP9.V/,VbbcZ_ */
const Animation=()=>{
	
	
	useEffect(() => {
		const allBox = document.querySelectorAll('img');
		console.log(allBox)
	    const checkbox=()=>{
	   
			allBox.forEach((box)=>{
                //使用 getBoundingClientRect() 方法來取得該元素在畫面中的距離
                //top 屬性是元素距離頁面頂部的距離，window.pageYOffset則是一個讀取器，返回文檔從上到下捲動的像素值
                //兩者相加得到元素在頁面的絕對高度
                const boxRect = box.getBoundingClientRect();
                const boxTop = boxRect.top + window.pageYOffset;
                const boxBottom = boxRect.bottom + window.pageYOffset;
                const currentPosition = window.scrollY + window.innerHeight;
                //條件一：頂部小於頁面高度
                const boxAppear = currentPosition > boxTop;
                //條件二：底部高於頁面高度
                const boxOnWindow = window.scrollY < boxBottom;

                if(boxOnWindow && boxAppear) {
                //符合出現條件，加上active此class
                box.classList.add('active');
				box.classList.remove('n-active');
                } else {
                //不符合出現條件，移除active此class
				box.classList.add('n-active');
                box.classList.remove('active');
                };
                })
				
		
		}
		checkbox();//手動調用 剛渲染完不會觸發
	    window.addEventListener('scroll', checkbox, true);

	    return () => {
	       window.removeEventListener('scroll', checkbox, true);
	    };
	  }, []);
	//const FNAME="NOOOO";
	//const NAME="SMOKEcigarette"

	return(
		<div className="a">
			<div className="animation">
				<img src="https://cdn.cloudflare.steamstatic.com/store/home/store_home_share.jpg" alt="" />
			</div>
			<div className="animation">
				<img src="https://cdn.cloudflare.steamstatic.com/store/home/store_home_share.jpg" alt="" />
			</div>
			<div className="animation">
				<img src="https://cdn.cloudflare.steamstatic.com/store/home/store_home_share.jpg" alt="" />
			</div>
			<div className="test"><img src="https://cdn.cloudflare.steamstatic.com/store/home/store_home_share.jpg" alt="" /></div>
			{/* <div className="animation">
				<div className="box">1</div>
				<div className="box">2</div>
				<div className="box">3</div>
				<div className="box">4</div>
				<div className="box">5</div>
			</div>
			<div className="animation ">
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
			<div className="animation">
				<div className="excss">
					<ul className="nav">
						<li>1~367676767676
							<ul>
								<li>1111 
								<ul>
									<li>abc</li>
									<li>abc</li>
									<li>abc</li>
									<li>abc</li>
								</ul>
								</li>
								<li>2222 
								<ul>
									<li>abc</li>
								</ul>
								</li>
								<li>3333 
								<ul>
									<li>abc</li>
								</ul>
								</li>
							</ul>
						</li>
						<li>4~667676767676
							<ul>
								<li>4444 
								<ul>
									<li>abc</li>
								</ul>
								</li>
								<li>5555 
								<ul>
									<li>abc</li>
								</ul>
								</li>
								<li>6666 
								<ul>
									<li>abc</li>
								</ul>
								</li>
							</ul>
						</li>
						<li>7~967676767676
							<ul>
								<li>7777</li>
								<li>8888</li>
								<li>9999</li>
							</ul>
						</li>
					</ul>
				</div>
			</div> */}

		</div>
		)
}
export default Animation;
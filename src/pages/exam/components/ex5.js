const Ex5=()=>{
	const candidates = 
	[
		 { name: 'A', city: 'Taipei', probability: 0.1, population: 3000000 },
		 { name: 'B', city: 'New Taipei', probability: 0.2, population: 4000000 },
		 { name: 'C', city: 'Taoyuan', probability: 0.3, population: 2000000 },
		 { name: 'D', city: 'Hsinchu', probability: 0.15, population: 1000000 },
		 { name: 'E', city: 'Miaoli', probability: 0.25, population: 500000 },
		 { name: 'F', city: 'Taipei', probability: 0.05, population: 2000000 },
		 { name: 'G', city: 'Taoyuan', probability: 0.1, population: 1500000 },
	];
	const test=[]; 

	const ex5=(candidates)=>{
		
		candidates.map((e)=>(
			test.filter((el)=>el[0]===e.city).length===0?
			//找不到所屬地區的話push新的地區資料
				test.push([e.city,[{name:e.name,city:e.city,
				probability:e.probability,population:e.population}]])
			//找到的話把資料push到該地區
			:test.map((el)=>(el[0]===e.city?el[1].push({name:e.name,city:e.city,
				probability:e.probability,population:e.population})
				: console.log('can\'t find')
				))

		))
	}
	console.log(test);
	return(
		<div className="ex_wrap">
			<div className="ex5">
				<h1>題目五 : 投票活動</h1>
				{ex5(candidates)}
				<div className="output">
					<pre>{JSON.stringify(test, null, 2)}</pre>
				</div>
			</div>
		</div>
		)
}
export default Ex5;
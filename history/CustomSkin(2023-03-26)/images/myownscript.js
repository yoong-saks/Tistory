
(function($) {
  function sliderMoving(){
		document.querySelector(".thumb_summary ul li:nth-child(1)").classList.add("view");

		const thumb3UlNth1 = document.querySelector(".thumb_summary ul li:nth-child(1)")
		const thumb3All = document.querySelectorAll(".thumb_summary ul li")

		let you=1;
		let setTime=1000;
		// --
		let i = 0;
		// --
		setInterval(()=>{
			i+=5
		},100)
		// --	
		setInterval(()=>{
			if(i>=200){
				you++;
				i=0;
			}

			if(you>thumb3All.length){
				you=1;
			}

			thumb3UlNth1.classList.remove("view");
			thumb3UlNth1.classList.add("none");
			if(you==1){
				thumb3All.forEach((e,i)=>{
					e.classList.remove("none");
				})
			}
			thumb3All.forEach((e,i)=>{
				e.classList.remove("view");
			})
			if(you>1){
				document.querySelector(".thumb_summary ul li:nth-child("+(you-1)+")").classList.add("none");
			}
			document.querySelector(".thumb_summary ul li:nth-child("+you+")").classList.add("view");
			
		},setTime)


		let rotate_que = Math.floor(Math.random()*101);
		let size_que = Math.floor(Math.random()*5)+1;
		const allList = document.querySelectorAll(".thumb_summary ul li");

		document.querySelector(".thumbnail").addEventListener("mouseover", (e) => {
		})
	}
})(jQuery);

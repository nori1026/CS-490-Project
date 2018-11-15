
getScore();

let commentId = [];
let scoreId = [];
let questionidArray = [];
let studentId;

function getScore(){
	let container = document.querySelector('.container');
	const xhr = new XMLHttpRequest();

	//let inputOne;
	//let inputTwo;
  	xhr.onload = function() {
      		//get several info on question solved in test
      		let res = this.responseText;
		console.log(res);
		let num = 1;	
		//split response into array
		console.log(typeof(res));
		let arrayQuestion = res.split(";");
		
		let subarray = [];
		let infoarray = []
		
		console.log(arrayQuestion);
		
		let tempArray = [];
		let content = [];
		while(arrayQuestion.length != 1){
			
			tempArray.push(arrayQuestion.shift());
			tempArray.push(arrayQuestion.shift());
			tempArray.push(arrayQuestion.shift());
			tempArray.push(arrayQuestion.shift());
			tempArray.push(arrayQuestion.shift());
			tempArray.push(arrayQuestion.shift());	
			tempArray.push(arrayQuestion.shift());
			tempArray.push(arrayQuestion.shift());
			content.push(tempArray);
			tempArray = [];
		}
	
		
		let temp = 0;
		let current;
		content.forEach( i => {
			current = parseInt(i[0].replace(':', ''));
			console.log(i);
			if(current > temp){
				temp = current;
			}
				
		});

		let filtered = content.filter((value, index, arr)=>{
			if(!(typeof(value[0]) == "undefined")){
				return value;	
			}
		});
		console.log(filtered.length);	

		//loop through each question in array/further breakdown
		//into two-dimensional array
		let count = 0;
		let inputOne;
		let inputTwo;
		let tempItem;
		//console.log(content.length);
		lenFilter = content.length/2;
		while(lenFilter){
		//	console.log(content[count]);	
			
			tempItem = parseInt(content[count][0].replace(':', ''));
			
			console.log(tempItem + " " + temp);
			if(tempItem == temp){
				//container = document.querySelector('.container');
				let questionItem = content.shift();
				//console.log(questionItem);	
				let header = document.createElement('h2');
				header.innerHTML = "Question" + count;
				//make table for description and input
				let tableOne = document.createElement('table');
				let tableTwo = document.createElement('table');
	
				//content of first table
				let sectionOne = document.createElement('td');
				let sectionTwo = document.createElement('td');

				sectionOne.innerHTML = questionItem[2];
				sectionTwo.innerHTML = questionItem[4];
	
				tableOne.appendChild(sectionOne);
				tableOne.appendChild(sectionTwo);

				//add questionId to array
				questionidArray.push(questionItem[2]);

				//content of second table
				let tableComment = document.createElement('td');
				let tableScore = document.createElement('td');
		
				inputOne = document.createElement('textarea');
				inputTwo = document.createElement('textarea');
				inputOne.className = "comments";
				inputTwo.className = "points";
				inputOne.disabled = "true";
				inputTwo.disabled = "true";

				inputOne.value = questionItem[7];
				inputOne.rows = "15";
				inputOne.cols = "50";
				inputOne.style.verticalAlign = "top";	
				inputTwo.value = questionItem[6];
				inputTwo.rows = "5";
				inputTwo.cols = "5";
				inputTwo.style.verticalAlign = "top";	

				commentId.push(inputOne.id);
				scoreId.push(inputTwo.id);

				tableComment.appendChild(inputOne);
				tableScore.appendChild(inputTwo);

				tableTwo.appendChild(tableComment);
				tableTwo.appendChild(tableScore);
	
				container.appendChild(tableOne);
				container.appendChild(tableTwo);

				studentId = questionItem[1];
				count = count + 1;
				lenFilter--;
			} else {
				content.shift();
				count = count + 1;
			}
		}
		
	};

	

	xhr.open("POST", "getScore.php", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send();
}


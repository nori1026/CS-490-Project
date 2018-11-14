
getScore();

function getScore(){
	let container = document.querySelector('.container');
	const xhr = new XMLHttpRequest();

	let inputOne;
	let inputTwo;
  	xhr.onload = function() {
      		//get several info on question solved in test
      		let res = this.responseText;
		console.log(res);
			
		//split response into array
		let subarray = [];
		let arrayQuestion = res.split(';');
		arrayQuestion.forEach( i => {
			subarray.push(i);
		});
		arrayQuestion = subarray;
	
		let tempArray = []
		arrayQuestion.forEach( i=> {
				tempArray.push(i.split(","));	
			}
		);

		console.log(tempArray[0]);

		//loop through each question in array/further breakdown
		//into two-dimensional array
		let count = 1;
		if(tempArray.length != 1){
		while(tempArray.length){

				//container = document.querySelector('.container');
				let questionItem = tempArray.shift();
			
				let header = document.createElement('h2');
				header.innerHTML = "Question" + count;
				//make table for description and input
				let tableOne = document.createElement('table');
				let tableTwo = document.createElement('table');
	
				//content of first table
				let sectionOne = document.createElement('td');
				let sectionTwo = document.createElement('td');

				sectionOne.innerHTML = questionItem[0];
				sectionTwo.innerHTML = questionItem[1];
	
				tableOne.appendChild(sectionOne);
					tableOne.appendChild(sectionTwo);
	
				//content of second table
				let tableScore = document.createElement('td');
				let tableComment = document.createElement('td');
			
				inputOne = document.createElement('textarea');
				inputTwo = document.createElement('textarea');
				inputOne.id = "score";
				inputTwo.id = "comment";

				inputOne.value = questionItem[2];
				inputTwo.value = questionItem[3];

				tableScore.appendChild(inputOne);
				tableComment.appendChild(inputTwo);

				tableTwo.appendChild(tableScore);
				tableTwo.appendChild(tableComment);
	
				container.appendChild(tableOne);
				container.appendChild(tableTwo);
			}
		}
	};
	console.log(inputOne +' '+ inputTwo);

	//let submit = document.createElement('button');
	//container.appendChild(submit);
	xhr.open("POST", "sendSession.php", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send();
}


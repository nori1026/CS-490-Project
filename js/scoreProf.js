
getScore();

let commentId = [];
let scoreId = [];
let questionidArray = [];
let studentId;
let srcArray = [];
let arrayLines = [];

console.log("it  works");

//utility function for checking which color to choose per sign, func colorChec
function determColor(colorCode, elem){
	if(colorCode == "0"){
                elem.style.color = "black";
	}
	else if(colorCode =="1"){
		elem.style.color = "red";
	}
	else if(colorCode == "2"){
		elem.style.color = "orange"
	}
        else if(colorCode == "3"){
		elem.style.color = "green";
	}
}

//utility code for choice on each line for deciding its color
function colorCheck(elem, count, array){
	let item = elem.value;
	let tempArray = [];
	let temp = "";
	//console.log(item + " " + count);
	//ignore first
	//check second for number at end of line
	if( count >= 1){	
		let colorCode = item.substring(item.length, item.length-1);
		elem.value = item.substring(0, item.length-1);
		//array[count] = elem.value;
		determColor(colorCode, elem);
	}
	
}

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
		let arrayQuestion = res.slice(12).split(";");
		
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
		
		let lastArray = arrayQuestion[0].substring(1).slice(1,-1).split(/\",|null,/g);
		lastArray.pop();
		let phArray = [];
		lastArray.forEach(i=>{
			phArray.push(i.replace(/\"+/g, "").replace(/\\n\\t|\\n/g, "\r\n"));
		});
		lastArray = phArray;

		content.push(lastArray);

		let temp = 0;
		let current;
		content.forEach( i => {
			current = parseInt(i[0].replace(':', ''));
			console.log(i);
			if(current > temp){
				temp = current;
			}
				
		});
		console.log(content);

		//check if the test result is new
		content.forEach( i => {
			console.log(temp + " " + parseInt(i[0].replace(':', '')));  
			if(parseInt(i[0].replace(':', '')) == temp){
				srcArray.push(i);
			}
		});
		
		console.log(srcArray);
	
		let keyword = []
		let tempA = []
		while(srcArray.length){
			console.log(srcArray.length);
			let popped = srcArray.pop();
			if(keyword.length == 0){
				tempA.push(popped);
				keyword.push(popped[4]);
			} else if(keyword.length > 0){
				let flag = 1;
				keyword.forEach( i=> {
					if(i == popped[4]){
						flag = 0;		
					}
				});
				if(flag){
					tempA.push(popped);
					keyword.push(popped[4]);
				}
			}
			console.log(popped);
		}
		srcArray = tempA;
		console.log(srcArray);
		console.log(keyword);
/*
		let filtered = content.filter((value, index, arr)=>{
			if(!(typeof(value[0]) == "undefined")){
				return value;	
			}
		});
		console.log(filtered.length);	
*/
		//loop through each question in array/further breakdown
		//into two-dimensional array
		let count = 0;
		let inputOne;
		let inputTwo;
		let tempItem;
		console.log(srcArray);
		lenFilter = srcArray.length;
		if(arrayQuestion[0] != "null"){
		
		let t = document.createElement('h2');
		t.innerHTML = "Professor Test Edit Page";
		t.style.color = "black";
		t.style.margin = "1rem";
		container.appendChild(t);
		while(lenFilter){
			console.log(lenFilter);	
			
				//container = document.querySelector('.container');
				let questionItem = srcArray.shift();
				console.log(questionItem);	
				let header = document.createElement('h2');
				header.innerHTML = "Question" + count;
				//make table for description and input
				let tableOne = document.createElement('table');
				let tableTwo = document.createElement('table');
	
				//content of first table
				let sectionOne = document.createElement('td');
				let sectionTwo = document.createElement('td');

				sectionOne.innerHTML = questionItem[7].substring(0,12);
				sectionOne.style.color = "black";
				sectionOne.style.width = "55%";
				sectionTwo.innerHTML = questionItem[4];
				sectionTwo.style.width = "55%";
	
				tableOne.appendChild(sectionOne);
				tableOne.appendChild(sectionTwo);

				//add questionId to array
				questionidArray.push(questionItem[2]);

				//content of second table
				let tableComment = document.createElement('td');
				let tableScore = document.createElement('td');
		
				tableComment.className = "boxOne";
				//seven separate textbox for table one

				inputTwo = document.createElement('input');
				inputTwo.className = "grade";

				console.log(questionItem);//7 before
				let innerCont = questionItem[7].split('\n');
				//temp comment
				innerCont.shift();
				innerCont.pop();
				

				arrayLines.push(innerCont);
				
				let numLoop = 0;
				
				if(innerCont.length == 0){
					let inputOne = document.createElement('input');
					inputOne.className = "points";
					inputOne.type = "text";
					inputOne.style.width = "700px";
					inputOne.fontSize = "12px";
					tableComment.appendChild(inputOne);
				}

				innerCont.forEach( i => {
					console.log(i)
					let cover = document.createElement('div');
					cover.className = "eachLine";
					let inputOne = document.createElement('input');
					inputOne.className = "points";
					inputOne.type="text";
					inputOne.value = i;
					inputOne.style.width = "700px";
					inputOne.style.fontSize = "12px";
					cover.appendChild(inputOne);
					
					tableComment.appendChild(inputOne);
					colorCheck(inputOne, numLoop, innerCont);///	
					numLoop += 1;

					}
				);

				

				inputTwo.value = questionItem[6];
				inputTwo.style.fontSize = "12px";
				inputTwo.rows = "5";
				inputTwo.cols = "5";
				inputTwo.style.verticalAlign = "top";	

				//commentId.push(inputOne.id);
				//scoreId.push(inputTwo.id);

				//tableComment.appendChild(inputOne);
				tableScore.appendChild(inputTwo);

				tableTwo.appendChild(tableComment);
				tableTwo.appendChild(tableScore);
	
				container.appendChild(tableOne);
				container.appendChild(tableTwo);

				studentId = questionItem[1];
				count = count + 1;
				lenFilter--;
			
		}
		}
		let submit = document.createElement('button');
		submit.innerHTML = "Button";
		submit.className = "btn";
		submit.style.display = "block";
		submit.style.margin = "auto";
		container.appendChild(submit);
		submit.addEventListener('click', sendScore);
	
	//Nested array of table and its input, array of table and array of each line.
	console.log(document.querySelectorAll('.boxOne')[0]);
	};

	

	xhr.open("POST", "getScore.php", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send();
}

function sendScore(){
	let xhc = new XMLHttpRequest();

	xhc.onload = function(){
		console.log(xhc.responseText);
	};

	let newItem =  document.querySelectorAll('.boxOne'); //array of td
	let score = document.querySelectorAll('.grade');
	
	console.log(arrayLines);

	let feedback = "";
	let k = 0;
	arrayLines.forEach( i => {
		feedback += studentId + "~" + questionidArray[k] + "~"; 
		console.log(i);
		i.forEach( j => {
			feedback += j + " "; 
		});
		console.log(score[k]);
		feedback += "~" + score[k].value + ";";
		k = k+1;
	});

	

	console.log(feedback);
	
	//let feedback = comment.value + "~" + score.value;	
	
	xhc.open("POST", "sendScore.php", true);
	xhc.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhc.send("feedback=" + feedback);
	let parentNode = document.querySelector('.container');
	while(parentNode.firstChild){
		parentNode.removeChild(parentNode.firstChild);
	}
	parentNode.innerHTML= "Submitted Successfully";
}


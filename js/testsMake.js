const modalcontainer = document.querySelector(".modalContainer");
const modal = document.querySelector(".modal");
const addItem = document.querySelector(".addItem");

const addList = document.querySelector(".addList");
const listItems = document.querySelectorAll(".addItem");
const center = document.querySelector(".center");
const submit = document.querySelector(".submit");
let newArray = [];
let newCreated;
let counter = 10;
let listLeft=[];
let listRight=[];
let rightListTop = 0;
//modifiable score befor submitting test
let scoreMod;

let diffChoice = document.querySelector('#diffChoice');

const question = document.querySelector('#Question');
const retVal = document.querySelector('#retVal');
//const printVal = document.querySelector('#printVal');
const parameter = document.querySelector('#parameter');
const difficulty = document.querySelector('#difficulty');
const topic = document.querySelector("#topic");
const testCase = document.querySelector("#testCase");
const testbutton = document.querySelector('#testbtn');
const halves = document.querySelector('.halves');
const firstList = document.querySelector('#first');
const secondList = document.querySelector('#second');
const movebtn = document.querySelector('#movebtn');
let listContent;

//array containing response from data bank
let arrayContainer;
let height = 300;
let container = 200;
let num = 0;
let arrayID = [];
let id;

let topicChoice = document.querySelector('#topicChoice');

addItem.addEventListener("click", setVisible);
modalcontainer.addEventListener("click", outsideClick);
submit.addEventListener("click", addQuestion);
testbutton.addEventListener('click', makeTest);
window.addEventListener('load', questionBank);
movebtn.addEventListener('click', moveChecked);
topicChoice.addEventListener('change', sortQuestion); 
diffChoice.addEventListener('change', sortQuestion);

//curl to addTest
console.log("is working");
// modal
function setVisible() {
	modalcontainer.style.display = "block";	
}

function setInvisible() {
	modalcontainer.style.display = "none"
}

function outsideClick(event) {
	if (event.target == modalcontainer) {
		console.log(event.target);
		modalcontainer.style.display = "none";
	}
}

function questionBank() {
	// Fetch question from database	
	const xhr = new XMLHttpRequest();
	xhr.onload = function() {
		console.log('DONE', xhr.status);
		let response = xhr.response;
		console.log(response);	
		let subarray = []
		let arrayQuestion = response.split(';');
		arrayQuestion.forEach(i => {
			subarray.push(i.replace(/\+/g,' '));
		});
		arrayQuestion = subarray;

		arrayContainer = [];
		let singleArray = [];
		console.log(arrayQuestion);
		while(arrayQuestion.length){
			//removes row in db with undefined
			
			if(arrayQuestion[0] != ""){
				singleArray.push(arrayQuestion.shift());
				singleArray.push(arrayQuestion.shift());
				singleArray.push(arrayQuestion.shift());
				singleArray.push(arrayQuestion.shift());
				singleArray.push(arrayQuestion.shift());
				singleArray.push(arrayQuestion.shift());
				singleArray.push(arrayQuestion.shift());
				singleArray.push(arrayQuestion.shift());
				singleArray.push(arrayQuestion.shift());
				arrayContainer.push(singleArray);
				singleArray = [];
				
			} else {
				arrayQuestion.shift();
				arrayQuestion.shift();
				arrayQuestion.shift();
				arrayQuestion.shift();
				arrayQuestion.shift();
				arrayQuestion.shift();
				arrayQuestion.shift();
				arrayQuestion.shift();
				arrayQuestion.shift();
			}
		}
		console.log(arrayContainer);
		/*singleArray.push(arrayQuestion.shift());
		singleArray.push(arrayQuestion.shift());	
		singleArray.push(arrayQuestion.shift());
		singleArray.push(arrayQuestion.shift());
		singleArray.push(arrayQuestion.shift());
		singleArray.push(arrayQuestion.shift());
		singleArray.push(arrayQuestion.shift());
		singleArray.push(arrayQuestion.shift());
		singleArray.push(arrayQuestion.shift());
		arrayContainer.push(singleArray);
		singleArray = [];*/

		let dupe = []
		let nn;
		arrayContainer.forEach( array => {
			let used = [];
			nn = 0;
			console.log(array);
			array.forEach( item => {
				if((array[2] == item && nn == 2)
				|| (array[3] == item && nn == 3)
				|| (array[4] == item && nn == 4)
				|| (array[5] == item && nn == 5)
				|| (array[7] == item && nn == 7)
				|| (array[8] == item && nn == 8)){
					console.log(array[8]);
					used.push(item);
				}
				nn += 1;
			});
			dupe.push(used);
		});
		console.log(dupe);

		let checkbox;
		dupe.forEach( array => {
			let rectangle = document.createElement('li');
			rectangle.className = "addItem center";
			rectangle.draggable = "true";
			let table = document.createElement('table');
			let tr = document.createElement('tr');
			let td;
			let i=0;

			checkbox = document.createElement("input");
		        checkbox.type = "checkbox";
		        checkbox.style.display = "inline";
			checkbox.checked = false;

			//2,3,4,#5#,7,8
			
			//let removed = array.splice(2, 1);
			//array.unshift(removed[0]);
			console.log(array);
			array.forEach( item =>{	
					td = document.createElement('td');
					td.innerHTML = item;
					tr.appendChild(td);
			});
		
			

			table.appendChild(tr);	
			rectangle.appendChild(checkbox);
			rectangle.appendChild(table);
			listLeft.push(rectangle);
			rectangle.style.top = "" + counter + "rem";
			//counter += 30;
			halves.style.height = "" + container +"vh";
			container += 54;
			firstList.style.height = "" + height + "vh";
			secondList.style.height = "" + height + "vh";
			height += 48;
			firstList.appendChild(rectangle);
		});
	
	}//end of xhr.onload
	
	xhr.open("POST", "questionBank.php");
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send();

	//add html element to list on left side
	listLeft.forEach(obj => {
			firstList.appendChild(obj);
	});	
}

let table;
let row;
//let questID;
//let uid;
let questionData;
let paraData;
let retData;
//let printData;
let diff;
let topicData;
//let testCaseData;
let qID = 1;
let idContainer = [];

//question id, user id, question, parameter, return, print, difficult, topic

//also add checker and move whichever item/question is checked
function addQuestion(event) {
	let newItemArray = [];

	event.preventDefault();
	setInvisible();

	if(arrayContainer.length){
		currentQID = parseInt(arrayContainer[arrayContainer.length-1][0]) + 1;
	}else {
		currentQID = 1;
	}
	newCreated = document.createElement("li");

	checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.style.display = "inline";
	checkbox.checked = false;	

	newCreated.className = "addItem center";
	newCreated.style.top = "" + counter+"rem";
	addList.appendChild(newCreated);
	table = document.createElement("table");
	newCreated.appendChild(checkbox);
	newCreated.appendChild(table);
	addList.style.height = "" + height + "vh";
	halves.style.height = "" + container+ "vh";
	height += 50;
	container += 60;
	counter += 25;
	
		
	row = document.createElement("tr");
	//questID = document.createElement("td");
	//uid = document.createElement("td");
	questionData = document.createElement("td");
	paraData = document.createElement("td");
	retData = document.createElement("td");
	//printData = document.createElement("td");
	diff = document.createElement("td");
	topicData = document.createElement("td");
	//testCaseData = document.createElement("td");

	newItemArray.push(currentQID);
	newItemArray.push("njo3");
	newItemArray.push(question.value);
	newItemArray.push(parameter.value);
	newItemArray.push(retVal.value);
	//newItemArray.push(printVal.value);
	newItemArray.push(difficulty.value);
	newItemArray.push(topic.value);
	newItemArray.push(testCase.value);

	//questID.innerHTML = currentQID;
	//uid.innerHTML = "njo3"; //for now, replace with proper id later.
	question.innerHTML = question.value;
	paraData.innerHTML = parameter.value;
	retData.innerHTML = retVal.value;
	//printData.innerHTML = printVal.value;
	diff.innerHTML = difficulty.value;
	topicData.innerHTML = topic.value;
	//testCaseData.innerHTML = testCase.value;

	//row.appendChild(questID);
	//row.appendChild(uid);
	row.appendChild(questionData);
	row.appendChild(paraData);
	row.appendChild(retData);
	//row.appendChild(printData);
	//row.appendChild(testCaseData);
	row.appendChild(diff);
	row.appendChild(topicData);

	table.appendChild(row);

	idContainer.push(qID);
	
	qID = qID+1;

	// Need post method to post data

//console.log( question.value + " " +parameter.value + " " + testCase.value + " " + difficulty.value);	
	
	const xhr = new XMLHttpRequest();
	content = newItemArray;
	console.log(content);
  	xhr.onload = function() {
      		console.log(this.responseText);	
      		console.log('DONE', xhr.status);
		console.log(content);
	};
	
	xhr.open("POST", "addQuestion.php");
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	
	xhr.send("question="+content[2]+"&parameter="+content[3]+"&retVal="+content[4]+"&difficulty="+content[5]+"&topic="+content[6]+"&testCase="+content[7]);
	
	//window.location.reload();
}

//interval of id and score by professor in array.
function makeTest() {
	let totalArray = [];
	const xhr = new XMLHttpRequest();
	//instructor name and list of question id
	//loop through content of second list's input box
	scoreMod = [];
	listRight.forEach(i=>{
		console.log(i.childNodes[2].value);
		scoreMod.push(i.childNodes[2].value);
	});
	//send score for each question as string
	console.log(scoreMod);	

	
	xhr.onload = function() {
		console.log(xhr.responseText);

		console.log('DONE', xhr.status);
	};

	xhr.open("POST", "makeTest.php");
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	
	let newString = "";
	arrayID.forEach(i => {
		newString += i+",";
		newString += scoreMod.shift()+";";
	});	
	arrayID = newString;
	console.log(arrayID);
	console.log(arrayID);
	xhr.send("arrayID="+arrayID);
	
	arrayID = [];
}

//move to second list
function moveChecked() {
	let newList;
	let placeholdList;
	let copyList;
	let score;
	listContent = document.querySelectorAll("input[type='checkbox']");
	listContent.forEach(i => {

		if(i.checked){
			i.disabled = true;
			i.style.opacity = "0";
			console.log("Moving to second list");
			/*	
			if(!arrayID.includes(i.parentNode.childNodes[1].childNodes[0].childNodes[0].textContent)){
				console.log(i.parentNode.childNodes[1].childNodes[0].childNodes[1]);
				arrayID.push(i.parentNode.childNodes[1].childNodes[0].childNodes[0].textContent);
			}
			*/
			arrayContainer.forEach( j => {
				if(j[2] == i.parentNode.childNodes[1].childNodes[0].childNodes[0].textContent
				&& j[3] == i.parentNode.childNodes[1].childNodes[0].childNodes[1].textContent
				&& j[4] ==i.parentNode.childNodes[1].childNodes[0].childNodes[2].textContent
				&& j[5] ==i.parentNode.childNodes[1].childNodes[0].childNodes[3].textContent
				&& j[7] ==i.parentNode.childNodes[1].childNodes[0].childNodes[4].textContent
				&& j[8] ==i.parentNode.childNodes[1].childNodes[0].childNodes[5].textContent){
					arrayID.push(j[0]);	
				}
			});
			
			score = document.createElement('input');
			placeholdList = i.parentNode;
			placeholdList.id = num;
			copyList = placeholdList.cloneNode(true);
			score.type = "text";
			copyList.append(score);
			secondList.append(copyList);
			idContainer.push(placeholdList.id);
			//console.log(copyList);
			i.checked = false;
			//console.log(copyList.childNodes[0]) is checkbox on box created on right
			copyList.childNodes[0].checked = false;
			copyList.style.top = rightListTop*25+"rem"
			rightListTop += 1;

			//create array of html for right list to use for test score
			listRight.push(copyList);	
		}
		container += 50;
		secondList.style.height = "" + height + "vh";
		
		console.log(listRight);
		
	});

}
console.log(listLeft);
let phList = listLeft;
//sort depending on dropdown selected
function sortQuestion(event){
	num = 10;
	//dropdown value
	console.log(event.target.value);
	//difficulty
	console.log("diffChoice: " + diffChoice.value);
	console.log("topicChoice: " + topicChoice.value);
	newList = [];
	
	let containerCount = 0;
	console.log(arrayContainer);
	//listLeft contains html from data bank
	listLeft.forEach( i =>{

		console.log(arrayContainer[containerCount][7] + " " + arrayContainer[containerCount][8]);

		//selected difficulty
		//let itemTopic = i.childNodes[1].childNodes[0].childNodes[4].innerHTML;
		let itemTopic = arrayContainer[containerCount][8];
		//selected topic
		//let itemDiff = i.childNodes[1].childNodes[0].childNodes[5].innerHTML;
		let itemDiff = arrayContainer[containerCount][7];
		
		console.log("Difference: " + itemDiff + " topic: " + itemTopic);

		if((event.target.value == itemDiff && topicChoice.value == itemTopic) 
			|| (event.target.value == itemTopic && diffChoice.value == itemDiff)
			|| (event.target.value == "all" && itemDiff == diffChoice.value)
			|| (event.target.value == "All" && itemTopic == topicChoice.value)
			|| (event.target.value == itemTopic && "All" == diffChoice.value)
			|| (event.target.value == itemDiff && "all" == topicChoice.value))
		{
			i.style.top = num+"rem";
			newList.push(i);
			num += 25;
		}
		containerCount += 1;
	});
	
	
	while(firstList.lastChild){
		firstList.removeChild(firstList.lastChild);	
	}

	//check if category is all newList is all qustion in question bank
	
	num = 10;
	if((event.target.value == "all" && diffChoice.value == "All") || 
		(event.target.value == "All" && topicChoice.value == "all")){
		phList.forEach( i=> {
			i.style.top = num+"rem";
			firstList.appendChild(i);
			num += 25;
		});
	}	
	else{
		newList.forEach( i => {
			firstList.appendChild(i);		
		});
	

		
	}

	listLeft = phList;
	newList = [];
	//check list for topic
	//depending on topic on dropdown selected, display question with same topic.
}

getTest();
var string = encodeURIComponent('+');


let submitBtn = document.createElement('button');
submitBtn.setAttribute('type', 'submit');
const storage = document.querySelector('form');
let fullArray;
let lenQuestion = 0;
let testArray = [];
let temp;
let arraySub = [];

submitBtn.addEventListener('click', submitExam);
console.log('working now');

function getTest() {
	const xhr = new XMLHttpRequest();
	let totalPoints = 0;

	xhr.onload = function() {
		let response = xhr.response;
		console.log(response);
		
		totalPoints = 0;
		let points = document.createElement('h3');
		let br = document.createElement('br');
		question = [];

		storage.appendChild(points);
		
		let arrayQuestion = response.split(';');
		
		let subarray = []
		arrayQuestion.forEach(i => {
			subarray.push(i.replace(/\+/g,' '));
		});
		arrayQuestion = subarray;
		
		let arrayContainer = [];
		let singleArray = [];

		console.log(arrayQuestion);
		arrayQuestion.forEach(i =>{
			//arrayQuestion.shift();	
			
			singleArray.push(arrayQuestion.shift());//testId
			singleArray.push(arrayQuestion.shift());//question
			singleArray.push(arrayQuestion.shift());//instructor
			singleArray.push(arrayQuestion.shift());//function
			singleArray.push(arrayQuestion.shift());//parameter
			singleArray.push(arrayQuestion.shift());//return
			singleArray.push(arrayQuestion.shift());//print
			singleArray.push(arrayQuestion.shift());//test case
			singleArray.push(arrayQuestion.shift());//points
			singleArray.push(arrayQuestion.shift());//difficulty
			singleArray.push(arrayQuestion.shift());//topic
			arrayContainer.push(singleArray);						
			singleArray = [];
		});
	
		fullArray = arrayContainer;
		let testQuestionArray = [];
		
		temp = 0;
		let num
		console.log(fullArray);
		fullArray.forEach( i=>{
			num = parseInt(i[0]);
			
			if(num > temp){
				temp = num;	
			}
		});

		fullArray.forEach(i => {
			if(temp == i[0]){
				arraySub.push(i);
			}
		});

		fullArray = arraySub;

		console.log(arraySub);

		if(fullArray.length != 1 && !isNaN(parseInt(fullArray[0]))){	
	
			arrayContainer.forEach( array => {
			if(array[0] == temp){
    			let rectangle = document.createElement('li');
    		   	//rectangle.className = "addItem center";
			let topSection;
			let question;
			let description;
			let inputBox;
		        let i=0;
			if(array[8] == ""){
				totalPoints += 20;
			} else {
				totalPoints += parseInt(array[8]);	
				console.log(array[8]);
			}
			array.forEach( item =>{
				difficulty = document.createElement('h4');
				output = document.createElement('p');
				inputBox = document.createElement("textarea");
				topSection = document.createElement('h4');
				description = document.createElement('p');
				
				inputBox.id = "texts";
				let choice = (array[8] != "")  ? array[8] : '20';
				topSection.innerHTML = "<br>Points: " + choice + '<br>' + array[9];
				description.innerHTML = "Function:" + array[3] + '<br>' 
							+ "That takes parameter: " + array[4] + '<br>'
							+ "Returns: " + array[5] + '<br>'
							+ "prints: " + array[6] + '<br>'

				inputBox.rows = "20";
				inputBox.cols = "80"

			});

			storage.appendChild(topSection);
			storage.appendChild(description)
			storage.appendChild(inputBox);
			}
			});
		}

		points.innerHTML = "Sum of total points " + totalPoints;
		submitBtn.innerHTML = "Click";
		storage.appendChild(br);
		storage.appendChild(submitBtn);
		testArray.push(storage);
	}
	xhr.open("GET", "getTest.php");
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send();
	
}

function submitExam(e) {
	e.preventDefault();
	let c = 0;
	let allArray = []	
	let instructor = fullArray[0][1];
	count = 0;
	questionSection = document.querySelectorAll('.questions');
	//get question id from array result and comment placeholder
	let answerSection = document.querySelectorAll("#texts");

	console.log(arraySub);	
	fullArray.forEach(i => {
		let tempArray = [];
			if(i[0] == temp){
			console.log("hello");
			tempArray.push(answerSection[count].value);
			allArray.push(tempArray);
			count++;
		}
	});

	let arr = [];
	let counter = 0;
	console.log(fullArray);
	//allArray = JSON.stringify(allArray);

	const http = new XMLHttpRequest();
	
	http.onload = function() {
		console.log(http.status);
		if(http.readyState == 4 && http.status == 200) { // complete and no errors
		        console.log(this.responseText); // some processing here, or whatever you want to do with the response
			let submitted = document.querySelector('#submitted');				                
			submitted.innerHTML = "Test has been submitted successfully"

		}
	};

	fullArray.forEach(i => {
		i.shift();
	});
	
	console.log(allArray);
	fullArray.forEach( i => {
		console.log(i);
		i.forEach( j => {
			allArray[c].push(j);
		});
		c+=1;
	});
	console.log(allArray);
	http.open("POST", "submitExam.php", true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");

	let data = "";
	allArray.forEach(i => {
		i.forEach( j => {
			data += j+'~';
			});
		data = data.slice(0, -1);
		data += ";";
		}	
	);

	console.log(data);
	http.send('data='+data);
	storage.innerHTML = "";
/*
	const xhr = new XMLHttpRequest();
	xhr.onload = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			console.log(this.response);
			console.log("question sent successfully");
		}
	}
	xhr.open("POST", "sendGrade.php", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	console.log(data[2]);
	xhr.send("grade="+data[2]);*/
}


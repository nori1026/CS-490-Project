
<html>

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width,
		initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<link rel="stylesheet" href="css/professor.css">
	<link rel="stylesheet" href="css/testsMake.css">
	<title>My homepage</title>
</head>

<body>
	
		<div class="modalContainer">
			<div class="modal">	
			<form>
				<div class="center">
					<label>Write a function named: </label><br><br>
				</div>
				<div class="center">
					<input id="question"
					placeholder="Enter your question here"></input><br>
				</div>

				<div class="center">
					<label>That takes parameters: </label><br><br>
				</div>
				<div class="center">
					<input type="text"  id="parameter"
					placeholder="test case"></input>
				</div>

				<div class="center">
					<label>Question description: </label><br><br>
				</div>
				<div class="center">
					<input id="retVal"></input>
				</div>
				
				<div class="center">Difficulty: </div>
				<select required id="difficulty">
					<option id="easy">Easy</option>
					<option id="medium">Medium</option>
					<option id="difficult">Difficult</option>
				</select>
				
				<div class="center">Topic:</div>
				<div class="center">
					<select required id="topic">
						<option id="ifState">if</option>
						<option id="forLoop">for loop</option>
						<option id="rec">recursion</option>
						<option id="otherItem">other</option>
					</select>
				</div>
				
				<div class="center">Test Cases:</div>
				<div class="center">
					<input type="text" id="testCase"></input>
				</div>
			
				<div class="center">
					<input type="submit" id="Submit" class="submit">	
				</div>
			</form>
			</div>
		</div>
	

		<nav>
			<ul class="navbar">
				<li class="this navcontent"><a href="professor.php" id="home">Home</a></li>
				<li class="navcontent"><a href="testProf.php" id="test">Test</a></li>
				<li class="navcontent"><a href="scoreProf.php" id="score">Score</a></li>
				<li class="navcontent"><a href="https://web.njit.edu/~njo3/">Logout</a></li>
			</ul>
		</nav>
		
		<div id="loadSpace"></div>
		<div class="center">
				<div class="topicContainer">	
					<select id="topicChoice" name="topics">
						<option value="all">all</option>
						<option value="if">if</option>
						<option value="for loop">for loop</option>
						<option value="recursion">recursion</option>
						<option value="other">other</option>
					</select>
				</div>
				<div class="diffContainer">
					<select id="diffChoice" name="diff">
						<option value="All">All</option>
						<option value="Difficult">difficult</option>
						<option value="Medium">medium</option>
						<option value="Easy">easy</option>
					</select>
				</div>
				<a class = "submit" id="movebtn" href="#">>></a>
				<a class="submit" id="testbtn" href="#">Create Test</a>
		</div>
		<div class="halves">
			<ul>
				<li class="addItem diffsize"> 
					<h2>+</h2>
				</li>
			</ul>
			<ul class="addList" id="first">
			</ul>
			<ul class="addList" id="second">
			</ul>
		</div>
</body>
<script src="js/testsMake.js"></script>
</html>

<!-- NJIT default user homepage version 20070214 -->
<?php session_start(); ?>
<html>

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width,
		initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<link rel="stylesheet" href="css/student.css">
	<title>My homepage</title>
</head>

<body>
	<nav>	
		<ul class="navbar">
			<li class="this navcontent"><a href="student.php" id="home">Home</a></li>
			<li class="navcontent"><a href="quizStudent.php" id="test">Test</a></li>
			<li class="navcontent"><a href="qscoreStudent.php" id="score">Score</a></li>
			<li class="navcontent"><a href=https://web.njit.edu/~njo3/>Logout</a></li>
 
		</ul>
	</nav>
	
	<h1>Welcome to student website <?php echo $_SESSION["gid"] ?></h1>

</body>
<script src="js/student.js"></script>
</html>

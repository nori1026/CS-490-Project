<?php session_start();?>
<html>

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width,
		initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<link rel="stylesheet" href="css/professor.css">
	<title>My homepage</title>
</head>

<body>

	<nav>	
		<ul class="navBar">
			<li class="this navcontent"><a href="professor.php" id="home">Home</a></li>
			<li class="navcontent"><a href="testProf.php" id="test">Test</a></li>
			<li class="navcontent"><a href="scoreProf.php" id="score">Score</a></li>
			<li class="navcontent"><a href="https://web.njit.edu/~njo3/">Logout</a></li>	
		</ul>
	</nav>

	<h1>Welcome to the professor page <?php echo $_SESSION["gid"]?></h1>
	
</body>
<script src="js/professors.js"></script>
</html>

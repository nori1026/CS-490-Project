<?php
//header("Content-type: application/x-www-form-urlencoded; charset=utf-8");
session_start();
//submit

$test = array('item' => urlencode($_POST['grade']));
/*
$counter = 0;

$instruct = $_POST['instruct'];
$questionId = $_POST['questionId'];
$question = $_POST['question'];
$score = $_POST['score'];
$comment = $_POST['comment'];

$test = array(
	'instructor' => $instruct,
	'qId' => $questionId,
	'uid' => $id,
	'problem' => $question,
	'points' => $comment,
	'comm' => $difficulty
);
*/
//foreach($test as $key=>$value) { $data_string .= $key.'='.$value.'&'; }
//rtrim($data_string, '&');


$url = "https://web.njit.edu/~ka293/SubmitExam.php";

$cur=curl_init();

curl_setopt($cur, CURLOPT_URL, $url);//ka293
curl_setopt($cur, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($cur, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($cur, CURLOPT_HEADER, 1); 
curl_setopt($cur, CURLOPT_POSTFIELDS, $test);
//curl_setopt($cur, CURLOPT_TIMEOUT, 50);
//curl_setopt($cur, CURLOPT_HTTPHEADER, array('Content-type: x-www-form-urlencoded'));

$response = curl_exec($cur);

if (curl_errno($cur)) {
    // this would be your first hint that something went wrong
        die('Couldn\'t send request: ' . curl_error($cur));
	} else {
	    // check the HTTP status code of the request
	        $resultStatus = curl_getinfo($cur, CURLINFO_HTTP_CODE);
		    if ($resultStatus == 200) {
		            // everything went better than expected		
				} else {
				        // the request did not complete as expected. common errors are 4xx
					        // (not found, bad request, etc.) and 5xx (usually concerning
						        // errors/exceptions in the remote script execution)

							        die('Request failed: HTTP status code: ' . $resultStatus);
								    }
								    }


if ($response === false) { die(curl_getinfo($cur));
} else { echo $response; }

curl_close($cur);
//echo $data['ucid'] . $data['pass'];

//njit as key, works or not as value
//database as key, works or not as value
//$jsonData = json_decode(file_get_contents('php://input'), true);


?>

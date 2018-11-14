<?php
session_start();
//get test student
/*
$user = $_SESSION['gid'];
$score = $_POST['score'];
$comment = $_POST['comment'];

$data = array(
	'testScore' => urlencode($score),
	'profComment' => urlencode($comment)
);

foreach($data as $key=>$value) { $data_string .= $key.'='.$value.'&'; }
rtrim($data_string, '&');
*/
$curl=curl_init();

curl_setopt($curl, CURLOPT_URL, "https://web.njit.edu/~nvs29/ReviewExams.php");//ka293
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, TRUE);
curl_setopt($curl, CURLOPT_POST, count($data));
curl_setopt($curl, CURLOPT_POSTFIELDS,$data);


$result = curl_exec($curl);

curl_close($curl);
echo $result;

//$jsonData = json_decode(file_get_contents('php://input'), true);
//echo $jsonData;

?>

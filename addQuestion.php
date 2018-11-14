<?php
session_start();
//header("Content-Type: application/text", true);

$uid = $_SESSION["gid"];
$function = $_POST['question'];
$parameter = $_POST['parameter'];
$returnValue = $_POST['retVal'];
$printValue = $_POST['printVal'];
$difficulty= $_POST['difficulty'];
$topic = $_POST['topic'];
$testCase = $_POST['testCase'];

$question = array(
	'uid' => urlencode($uid),
	'func' => urlencode($function),
	'param' => urlencode($parameter),
	'retVal' => urlencode($returnValue),
	'printVal' => urlencode($printValue),
	'difficulty' =>urlencode($difficulty),
	'topicSelect' => urlencode($topic),
	'test' => urlencode($testCase)
);

foreach($question as $key=>$value) { $data_string .= $key.'='.$value.'&'; }
rtrim($data_string, '&');

$curl=curl_init();

curl_setopt($curl, CURLOPT_URL, "https://web.njit.edu/~nvs29/AddQuestion.php");//ka293
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, TRUE);
curl_setopt($curl, CURLOPT_POST, count($question));
curl_setopt($curl, CURLOPT_POSTFIELDS,$question);


$result = curl_exec($curl);

curl_close($curl);

echo $result;
//echo $data['ucid'] . $data['pass'];

//njit as key, works or not as value
//database as key, works or not as value
//$jsonData = json_decode(file_get_contents('php://input'), true);


?>

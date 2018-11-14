<?php
session_start();
//makeTest

$uid = $_SESSION["gid"];
$a = $_POST['arrayID'];

$data = array(
	'uid' => urlencode($uid),
	'array' => urlencode($a)
);

foreach($data as $key=>$value) { $data_string .= $key.'='.$value.'&'; }
rtrim($data_string, '&');

$curl=curl_init();

curl_setopt($curl, CURLOPT_URL, "https://web.njit.edu/~nvs29/MakeTest.php");//ka293
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, TRUE);
curl_setopt($curl, CURLOPT_POST, count($data));
curl_setopt($curl, CURLOPT_POSTFIELDS,$data);


$result = curl_exec($curl);

curl_close($curl);

echo $result;
//echo $data['ucid'] . $data['pass'];

//njit as key, works or not as value
//database as key, works or not as value
$jsonData = json_decode(file_get_contents('php://input'), true);


?>

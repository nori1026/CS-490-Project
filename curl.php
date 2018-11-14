<?php
session_start();
//header("Content-Type: application/text", true);

$ucid = $_POST['ucid'];
$pass = $_POST['pass'];

$_SESSION["gid"] = $ucid;
$_SESSION["gpass"] = $pass;

$data = array(
	'ucid' => urlencode($ucid),
	'pass' => urlencode($pass)
);

foreach($data as $key=>$value) { $data_string .= $key.'='.$value.'&'; }
rtrim($data_string, '&');

$curl=curl_init();

curl_setopt($curl, CURLOPT_URL, "https://web.njit.edu/~nvs29/");//ka293
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

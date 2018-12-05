<?php
session_start();
//send test professor

$user = $_SESSION['gid'];
$feedback = $_POST['feedback'];

$data = array(
	'comments' => urlencode($feedback)
);

foreach($data as $key=>$value) { $data_string .= $key.'='.$value.'&'; }
rtrim($data_string, '&');

$curl=curl_init();

curl_setopt($curl, CURLOPT_URL, "https://web.njit.edu/~nvs29/UpdateComments.php");//ka293
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

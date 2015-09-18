<?php
ini_set('display_errors', 'On');
include "ServerAPI.php";
$server = new ServerAPI('25wehl3uwa6hw','wl0oqDn8Ew');

$userName = @$_GET['name'];
$userId = md5($userName);
$image = 'build/images/1.jpg';
$res = json_decode($server->getToken($userId, $userName, $image), true);
if($res['code'] = 200) {
	$res['userName'] = $userName;
	$res['image'] = $image;
	echo json_encode($res);
}





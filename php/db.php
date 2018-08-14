<?
	//header("Access-Control-Allow-Origin: *");
	header('Content-Type: text/html; charset=utf-8');
	
	try {
		$con = array('localhost', 'todo', 'root', '');
		$db = new PDO("mysql:host=".$con[0].";dbname=".$con[1]."", $con[2], $con[3]);
		unset($con);
	} catch (PDOException $e) {
		die("Connect error: ".$e);
	}
<?
	include("../db.php");
	
	$query = $db->prepare("INSERT INTO `tasks`(`title`, `modified`) VALUES('Новый список', UNIX_TIMESTAMP())");
	$result = $query->execute();
	
	
	
	echo $db->lastInsertId();
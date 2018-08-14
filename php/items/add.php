<?
	include("../db.php");
	
	$query = $db->prepare("INSERT INTO `items`(`title`, `task_id`) VALUES(?, ?)");
	$result = $query->execute([$_GET["title"], $_GET["task_id"]]);
	
	
	
	
	
	echo $db->lastInsertId();
	
	
	$query = $db->prepare("UPDATE `tasks` SET `modified`=UNIX_TIMESTAMP() WHERE `id` = ?");
	$result = $query->execute([$_GET["task_id"]]);
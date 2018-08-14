<?
	include("../db.php");
	
	
	
	
	
	$query = $db->prepare("UPDATE `items` SET `done` = !`done` WHERE `id`  = ?");
	$result = $query->execute([$_GET["id"]]);
	
	echo "ok";
	
	$query = $db->prepare("UPDATE `tasks` SET `modified`=UNIX_TIMESTAMP() WHERE `id` = (SELECT `task_id` FROM `items` WHERE `id` = ?)");
	$result = $query->execute([$_GET["id"]]);
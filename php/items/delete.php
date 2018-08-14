<?
	include("../db.php");
	
	$query = $db->prepare("UPDATE `tasks` SET `modified`=UNIX_TIMESTAMP() WHERE `id` = (SELECT `task_id` FROM `items` WHERE `id` = ?)");
	$result = $query->execute([$_GET["id"]]);
	
	
	
	$query = $db->prepare("DELETE FROM `items` WHERE `id`  = ?");
	$result = $query->execute([$_GET["id"]]);
	
	echo "ok";
	
	
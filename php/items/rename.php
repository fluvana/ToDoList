<?
	include("../db.php");
	
	
	
	
	
	$query = $db->prepare("UPDATE `items` SET `title` = ? WHERE `id` = ?");
	$result = $query->execute([$_GET["title"], $_GET["id"]]);
	
	echo "ok";
	
	$query = $db->prepare("UPDATE `tasks` SET `modified`=UNIX_TIMESTAMP() WHERE `id` = (SELECT `task_id` FROM `items` WHERE `id` = ?)");
	$result = $query->execute([$_GET["id"]]);
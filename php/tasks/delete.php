<?
	include("../db.php");
	
	
	
	
	
	$query = $db->prepare("DELETE FROM `tasks` WHERE `id`  = ?");
	$result = $query->execute([$_GET["id"]]);
	
	$query = $db->prepare("DELETE FROM `items` WHERE `task_id`  = ?");
	$result = $query->execute([$_GET["id"]]);
	
	echo "ok";
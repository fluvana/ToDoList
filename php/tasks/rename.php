<?
	include("../db.php");
	
	
	
	
	
	$query = $db->prepare("UPDATE `tasks` SET `title` = ?, `modified` = UNIX_TIMESTAMP() WHERE `id`  = ?");
	$result = $query->execute([$_GET["title"], $_GET["id"]]);
	
	echo "ok";
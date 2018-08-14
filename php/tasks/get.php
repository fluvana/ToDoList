<?
	include("../db.php");
	
	$query = $db->prepare("SELECT * FROM `tasks` ORDER BY `modified` DESC");
	$result = $query->execute($data);
	
	$tasks = $query->fetchAll(PDO::FETCH_ASSOC);
	
	$ids = [];
	foreach ($tasks as $task) {
		$ids[] = $task['id'];
	}
	
	$query = $db->prepare("SELECT * FROM `items` WHERE `task_id` IN (".implode(",", $ids).")");
	$result = $query->execute($data);
	$items = $query->fetchAll(PDO::FETCH_ASSOC);
	
	$sorted_items = [];
	
	foreach ($items as $item) {
		if (!array_key_exists($item["task_id"], $sorted_items)) {
			$sorted_items[$item["task_id"]] = [];
		}
		
		$sorted_items[$item["task_id"]][] = [
			"id" => $item["id"],
			"title" => $item["title"],
			"done" => $item["done"]
		];
	}
	
	foreach ($tasks as $i=>$task) {
		$tasks[$i]["items"] = $sorted_items[$task["id"]];
	}
	
	echo json_encode($tasks);
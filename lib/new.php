<?php
// (X) ERROR
if (!isset($_POST["last"]) || !isset($_POST["gid"])) { die("INVALID REQUEST"); }
 
// (A) INIT
require "2-core.php";
set_time_limit(30); // Set the appropriate time limit
ignore_user_abort(false); // Stop when connection breaks
$sleep = 2; // Not to break the server. Short pause before next check.
 
// (B) LOOP & GET UPDATES
while (true) {
  // (B1) GET LAST GAME UPDATE
  $last = $_SCORE->check($_POST["gid"]);
 
  // (B2) SERVE NEW DATA IF THERE ARE UPDATES
  if ($last > $_POST["last"]) {
    $score = $_SCORE->get($_POST["gid"]);
    echo json_encode([
      "last" => $last,
      "score" => $score
    ]);
    break;
  }
 
  // (B3) WAIT BEFORE CHECKING AGAIN
  sleep($sleep);
}
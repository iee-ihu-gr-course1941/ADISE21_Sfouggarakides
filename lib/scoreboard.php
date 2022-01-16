<?php
// (A) SCORE CLASS
class Score {
  // (A1) CONSTRUCTOR - CONNECT TO DATABASE
  private $pdo;
  private $stmt;
  public $error;
  function __construct () {
    try {
      $this->pdo = new PDO(
        "mysql:host=localhost" . DB_HOST . ";dbname=moutzouris" . DB_NAME . ";charset=" . DB_CHARSET,
        DB_USER, DB_PASSWORD, [
          PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
          PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]
      );
    } catch (Exception $ex) { exit($ex->getMessage()); }
  }

  // (A2) DESTRUCTOR - CLOSE DATABASE CONNECTION
  function __destruct () {
    $this->pdo = null;
    $this->stmt = null;
  }

  // (A3) ADD SCORE
  function add ($id, $home, $away, $comment=null, $time=null) {
    if ($time==null) { $time = date("Y-m-d H:i:s"); }
    try {
      $this->stmt = $this->pdo->prepare(
        "INSERT INTO `game_score` (`game_id`, `game_time`, `score_home`, `score_away`, `score_comment`) VALUES (?,?,?,?,?)"
      );
      $this->stmt->execute([$id, $time, $home, $away, $comment]);
      return true;
    } catch (Exception $ex) {
      $this->error = $ex->getMessage();
      return false;
    }
  }
  
  // (A4) GET SCORE
  function get ($id) {
    $this->stmt = $this->pdo->prepare(
      "SELECT * FROM `game_score` WHERE `game_id`=? ORDER BY `game_time` DESC"
    );
    $this->stmt->execute([$id]);
    return $this->stmt->fetchAll();
  }
  
  // (A5) CHECK LATEST SCORE UPDATE
  function check ($id) {
    $this->stmt = $this->pdo->prepare(
      "SELECT UNIX_TIMESTAMP(`game_time`) `unix` FROM `game_score` WHERE `game_id`=? ORDER BY `game_time` DESC LIMIT 1"
    );
    $this->stmt->execute([$id]);
    $last = $this->stmt->fetch();
    return is_array($last) ? $last["unix"] : 0 ;
  }
}

// (B) DATABASE SETTINGS - CHANGE THESE TO YOUR OWN!
define("DB_HOST", "localhost");
define("DB_NAME", "test");
define("DB_CHARSET", "utf8");
define("DB_USER", "root");
define("DB_PASSWORD", "");

// (C) CREATE NEW SCORE OBJECT
$_SCORE = new Score();
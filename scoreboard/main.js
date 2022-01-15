var score = {
    last : 0,
    poll : function () {
      // (A) DATA
      var data = new FormData();
      data.append("last", score.last); // Last game updated timestamp
      data.append("gid", 1); // Game ID (fixed to 1 for demo)
  
      // (B) INIT AJAX
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "4c-ajax-score.php");
      xhr.timeout = 30000; // 1000 ms = 1 sec
  
      // (C) KEEP FIRING REQUESTS TO GET UPDATES
      xhr.ontimeout = score.poll;
  
      // (D) UPDATE NEW SCORE DATA
      xhr.onload = function () {
        // (D1) PARSE RESULTS
        let res = JSON.parse(this.response),
            history = document.getElementById("scoreHistory");
            first = true;
        score.last = res.last;
        history.innerHTML = "";
  
        for (let s of res.score) {
          // (D2) UPDATE HTML SCORE BOARD
          if (first) {
            document.getElementById("scoreTime").innerHTML = s["game_time"];
            document.getElementById("scoreHome").innerHTML = s["score_home"];
            document.getElementById("scoreAway").innerHTML = s["score_away"];
            first = false;
          }
          
          // (D3) UPDATE HISTORY
          let hrow = document.createElement("div");
          hrow.innerHTML = `[${s["game_time"]}] ${s["score_home"]}-${s["score_away"]} | ${s["score_comment"]}`;
          history.appendChild(hrow);
        }
        score.poll();
   
      // (E) GO!
      xhr.send(data);
    }
  };
  window.addEventListener("DOMContentLoaded", score.poll);
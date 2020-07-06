const n = prompt("Enter The Number Of Blocks You Can Take:") ;
const rowcol = Math.ceil(Math.sqrt(n)) ;
const rows = Math.floor(n/rowcol) ;
const colors = ["red", "blue", "green", "yellow", "olive", "gray", "cyan", "brown", "gold", "ivory", "khaki", "pink", "purple", "lime", "maroon", "navy"] ;

let gamePattern = [];
let userClickedPattern = [] ;
let gameStarted = false ;
let gameLevel = 0 ;

let html = "" ;

for (let i=0; i<rows; i++) {
  html += "<div class=''>" ;
  for (let j=0; j<rowcol; j++) {
      html += "<div class='block'></div>" ;
  }
  html += "</div>" ;
}

const rem = n % rowcol ;
if (rem != 0) {
  html += "<div class=''>" ;
  for (let i=0; i<rem; i++) {
      html += "<div class='block'></div>" ;
  }
  html += "</div>" ;
}

$("h1").after(html);
$(".block").each(function(ind) {
                                $(this).css("background-color", colors[ind]) ;
                                $(this).attr("name", colors[ind])
                                this.addEventListener("click", function(event) {
                                  userClickedPattern.push($(this).attr("name"));
                                  $(this).toggleClass("pressed") ;
                                  setTimeout(()=>{ $(this).toggleClass("pressed"); }, 100);

                                  if (gameStarted) {
                                    let sound = $(this).attr("name") ;
                                    for (let i=0; i<userClickedPattern.length; i++) {
                                      if (gamePattern[i] != userClickedPattern[i])
                                        sound = "wrong" ;
                                    }
                                    (new Audio("sounds/"+sound+".mp3")).play();
                                     if (sound === "wrong") {
                                       $("h1").text("You Failed...") ;
                                       setTimeout(() => {
                                         $("h1").text("Press A Key To Start");
                                       }, 3000) ;
                                       gameStarted = false ;
                                     } else {
                                       if (userClickedPattern.length == gamePattern.length) {
                                         setTimeout(() => {nextSequence(n)}, 1000) ;
                                       }
                                     }
                                  }
                                })
                              });

function nextSequence(num) {
  let color = colors[Math.floor(num*Math.random())] ;
  gamePattern.push(color);
  $(`div[name="${color}"]`).fadeOut(100).fadeIn(100);
  $("h1").text("Level "+(++gameLevel));
  userClickedPattern = [] ;
}

$(document).keypress(function(event) {
  if (!gameStarted) {
    gameStarted = true ;
    gamePattern = [] ;
    userClickedPattern = [] ;
    gameLevel = 0 ;
    nextSequence(n) ;
    console.log(gamePattern);
  }
})

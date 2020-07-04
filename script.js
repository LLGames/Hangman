//document.getElementById('animate').addEventListener('click', load_wario_state)
let capture
function capture_wario_state() {
    capture = document.getElementById('wario').outerHTML
}
function start_animation(){
    dropBody();
    document.getElementById("rEyes").classList.add("hide");
    document.getElementById("xEyes").classList.remove("hide");
};

function dropBody () {
  Velocity(document.getElementById("door1"),{rotateZ: 90}, 1000);
  Velocity(document.getElementById("door2"),{rotateZ: -90}, 1000);
  fall();  
}


function fall() {
  let dur = 500;
  let del = 1000;
  Velocity(document.getElementById("body"),{translateY: "200px"}, {duration: dur, delay: del});
  Velocity(document.getElementById("rope"),{y2: "+=200px"}, {duration: dur, delay: del});
  Velocity(document.getElementById("armL"),{y2: "-=60px"}, {duration: dur, delay: del});
  Velocity(document.getElementById("armR"),{y2: "-=60px"}, {duration: dur, delay: del});
  
  finish();
}

function finish () {
  Velocity(document.getElementById("armL"),{y2: "+=70px", x2: "+=10px"}, 500);
  Velocity(document.getElementById("armR"),{y2: "+=70px", x2: "-=10px"}, 500);
}
function load_wario_state_if_available() {
  if (capture) {
    load_wario_state()
  }
}
function load_wario_state() {
  document.getElementById('wario').outerHTML = capture
}
var failure = 0 
let body_parts = ["rope", "head", "torso", "armL", "armR", "legL", "legR"] //7 (0-6)
function show_body_part(body_part_id){
  let body_part = document.getElementById(body_part_id)
  body_part.classList.remove('hide')
}
function compute_failure(){
  if (failure === body_parts.length - 1) {
    let key_buttons = document.getElementsByClassName('key-button')
    for (i = 0; i < key_buttons.length; i++){
      key_buttons[i].disabled = true
    }
  
    start_animation()
  }
  else {
    failure = failure + 1
    show_body_part(body_parts[failure])
  }
}
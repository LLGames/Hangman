let answer_data
let botaoGerar = document.getElementById("generate")
function onButtonClick(){
  load_wario_state_if_available()
  capture_wario_state()
  answer_data = store_picks().toLowerCase()
  let size = answer_data.length
  put_underscores(size)
  set_keyboard_charset(charset, keyboard)
  failure = 0
}
botaoGerar.addEventListener("click",onButtonClick)
let answer_view = document.getElementById("secret-word")
function put_underscores(size) {
  while (answer_view.hasChildNodes()) {
      answer_view.removeChild(answer_view.firstChild)
  }
  for (i = 0; i < size; i = i + 1){
    let underscore = document.createElement("i")
    let saida = "_ " 
    underscore.textContent = saida
    answer_view.appendChild(underscore)
  } 
}
function getOccurrenceOf(answer_letters,letter){
  let idx_set = []
  for (i = 0; i < answer_letters.length; i = i + 1) {
    let present_letter = answer_letters[i]
      if (present_letter === letter){
        idx_set.push(i)
      }
  }
  if (idx_set.length === 0){
    compute_failure()
  }
  return idx_set
}
function check_correct_letter(letter) {
  console.log(letter)
  let answer_letters = Array.from(answer_data)
  let letter_positions = getOccurrenceOf(answer_letters,letter)
  for (i = 0; i < letter_positions.length; i = i + 1) {
    let idx = letter_positions[i]
    let letter_tag = answer_view.children[idx]
    letter_tag.textContent = letter + " "
  }
}

document.addEventListener("keydown",(event) => {
  let letter = event.key.toLowerCase()
  document.getElementById(letter).disabled = true
  check_correct_letter(letter)
})
function buttonFactory(letter) {
  let button = document.getElementById(letter)
  function pressButton(){
    button.disabled = true
    check_correct_letter(letter)
  }
  button.addEventListener("click",pressButton)
}

let charset = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя".split('')//["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m"]
/*for (char_ of charset) {
  buttonFactory(char_);
}*/
let keyboard = document.getElementById("keyboard")
set_keyboard_charset(charset, keyboard)


function set_keyboard_charset(charset,parent) {
  while (parent.hasChildNodes()) {
      parent.removeChild(parent.firstChild)
  }
  for (char_ of charset){
    let key = document.createElement("button")
    key.classList.add('key-button')
    key.id = char_
    key.textContent = char_.toUpperCase()
    
    parent.appendChild(key)
    buttonFactory(char_)
  }
}

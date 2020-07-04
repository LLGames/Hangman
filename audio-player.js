class PlayButtonView {
    pauseIcon = document.createElement('img')
    playIcon = document.createElement('img')
    parent
    constructor(parent_id,{playing,paused, def}) {
        this.parent = document.getElementById(parent_id)
        
        this.playIcon.src = playing
        this.playIcon.height = 32;
        this.playIcon.width = 32;
        this.pauseIcon.src = paused
        this.pauseIcon.height = 32;
        this.pauseIcon.width = 32;

        if(def === "playing") {
            this.parent.appendChild(this.pauseIcon)
        }
        else {
            this.parent.appendChild(this.playIcon)
        }
    }
    turnOff(){
        this.parent.replaceChild(this.playIcon,this.pauseIcon)
    }
    turnOn(){
        this.parent.replaceChild(this.pauseIcon,this.playIcon)
    }
}

class PlayerComponentView {
    parent
    playButton
    volumeSlider
    controller

    createSlider(initial_value) {
        let slider = document.createElement('input')
        slider.min = 0
        slider.max = 1
        slider.step = 0.1
        slider.value = initial_value
        slider.type = "range"
        return slider
    }

    constructor(parent_id, {initial_value, on_img, off_img}) {
        this.parent = document.getElementById(parent_id)
        this.playButton = new PlayButtonView(parent_id,{playing:on_img,paused:off_img,def:"playing"})
        if (initial_value) {
            this.volumeSlider = this.createSlider(initial_value)
        }
        else {
            this.volumeSlider = this.createSlider(0.0)
        }
        this.parent.appendChild(this.volumeSlider)
    }

}
class PlayerFactory {
    createDefaultPlayer() {
        let model = new Player(0.6)
        let view = new PlayerComponentView("player",{initial_value:0.6,on_img:"http://simpleicon.com/wp-content/uploads/play1.png", off_img:"http://simpleicon.com/wp-content/uploads/pause.png"})
        let controller = new PlayerController("https://upload.wikimedia.org/wikipedia/commons/8/80/Belford%27s_Carnival.ogg", model, view)
        return controller
    }
}

class PlayerController {
    model
    view
    soundTrack = document.createElement('audio')
    constructor(music_src, model, view) {
        this.model = model
        this.view = view
        console.log(this.view.playButton.playIcon.src)
        this.view.playButton.playIcon.addEventListener('click',()=>this.playMusic())
        this.view.playButton.pauseIcon.addEventListener('click',()=>this.stopMusic())
        this.view.volumeSlider.addEventListener('input',(ev)=>this.setVolume(ev.target.value))
        this.soundTrack.autoplay = true
        this.soundTrack.controls = false
        this.soundTrack.loop = true
        this.soundTrack.src = music_src
        document.body.appendChild(this.soundTrack)
    }
    stopMusic() {
        console.log("stop")
        this.model.stop()
        this.view.playButton.turnOff()
        this.soundTrack.pause()
    }
    playMusic() {
        console.log("play")
        this.model.start()
        this.view.playButton.turnOn()
        this.soundTrack.play()
    }

    setVolume(value) {
        this.model.set_volume(value)
        this.soundTrack.volume = value
    }
}

class Player{
  volume
  stopped = false

  constructor({initial_value}) {
      this.volume = initial_value | 0.0
  }
  stop(){
    this.stopped = true
  }
  start(){
    this.stopped = false
  }
  mute(){
    this.set_volume = 0
  }
  set_volume(vol){
    this.volume = vol
  }
}

let player = (new PlayerFactory()).createDefaultPlayer()
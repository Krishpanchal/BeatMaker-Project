class DrumKit {
    constructor(){
        this.pads = document.querySelectorAll('.pad');
        this.playBtn = document.querySelector(".play");
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.currentKick = "./sounds/kick-classic.wav";
        this.currentSnare = "./sounds/snare-acoustic01.wav";
        this.currentHihat = "./sounds/hihat-acoustic01.wav";
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null;
        this.selects = document.querySelectorAll("select");
        this.muteAudio = document.querySelectorAll(".mute");
        this.tempoSlider = document.querySelector(".tempo-slider");
    }

    activePad(){
        this.classList.toggle("active");
    }

    repeat(){
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        activeBars.forEach( bar => {
            bar.style.animation = "playTract 0.3s alternate ease 2";

            if(bar.classList.contains("active")){
                if(bar.classList.contains("kick-pad")){
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if(bar.classList.contains("snare-pad")){
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if(bar.classList.contains("hihat-pad")){
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        })
        this.index++;
    }

    start(){
        const interval = (60/this.bpm) * 1000;

        if(this.isPlaying){
            clearInterval(this.isPlaying);
            this.isPlaying = null  
        }else {
            this.isPlaying= setInterval(() =>{
                this.repeat();
            },interval); 
        }
    }

    updateBtn(){
        if(this.isPlaying){
            this.playBtn.innerText = "Stop";
            this.playBtn.classList.add("active");              
        }else{
            this.playBtn.innerText = "Play";
            this.playBtn.classList.remove("active");
        }
    }

    change(e){
        const selectName = e.target.name;
        const selectValue = e.target.value;

        switch(selectName){

            case "kick-select":
                this.kickAudio.src = selectValue;
                break;
            
            case "snare-select":
                this.snareAudio.src = selectValue;
                break;

            case "hihat-select":
                this.hihatAudio.src = selectValue;
                break;
        }
    }

    mute(e){
        const muteIndex = e.target.getAttribute("data-track");
        e.target.classList.toggle("active");

        if(e.target.classList.contains("active")){
            switch(Number(muteIndex)){
                case 0:
                    this.kickAudio.volume = 0;
                    break;
                case 1:
                    this.snareAudio.volume = 0;
                    break;
                case 2:
                    this.hihatAudio.volume = 0;
                    break;
            }
        }else {
            switch(Number(muteIndex)){
                case 0:
                    this.kickAudio.volume = 1;
                    break;
                case 1:
                    this.snareAudio.volume = 1;
                    break;
                case 2:
                    this.hihatAudio.volume = 1;
                    break;        
            }
        }
    }

    tempoChange(e){
        const tempoNr = document.querySelector(".tempo-nr");
        this.bpm = e.target.value;
        tempoNr.innerText = e.target.value;
    }   

    updateTempo(e){
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        const playBtn = document.querySelector(".play");
        if(playBtn.classList.contains("active")){
            this.start();
        };

    }
}

const drumkit = new DrumKit();

//Event Listeners

drumkit.pads.forEach( pad => {
    pad.addEventListener('click' , drumkit.activePad);
    pad.addEventListener('animationend' , function(){
        this.style.animation = "";
    });
}); 

drumkit.playBtn.addEventListener('click' , () => {
    drumkit.start();
    drumkit.updateBtn();
});

drumkit.selects.forEach(select => {
    select.addEventListener('change', function(e){
        drumkit.change(e);
    });
});


drumkit.muteAudio.forEach(audioMute => {
    audioMute.addEventListener('click', function(e){
        drumkit.mute(e);
    });
});

drumkit.tempoSlider.addEventListener("input" , function(e){
    drumkit.tempoChange(e);
});

drumkit.tempoSlider.addEventListener("change" , function(e){
    drumkit.updateTempo(e);
});




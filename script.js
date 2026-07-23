const intro = document.getElementById("intro");
const scene = document.getElementById("scene");
const envelope = document.getElementById("envelope");
const typedText = document.getElementById("typedText");

const end = document.querySelector(".end");

const continueScreen = document.getElementById("continue");

const music = document.getElementById("music");
const paperSound = document.getElementById("paperSound");

const lines = [
    "Lo que estoy preparando",
    "no se guarda en un cajón.",
    "",
    "Lo mejor de este",
    "",
    "✨ REGALO ✨",
    "",
    "no será abrirlo...",
    "",
    "Será vivirlo.",
    "",
    "❤️"
];

window.onload = () => {

    setTimeout(()=>{

        intro.style.display="none";

        scene.classList.remove("hidden");

    },4000);

};

let opened=false;

envelope.addEventListener("click",()=>{

    if(opened) return;

    opened=true;

    envelope.classList.add("open");
    
    document.querySelector(".click").style.display="none";

    paperSound.play();

    music.volume=0.25;
    music.play().catch(()=>{});

    setTimeout(typeWriter,1800);

});

let i=0;

let currentLine = 0;

function typeWriter(){

    writeLine(lines[currentLine], 0);

}

function writeLine(text, index){

    if(index === 0){

        typedText.innerHTML += "<div class='line'></div>";

    }

    const current = typedText.lastElementChild;

    if(index < text.length){

        current.innerHTML += text.charAt(index);

        index++;

        setTimeout(()=>{

            writeLine(text,index);

        },40);

    }else{

        currentLine++;

        const body = document.querySelector(".paper-body");

        setTimeout(()=>{

            body.scrollTo({

                top: body.scrollTop + 55,

                behavior:"smooth"

            });

        },350);

        if(currentLine < lines.length){

            setTimeout(typeWriter,700);

        }else{

            setTimeout(()=>{

                end.classList.add("show");

            },1200);

            setTimeout(()=>{

                scene.classList.add("fade-out");

                setTimeout(()=>{

                    scene.style.display="none";

                    continueScreen.classList.remove("hidden");

                    continueScreen.classList.add("show");

                },2200);

            },7000);

        }

    }

}
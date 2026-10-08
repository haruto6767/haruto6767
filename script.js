/* =========================================
   MAIN MENU
========================================= */


/* =========================================
   START GAME
========================================= */

function startGame(){

    window.location.href =
        "login.html";

}


/* =========================================
   CONTINUE
========================================= */

function continueGame(){

    const saveData =
        localStorage.getItem("saveData");

    if(!saveData){

        alert(
            "No Save Data Found."
        );

        return;
    }

    try{

        const save =
            JSON.parse(saveData);

        if(!save.chapter){

            alert(
                "Save Data is invalid."
            );

            return;
        }

        window.location.href =
            "chapter/" +
            save.chapter;

    }
    catch(error){

        console.error(error);

        alert(
            "Save Data is corrupted."
        );

    }

}


/* =========================================
   LEVEL SELECT
========================================= */

function chapterSelect(){

    window.location.href =
        "login.html";

}


/* =========================================
   SETTINGS
========================================= */

function settings(){

    const popup =
        document.getElementById(
            "settingsPopup"
        );

    if(popup){

        popup.style.display =
            "block";

    }

}


/* =========================================
   CLOSE SETTINGS
========================================= */

function closeSettings(){

    const popup =
        document.getElementById(
            "settingsPopup"
        );

    if(popup){

        popup.style.display =
            "none";

    }

}


/* =========================================
   EXIT
========================================= */

function exitGame(){

    window.close();

}


/* =========================================
   MENU BGM
========================================= */

const menuBgm =
    new Audio(
        "assets/audio/schoolday.mp3"
    );

menuBgm.loop = true;


/* =========================================
   BGM SETTINGS
========================================= */

let bgmEnabled =
    localStorage.getItem(
        "bgmEnabled"
    );

if(bgmEnabled === null){

    bgmEnabled = "true";

    localStorage.setItem(
        "bgmEnabled",
        "true"
    );

}


/* =========================================
   BGM VOLUME
========================================= */

let savedVolume =
    localStorage.getItem(
        "bgmVolume"
    );

if(savedVolume === null){

    savedVolume = "0.5";

    localStorage.setItem(
        "bgmVolume",
        "0.5"
    );

}

menuBgm.volume =
    parseFloat(savedVolume);


/* =========================================
   BGM ICON
========================================= */

const bgmIcon =
    document.getElementById(
        "bgmIcon"
    );


function updateBgmIcon(){

    if(!bgmIcon){
        return;
    }

    if(bgmEnabled === "true"){

        bgmIcon.innerText = "🔊";

        bgmIcon.title =
            "BGM ON - Click to turn off";

    }
    else{

        bgmIcon.innerText = "🔇";

        bgmIcon.title =
            "BGM OFF - Click to turn on";

    }

}


/* =========================================
   TOGGLE BGM
========================================= */

if(bgmIcon){

    updateBgmIcon();

    bgmIcon.addEventListener(
        "click",
        function(){

            if(bgmEnabled === "true"){

                /* TURN OFF */

                bgmEnabled = "false";

                menuBgm.pause();

            }
            else{

                /* TURN ON */

                bgmEnabled = "true";

                menuBgm.play()
                    .catch(
                        error =>
                            console.log(error)
                    );

            }


            localStorage.setItem(
                "bgmEnabled",
                bgmEnabled
            );


            updateBgmIcon();

        }
    );

}


/* =========================================
   VOLUME SLIDER
========================================= */

const slider =
    document.getElementById(
        "volumeSlider"
    );


if(slider){

    slider.value =
        menuBgm.volume;


    slider.addEventListener(
        "input",
        function(){

            const volume =
                parseFloat(
                    slider.value
                );


            localStorage.setItem(
                "bgmVolume",
                volume
            );


            menuBgm.volume =
                volume;


            /*
             * If volume becomes 0,
             * keep BGM enabled but
             * there will be no audible sound.
             */

        }
    );

}


/* =========================================
   START MENU BGM
========================================= */

document.addEventListener(
    "click",
    function(){

        if(
            bgmEnabled === "true"
        ){

            menuBgm.play()
                .catch(
                    error =>
                        console.log(error)
                );

        }

    },
    {
        once: true
    }
);
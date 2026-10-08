/* =========================================
   LOGIN / PLAYER NAME
========================================= */

const playerNameInput =
    document.getElementById("playerName");

const errorMessage =
    document.getElementById("errorMessage");

const levelPanel =
    document.getElementById("levelPanel");


/* =========================================
   LOAD SAVED NAME
========================================= */

const savedName =
    localStorage.getItem("playerName");

if(savedName){

    playerNameInput.value =
        savedName;

}


/* =========================================
   GET PLAYER NAME
========================================= */

function getPlayerName(){

    const name =
        playerNameInput.value.trim();


    if(name === ""){

        errorMessage.textContent =
            "Please enter your name.";

        playerNameInput.focus();

        return null;
    }


    if(name.length < 2){

        errorMessage.textContent =
            "Name must be at least 2 characters.";

        playerNameInput.focus();

        return null;
    }


    /* Save player name */

    localStorage.setItem(
        "playerName",
        name
    );


    errorMessage.textContent = "";

    return name;
}


/* =========================================
   CONTINUE
========================================= */

document
    .getElementById("continueButton")
    .addEventListener("click", function(){

        const name =
            getPlayerName();


        if(!name){
            return;
        }


        /*
            Airin is still the internal MC.

            Example:

            Internal character:
            Airin

            Player name:
            Haru

            The game will display:
            Haru

            but still use:
            airin.png
            airin_talk.png
        */


        window.location.href =
            "intro.html";

    });


/* =========================================
   LEVEL SELECT
========================================= */

document
    .getElementById("levelButton")
    .addEventListener("click", function(){

        const name =
            getPlayerName();


        if(!name){
            return;
        }


        levelPanel.classList.toggle("show");

    });


/* =========================================
   LEVEL BUTTONS
========================================= */

const levelButtons =
    document.querySelectorAll(
        "[data-level]"
    );


levelButtons.forEach(function(button){

    button.addEventListener(
        "click",
        function(){

            const name =
                getPlayerName();


            if(!name){
                return;
            }


            const level =
                button.dataset.level;


            /* -------------------------
               CHAPTER 1
            ------------------------- */

            if(level === "chapter1.html"){

                window.location.href =
                    "chapter/chapter1.html?new=1";

                return;
            }


            /* -------------------------
               CHAPTER 2
            ------------------------- */

            if(level === "chapter2.html"){

                const unlocked =
                    localStorage.getItem(
                        "chapter2Unlocked"
                    );


                if(unlocked !== "true"){

                    alert(
                        "Level 2 is locked.\n\nComplete Level 1 with at least 40 marks."
                    );

                    return;
                }

            }


            /* -------------------------
               CHAPTER 3
            ------------------------- */

            if(level === "chapter3.html"){

                const unlocked =
                    localStorage.getItem(
                        "chapter3Unlocked"
                    );


                if(unlocked !== "true"){

                    alert(
                        "Level 3 is locked.\n\nComplete Level 2 with at least 40 marks."
                    );

                    return;
                }

            }


            /* -------------------------
               EPILOGUE
            ------------------------- */

            if(level === "epilogue.html"){

                const unlocked =
                    localStorage.getItem(
                        "epilogueUnlocked"
                    );


                if(unlocked !== "true"){

                    alert(
                        "The Epilogue is locked.\n\nComplete all three level."
                    );

                    return;
                }

            }


            window.location.href =
                "chapter/" +
                level +
                "?new=1";

        }
    );

});


/* =========================================
   BACK
========================================= */

document
    .getElementById("backButton")
    .addEventListener("click", function(){

        window.location.href =
            "index.html";

    });


/* =========================================
   ENTER KEY
========================================= */

playerNameInput.addEventListener(
    "keydown",
    function(event){

        if(event.key === "Enter"){

            document
                .getElementById("continueButton")
                .click();

        }

    }
);
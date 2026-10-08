const playerName =
    localStorage.getItem(
        "playerName"
    );


const welcomeText =
    document.getElementById(
        "welcomeText"
    );


if (playerName) {

    welcomeText.innerText =
        "Welcome, " +
        playerName +
        "!";

}


/* =========================
   CHECK UNLOCKS
========================= */

const chapter2 =
    document.getElementById(
        "chapter2"
    );


const chapter3 =
    document.getElementById(
        "chapter3"
    );


if (
    localStorage.getItem(
        "chapter2Unlocked"
    ) === "true"
) {

    chapter2.classList.remove(
        "locked"
    );

}


if (
    localStorage.getItem(
        "chapter3Unlocked"
    ) === "true"
) {

    chapter3.classList.remove(
        "locked"
    );

}


/* =========================
   START CHAPTER
========================= */

function startChapter(chapter) {

    if (chapter === 1) {

        localStorage.setItem(
            "currentChapter",
            "1"
        );

        window.location.href =
            "chapter/chapter1.html";

        return;
    }


    if (chapter === 2) {

        if (
            localStorage.getItem(
                "chapter2Unlocked"
            ) !== "true"
        ) {

            alert(
                "Chapter 2 is locked."
            );

            return;

        }


        localStorage.setItem(
            "currentChapter",
            "2"
        );


        window.location.href =
            "chapter/chapter2.html";

        return;

    }


    if (chapter === 3) {

        if (
            localStorage.getItem(
                "chapter3Unlocked"
            ) !== "true"
        ) {

            alert(
                "Chapter 3 is locked."
            );

            return;

        }


        localStorage.setItem(
            "currentChapter",
            "3"
        );


        window.location.href =
            "chapter/chapter3.html";

    }

}


/* =========================
   CONTINUE
========================= */

function continueChapter() {

    const save =
        localStorage.getItem(
            "saveChapter"
        );


    if (!save) {

        startChapter(1);

        return;

    }


    window.location.href =
        "chapter/" + save;

}


/* =========================
   BACK
========================= */

function goBack() {

    window.location.href =
        "index.html";

}
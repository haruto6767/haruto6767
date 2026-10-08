// ==========================================
// THE LOGIC OF NUMBERS
// INTRO / PROLOGUE
// ==========================================

let current = 0;
let typing = false;
let typingTimer = null;
let currentText = "";

const TYPE_SPEED = 40;

const playerName = localStorage.getItem("playerName") || "Player";

// ---------- DOM ----------
const background = document.getElementById("background");
const leftSprite = document.getElementById("leftSprite");
const speakerName = document.getElementById("speakerName");
const dialogueText = document.getElementById("dialogueText");
const nextButton = document.getElementById("nextButton");

const menuButton = document.getElementById("menuButton");
const gameMenu = document.getElementById("gameMenu");
const saveButton = document.getElementById("saveButton");
const bgmButton = document.getElementById("bgmButton");
const bgmVolume = document.getElementById("bgmVolume");
const closeMenuButton = document.getElementById("closeMenuButton");
const mainMenuButton = document.getElementById("mainMenuButton");

const introEndScreen = document.getElementById("introEndScreen");
const startChapterButton = document.getElementById("startChapterButton");
const introExitButton = document.getElementById("introExitButton");

// ---------- BGM ----------
const bgm = new Audio("assets/audio/metaverse.mp3");
bgm.loop = true;

let bgmEnabled = localStorage.getItem("bgmEnabled");

if (bgmEnabled === null) {
    bgmEnabled = "true";
    localStorage.setItem("bgmEnabled", "true");
}

const savedVolume = localStorage.getItem("bgmVolume");

bgm.volume = savedVolume !== null
    ? parseFloat(savedVolume)
    : 0.5;

if (bgmVolume) {
    bgmVolume.value = bgm.volume;
}

// ---------- STORY ----------
const story = [

    // ==========================
    // CLASSROOM
    // ==========================

    {
        speaker: "Sir",
        text: "Good morning, everyone. Today, we are going to start our lesson on Discrete Structure.",
        bg: "assets/bg/classroom.jpg",
         character: "assets/characters/sir.png"
    },

    {
        speaker: "Sir",
        text: "Discrete Structure is not just about memorizing formulas. It is about understanding how things are connected through logic, relationships, and structures.",
        bg: "assets/bg/classroom.jpg",
         character: "assets/characters/sir.png"
    },

    {
        speaker: "Sir",
        text: "You will encounter concepts such as logic, relations, functions, graphs, and trees throughout your studies.",
        bg: "assets/bg/classroom.jpg",
         character: "assets/characters/sir.png"
    },

    {
        speaker: "Airin",
        text: "Another Discrete Structure lecture...",
        bg: "assets/bg/classroom.jpg",
        character: "assets/characters/airin_talk.png"
    },

    {
        speaker: "Airin",
        text: "Why does everything have to be so complicated?",
        bg: "assets/bg/classroom.jpg",
        character: "assets/characters/airin_talk.png"
    },

    {
        speaker: "Zulkifli",
        text: "You should at least pay attention. You might need this stuff later.",
        bg: "assets/bg/classroom.jpg",
        character: "assets/characters/zulkifli_talk.png"
    },

    {
        speaker: "Airin",
        text: "Easy for you to say. My brain stopped working ten minutes ago.",
        bg: "assets/bg/classroom.jpg",
        character: "assets/characters/airin_talk.png"
    },

    {
        speaker: "Sir",
        text: "That will be all for today. You may continue your work in the computer laboratory.",
        bg: "assets/bg/classroom.jpg",
         character: "assets/characters/sir.png"
    },

    // ==========================
    // LAB
    // ==========================

    {
        speaker: "Zulkifli",
        text: "Come on, let's go to the lab.",
        bg: "assets/bg/lab.jpg",
        character: "assets/characters/zulkifli_talk.png"
    },

    {
        speaker: "Airin",
        text: "Finally. Maybe I can actually wake up there.",
        bg: "assets/bg/lab.jpg",
        character: "assets/characters/airin_talk.png"
    },

    {
        speaker: "Zulkifli",
        text: "Wait... what's that?",
        bg: "assets/bg/lab.jpg",
        character: "assets/characters/zulkifli_talk.png"
    },

    {
        speaker: "Airin",
        text: "Is that a phone?",
        bg: "assets/bg/lab.jpg",
        character: "assets/characters/airin_talk.png"
    },

    {
        speaker: "Zulkifli",
        text: "It wasn't here earlier.",
        bg: "assets/bg/lab.jpg",
        character: "assets/characters/zulkifli_talk.png"
    },

    {
        speaker: "Airin",
        text: "There's an application on it. 'The Logic of Numbers'...",
        bg: "assets/bg/lab.jpg",
        character: "assets/characters/airin_talk.png"
    },

    {
        speaker: "Zulkifli",
        text: "Don't open it.",
        bg: "assets/bg/lab.jpg",
        character: "assets/characters/zulkifli_talk.png"
    },

    {
        speaker: "Airin",
        text: "Why not?",
        bg: "assets/bg/lab.jpg",
        character: "assets/characters/airin_talk.png"
    },

    {
        speaker: "Zulkifli",
        text: "Because strange things don't just appear on this phone for no reason.",
        bg: "assets/bg/lab.jpg",
        character: "assets/characters/zulkifli_talk.png"
    },

    {
        speaker: "Airin",
        text: "You're being paranoid.",
        bg: "assets/bg/lab.jpg",
        character: "assets/characters/airin_talk.png"
    },

    {
        speaker: "Airin",
        text: "I'll just delete it.",
        bg: "assets/bg/lab.jpg",
        character: "assets/characters/airin_talk.png"
    },

    {
        speaker: "System",
        text: "WARNING. Unauthorized interaction detected.",
        bg: "assets/bg/lab.jpg",
        character: "assets/characters/system.png"
    },

    {
        speaker: "System",
        text: "Initiating transfer...",
        bg: "assets/bg/lab.jpg",
        character: "assets/characters/system.png"
    },

    // ==========================
    // METAVERSE
    // ==========================

    {
        speaker: "Airin",
        text: "WHAT?!",
        bg: "assets/bg/metaverse.jpg",
        character: "assets/characters/airin_talk.png"
    },

    {
        speaker: "Airin",
        text: "Where are we?!",
        bg: "assets/bg/metaverse.jpg",
        character: "assets/characters/airin_talk.png"
    },

    {
        speaker: "Zulkifli",
        text: "I... have no idea.",
        bg: "assets/bg/metaverse.jpg",
        character: "assets/characters/zulkifli_talk.png"
    },

    {
        speaker: "System",
        text: "Welcome to the Logic Dimension.",
        bg: "assets/bg/metaverse.jpg",
        character: "assets/characters/system_talk.png"
    },

    {
        speaker: "System",
        text: "Your physical bodies remain in the real world. Your consciousness has been transferred into this environment.",
        bg: "assets/bg/metaverse.jpg",
        character: "assets/characters/system_talk.png"
    },

    {
        speaker: "Airin",
        text: "You're saying we're trapped here?",
        bg: "assets/bg/metaverse.jpg",
        character: "assets/characters/airin_talk.png"
    },

    {
        speaker: "System",
        text: "Correct.",
        bg: "assets/bg/metaverse.jpg",
        character: "assets/characters/system_talk.png"
    },

    {
        speaker: "Zulkifli",
        text: "How do we get out?",
        bg: "assets/bg/metaverse.jpg",
        character: "assets/characters/zulkifli_talk.png"
    },

    {
        speaker: "System",
        text: "There are three gates blocking your return.",
        bg: "assets/bg/metaverse.jpg",
        character: "assets/characters/system_talk.png"
    },

    {
        speaker: "System",
        text: "Gate One: Logic. Gate Two: Relations. Gate Three: Trees.",
        bg: "assets/bg/metaverse.jpg",
        character: "assets/characters/system_talk.png"
    },

    {
        speaker: "System",
        text: "Each gate contains a series of challenges based on Discrete Structure.",
        bg: "assets/bg/metaverse.jpg",
        character: "assets/characters/system_talk.png"
    },

    {
        speaker: "Airin",
        text: "So we have to study to escape?",
        bg: "assets/bg/metaverse.jpg",
        character: "assets/characters/airin_talk.png"
    },

    {
        speaker: "System",
        text: "Precisely.",
        bg: "assets/bg/metaverse.jpg",
        character: "assets/characters/system_talk.png"
    },

    {
        speaker: "Zulkifli",
        text: "Then let's get started.",
        bg: "assets/bg/metaverse.jpg",
        character: "assets/characters/zulkifli_talk.png"
    },

    {
        speaker: "Airin",
        text: "Fine. Let's get out of here.",
        bg: "assets/bg/metaverse.jpg",
        character: "assets/characters/airin_talk.png"
    },

    {
        speaker: "System",
        text: "Your first destination is the Gate of Truth.",
        bg: "assets/bg/metaverse.jpg",
        character: "assets/characters/system_talk.png"
    },

    {
        speaker: "System",
        text: "Prepare yourself for Level One: Logic.",
        bg: "assets/bg/metaverse.jpg",
        character: "assets/characters/system.png"
    }
];

// ---------- TYPEWRITER ----------
function typeDialogue(text) {

    clearInterval(typingTimer);

    currentText = text;
    dialogueText.textContent = "";

    typing = true;

    let index = 0;

    typingTimer = setInterval(function () {

        dialogueText.textContent += currentText[index];

        index++;

        if (index >= currentText.length) {

            clearInterval(typingTimer);

            typingTimer = null;
            typing = false;
        }

    }, TYPE_SPEED);
}

function finishTyping() {

    if (!typing) return;

    clearInterval(typingTimer);

    typingTimer = null;

    dialogueText.textContent = currentText;

    typing = false;
}

// ---------- SHOW SCENE ----------
function showScene() {

    if (current >= story.length) {

        finishIntro();

        return;
    }

    const scene = story[current];

    speakerName.textContent =
        scene.speaker === "Airin"
            ? playerName
            : scene.speaker;

    let text = scene.text;

    text = text.replaceAll("{player}", playerName);
    text = text.replaceAll("Airin", playerName);

    typeDialogue(text);

    // Background
    if (scene.bg) {
        background.style.backgroundImage =
            `url("${scene.bg}")`;
    }

    // Character
    if (scene.character) {

        leftSprite.src = scene.character;
        leftSprite.style.display = "block";

    } else {

        leftSprite.src = "";
        leftSprite.style.display = "none";
    }

    nextButton.style.display = "block";
}

// ---------- NEXT ----------
nextButton.addEventListener("click", function () {

    // If text is still typing,
    // finish the current sentence first.
    if (typing) {

        finishTyping();

        return;
    }

    current++;

    if (current >= story.length) {

        finishIntro();

        return;
    }

    showScene();
});

// ---------- FINISH INTRO ----------
function finishIntro() {

    nextButton.style.display = "none";

    saveProgress();

    if (introEndScreen) {
        introEndScreen.style.display = "flex";
    }
}

// ---------- SAVE ----------
function saveProgress() {

    const saveData = {

        chapter: "intro.html",
        playerName: playerName,
        score: 0,
        timestamp: new Date().toISOString()

    };

    localStorage.setItem(
        "saveData",
        JSON.stringify(saveData)
    );
}

// ---------- MENU ----------
menuButton.addEventListener("click", function () {

    finishTyping();

    gameMenu.classList.remove("hidden");

});

closeMenuButton.addEventListener("click", function () {

    gameMenu.classList.add("hidden");

});

// ---------- BGM ----------
function updateBGMButton() {

    if (bgmEnabled === "true") {

        bgmButton.textContent = "BGM: ON";

    } else {

        bgmButton.textContent = "BGM: OFF";

    }
}

function playBGM() {

    if (bgmEnabled !== "true") return;

    bgm.play().catch(function () {
        // Browser/Electron autoplay protection
    });
}

bgmButton.addEventListener("click", function () {

    bgmEnabled =
        bgmEnabled === "true"
            ? "false"
            : "true";

    localStorage.setItem(
        "bgmEnabled",
        bgmEnabled
    );

    updateBGMButton();

    if (bgmEnabled === "true") {

        playBGM();

    } else {

        bgm.pause();
    }
});

bgmVolume.addEventListener("input", function () {

    const volume =
        parseFloat(bgmVolume.value);

    bgm.volume = volume;

    localStorage.setItem(
        "bgmVolume",
        volume
    );
});

saveButton.addEventListener("click", function () {

    saveProgress();

    alert("Progress saved.");

});

// ---------- NAVIGATION ----------
mainMenuButton.addEventListener("click", function () {

    window.location.href = "index.html";

});

if (startChapterButton) {

    startChapterButton.addEventListener("click", function () {

        localStorage.setItem(
            "saveData",
            JSON.stringify({
                chapter: "chapter1.html",
                playerName: playerName,
                score: 0,
                timestamp: new Date().toISOString()
            })
        );

        window.location.href =
            "chapter/chapter1.html?new=1";

    });

}

if (introExitButton) {

    introExitButton.addEventListener("click", function () {

        window.location.href = "index.html";

    });

}

// ---------- START BGM ----------
document.addEventListener("click", function () {

    playBGM();

}, { once: true });

// ---------- INITIALIZE ----------
updateBGMButton();

showScene();
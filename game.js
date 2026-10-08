let current = 0;

const speakerName =
document.getElementById("speakerName");

const dialogueText =
document.getElementById("dialogueText");

const background =
document.getElementById("background");

const leftSprite =
document.getElementById("leftSprite");

const rightSprite =
document.getElementById("rightSprite");

function showScene()
{
    let scene = story[current];

    speakerName.textContent =
        scene.speaker;

    dialogueText.textContent =
        scene.text;

    background.style.backgroundImage =
        `url(${scene.bg})`;

    leftSprite.src = scene.left;
    rightSprite.src = scene.right;
}

showScene();

document.getElementById("nextBtn")
.addEventListener("click", () =>
{
    current++;

    if(current >= story.length)
    {
        alert("Chapter 1 Coming Soon!");
        return;
    }

    showScene();
});
const slider =
document.getElementById(
"volumeSlider"
);

slider.value =
localStorage.getItem(
"bgmVolume"
) || 0.5;

slider.addEventListener(
"input",
()=>{

localStorage.setItem(
"bgmVolume",
slider.value
);

const toggle =
document.getElementById("bgmToggle");

let enabled =
localStorage.getItem("bgmEnabled");

if(enabled === null){
    enabled = "true";
}

toggle.innerText =
enabled === "true"
?
"BGM ON"
:
"BGM OFF";

toggle.onclick = ()=>{

    enabled =
    enabled === "true"
    ?
    "false"
    :
    "true";

    localStorage.setItem(
    "bgmEnabled",
    enabled
    );

    toggle.innerText =
    enabled === "true"
    ?
    "BGM ON"
    :
    "BGM OFF";
};

function goBack(){
    window.location.href = "index.html";
}

});
// Script for neon line decoration in the line
const neonParentEl = document.getElementById('neonline');
const allNeon = neonParentEl.children;
const activeArea = document.getElementsByTagName('main')[0];

let counter = 0;
let activeNeonId = 0;
let prevNeonId = 1;

const emptySrc = `https://i.ibb.co/vxhNQ2F/traingle-empty.png`;
const fillSrc = "https://i.ibb.co/r56WC92/traingle-fill.png";

activeArea.addEventListener('mousemove',updateSign);

function updateSign(){
    counter += 1;
    // Reset the counter
    if(counter > 5){
        counter = 0;
        updateNeon();
    };
}

function updateNeon(){

    allNeon[prevNeonId].src = emptySrc;
    allNeon[activeNeonId].src = fillSrc;
    prevNeonId = activeNeonId;
    activeNeonId -= 1;
    if(activeNeonId< 0){
        activeNeonId = allNeon.length-2;
    }

}

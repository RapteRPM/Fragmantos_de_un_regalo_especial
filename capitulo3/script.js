const intro = document.getElementById('intro');
const cardScene = document.getElementById('cardScene');
const phraseScene = document.getElementById('phraseScene');
const suitcaseScene = document.getElementById('suitcaseScene');
const destinationScene = document.getElementById('destinationScene');
const finalScene = document.getElementById('finalScene');
const music = document.getElementById('music');
const startButton = document.getElementById('startAdventure');
const wordLines = document.querySelectorAll('.word-line');
const wordLinesContainer = document.querySelector('.word-lines');
const phraseLines = document.querySelectorAll('.phrase-line');
const storyCard = document.querySelector('.story-card');
const suitcaseWrap = document.querySelector('.suitcase-wrap');
const destinationCard = document.querySelector('.destination-card');
const destinationItems = document.querySelectorAll('.destination-card .fade-item');
const finalReveal = document.querySelectorAll('.final-reveal');

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function playMusicOnInteraction() {
    const startAudio = () => {
        music.play().catch(() => {});
        document.body.removeEventListener('pointerdown', startAudio);
    };
    document.body.addEventListener('pointerdown', startAudio, { once: true });
}

async function showScene(scene) {
    const active = document.querySelector('.scene.active');
    if (active) {
        active.classList.add('fade-out');
        await delay(900);
        active.classList.remove('active', 'fade-out');
    }
    scene.classList.add('active');
}

async function animateIntro() {
    await delay(260);
    intro.classList.add('visible');
    await delay(3200);
    intro.classList.add('fade-out');
    await delay(1100);
    intro.classList.remove('active', 'fade-out');
    await showScene(cardScene);
    await animateWords();
}

async function animateWords() {
    for (const line of wordLines) {
        const word = line.dataset.word;
        for (let i = 0; i < word.length; i++) {
            line.textContent += word[i];
            await delay(150);
        }
        await delay(900);
    }
    await delay(1200);
    wordLinesContainer.classList.add('gather');
    await delay(1500);
    await showScene(phraseScene);
    await animatePhrase();
}

async function animatePhrase() {
    for (const line of phraseLines) {
        await delay(280);
        line.classList.add('visible');
    }
    await delay(3400);
    await showScene(suitcaseScene);
    await animateSuitcase();
}

async function animateSuitcase() {
    storyCard.classList.add('entered');
    await delay(900);
    suitcaseWrap.classList.add('open');
    await delay(2200);
    await showScene(destinationScene);
    await revealDestination();
}

async function revealDestination() {
    destinationCard.classList.add('visible');
    for (const item of destinationItems) {
        await delay(240);
        item.classList.add('visible');
    }
}

async function showFinalScene() {
    await showScene(finalScene);
    const card = finalScene.querySelector('.final-card');
    card.classList.add('visible');
    for (const line of finalReveal) {
        await delay(300);
        line.classList.add('visible');
    }
}

startButton.addEventListener('click', async () => {
    startButton.disabled = true;
    await delay(260);
    await showFinalScene();
});

window.addEventListener('DOMContentLoaded', () => {
    playMusicOnInteraction();
    animateIntro();
});
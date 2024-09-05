const paragraphs = {
    easy: [
        "The cat sat by the window, watching the birds outside. It seemed to be enjoying the warm sun. Every now and then, it would stretch and purr softly.",

        "The kids played in the park all afternoon, running and laughing with their friends. They enjoyed the swings and the slide, and they had a great time together.",

        "She opened her favorite book and settled into her cozy chair by the fire. The room was warm and quiet, and she quickly became absorbed in the story."
    ],
    medium: [
        "As the sun dipped below the horizon and the sky transformed into a canvas of vivid hues, the bustling city streets slowly began to quiet down, with the soft glow of streetlights casting long shadows and the distant hum of traffic fading into the evening, creating a serene atmosphere that invited both reflection and a peaceful end to a busy day.",

        "After months of meticulous planning and preparation, the team finally unveiled their innovative project to an eager audience, showcasing a groundbreaking technology that promised to revolutionize the industry, sparking enthusiastic discussions and generating high hopes for its potential to significantly improve both efficiency and user experience in ways previously thought unattainable.",

        "Amidst the hustle and bustle of the crowded marketplace, vendors enthusiastically showcased their colorful array of goods, from freshly baked pastries to handcrafted jewelry, while shoppers navigated the maze of stalls with eager anticipation, exchanging friendly banter and haggling over prices, creating a lively and vibrant atmosphere that truly captured the essence of a bustling community gathering."
    ],
    hard: [
        "Although the scintillating stars, shimmering across the vast expanse of the nebulous night sky, seemed tranquil and serene, an imperceptible chaos brewed within the cosmos, where galaxies collided in a cacophonous clash, and black holes devoured everything in their vicinity with an insatiable hunger, leaving nothing but an abyss of silence in their wake, while the universe itself expanded ever so subtly, as if in a delicate, perpetual dance with time and space, unfathomable to the human mind, which, despite its unrelenting curiosity, could only grasp a mere fraction of the infinite mysteries that surrounded it, awaiting discovery or perhaps, eternal oblivion.",
        
        "In the labyrinthine corridors of the ancient, ivy-clad mansion, whose towering spires punctuated the twilight sky with a foreboding elegance, one could almost hear the whispers of forgotten eras, as the dust-laden air carried the faint echoes of long-lost conversations, hidden behind tapestries worn by the relentless passage of time, while the creaking floorboards, though fragile underfoot, seemed to beckon adventurers to uncover the secrets concealed within its shadowy corners, where cobwebs hung like veils, guarding the cryptic inscriptions etched into the stone walls by hands long turned to dust, their meanings obscured by centuries of silence, yet pulsating with an enigmatic allure.",
    
        "As the tempestuous winds howled through the jagged cliffs that jutted ominously from the tempest-tossed sea, the lone figure, cloaked in a tattered, weather-beaten garment, stood resolute, gazing into the churning abyss below, where monstrous waves crashed violently against the rocky outcrops, sending sprays of frothy water into the air, each droplet shimmering momentarily in the pale light of the storm, only to be swallowed again by the insatiable fury of the ocean, which, like time itself, surged forward with an unstoppable force, dragging all that dared to oppose it into the depths of its unforgiving embrace."
    ]
};

var startTime, timerInterval, currentText = "", totalWords = 0, correctWords = 0;

document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('end-button').addEventListener('click', endGame);
document.getElementById('user-input').addEventListener('input', onInput);

function getRandomNum(a, b) { 
    return Math.floor(Math.random() * (b - a + 1) + a);
}  

function startGame() {
    document.getElementById('user-input').value = '';
    document.getElementById('user-input').disabled = false;
    document.getElementById('user-input').focus();
    document.getElementById('text-display').innerHTML = '';
    document.getElementById('speed').textContent = '0';
    document.getElementById('accuracy').textContent = '100';
    clearInterval(timerInterval);

    const difficulty = document.getElementById('difficulty').value;
    if (!paragraphs[difficulty]) {
        alert('Invalid difficulty level.');
        return;
    }

    currentText = paragraphs[difficulty][getRandomNum(0,2)];
    document.getElementById('text-display').innerHTML = formatText(currentText);
    startTime = new Date();
    timerInterval = setInterval(updateStats, 1000);
}

function endGame() {
    document.getElementById('user-input').disabled = true;
    clearInterval(timerInterval);
}

function formatText(text) {
    return text.split(' ').map(word => `<span class="word">${word}</span>`).join(' ');
}

function onInput(event) {
    const input = event.target.value;
    const words = document.querySelectorAll('.word');
    const inputWords = input.trim().split(/\s+/);

    let currentWordIndex = inputWords.length - 1;

    words.forEach((wordElement, index) => {
        if (index < inputWords.length) {
            const wordText = wordElement.textContent;
            const userWord = inputWords[index];
            if (userWord === wordText) {
                wordElement.classList.add('correct');
                wordElement.classList.remove('incorrect');
            } else {
                wordElement.classList.add('incorrect');
                wordElement.classList.remove('correct');
            }
        }
    });

    if (input.endsWith(' ')) {
        // Prevent going back to edit
        document.getElementById('user-input').value = input.trim() + ' ';
        if (currentWordIndex >= 0) {
            document.querySelectorAll('.word')[currentWordIndex].classList.add(inputWords[currentWordIndex] === document.querySelectorAll('.word')[currentWordIndex].textContent ? 'correct' : 'incorrect');
        }
    }

    if (input === currentText) {
        clearInterval(timerInterval);
        document.getElementById('user-input').disabled = true;
    }
}

function updateStats() {
    const elapsedTime = (new Date() - startTime) / 1000; // for seconds
    const wordsTyped = document.getElementById('user-input').value.trim().split(/\s+/).length;
    const minutes = elapsedTime / 60;
    const speed = Math.round(wordsTyped / minutes);
    document.getElementById('speed').textContent = speed;

    // Calculate accuracy
    const inputWords = document.getElementById('user-input').value.trim().split(/\s+/);
    const totalWords = currentText.trim().split(/\s+/).length;
    const correctWords = inputWords.filter((word, index) => word === currentText.split(/\s+/)[index]).length;
    const accuracy = Math.round((correctWords / totalWords) * 100);
    document.getElementById('accuracy').textContent = accuracy;
}

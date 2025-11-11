const ladder = [
    { word: "POCKET", clue: "Storage for your clothing" },
    { word: "ROCKET", clue: "Change one letter in _ _ _ _ to launch into space" },
    { word: "SOCKET", clue: "Change one letter in _ _ _ _ _ _ to get an electrical outlet" },
    { word: "SOCK", clue: "Remove two letters from _ _ _ _ _ _ to get footwear" },
    { word: "LOCK", clue: "Change first letter of _ _ _ _ to secure something" },
    { word: "CLOCK", clue: "Add a letter to _ _ _ _ to tell time" },
    { word: "CLOAK", clue: "Change one letter in _ _ _ _ _ _ to get a garment" },
    { word: "CROAK", clue: "Change one letter in _ _ _ _ _ to get a frog's sound" },
    { word: "CORK", clue: "Remove a letter and anagram to bottle stopper" },
    { word: "ROCK", clue: "Anagram to get a piece of mineral" },
    { word: "ROCKWELL", clue: "Combine a source of water with _ _ _ _ to get a painter's last name" },
    { word: "ROCKWELL AUTOMATION", clue: "Add a word to _ _ _ _ _ _ _ _ to get an industrial technology company" }
];

let answers = Array(ladder.length).fill('');

function initGame() {
    renderLadder();
}

function renderLadder() {
    const container = document.getElementById('ladder-container');
    container.innerHTML = '';
    
    ladder.forEach((step, index) => {
        const stepElement = document.createElement('div');
        stepElement.className = `bg-white rounded-lg shadow p-4 transition fade-in ${isCorrect(index) ? 'step-correct' : ''}`;
        
        stepElement.innerHTML = `
            <div class="flex items-center gap-4">
                <div class="flex-1">
                    <div class="text-sm mb-2 ${isCorrect(index) ? 'line-through text-gray-400' : 'text-gray-700'}">
                        ${step.clue}
                    </div>
                    <input
                        type="text"
                        id="input-${index}"
                        value="${answers[index]}"
                        class="w-full text-2xl font-bold px-4 py-2 rounded border-2 uppercase ${isCorrect(index) ? 'correct-answer' : 'border-gray-300 focus:border-indigo-500 focus:outline-none'}"
                        placeholder="Type answer..."
                    />
                </div>
            </div>
        `;
        
        container.appendChild(stepElement);
        
        const input = document.getElementById(`input-${index}`);
        input.addEventListener('input', (e) => handleInput(index, e.target.value));
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                handleInput(index, e.target.value);
            }
        });
    });
}

function handleInput(index, value) {
    answers[index] = value;
    
    if (isCorrect(index)) {
        renderLadder();
        
        if (index < ladder.length - 1) {
            setTimeout(() => {
                const nextInput = document.getElementById(`input-${index + 1}`);
                if (nextInput) nextInput.focus();
            }, 100);
        }
    } else {
        const input = document.getElementById(`input-${index}`);
        if (input && !input.classList.contains('correct-answer')) {
            input.classList.remove('correct-answer');
        }
    }
}

function isCorrect(index) {
    return normalizeText(answers[index]) === normalizeText(ladder[index].word);
}

function normalizeText(text) {
    return text.toUpperCase().trim().replace(/\s+/g, ' ');
}

document.addEventListener('DOMContentLoaded', initGame);
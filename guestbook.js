const suggestions = [
    "What's your favorite memory?",
    "What brings you joy?",
    "Recommend something cool!",
    "Share a fun fact about yourself",
    "What inspired your latest project?",
    "What's a skill you're proud of?",
    "Share your favorite book or game",
    "What's your go-to comfort activity?"
];

let usedSuggestions = [];

function getRandomSuggestion() {
    if (usedSuggestions.length === suggestions.length) {
        usedSuggestions = [];
    }
    
    let availableSuggestions = suggestions.filter(s => !usedSuggestions.includes(s));
    let randomSuggestion = availableSuggestions[Math.floor(Math.random() * availableSuggestions.length)];
    usedSuggestions.push(randomSuggestion);
    
    return randomSuggestion;
}

document.querySelector('.wizard-trigger').addEventListener('click', function(e) {
    e.preventDefault();
    const rainbowText = document.querySelector('.rainbow-text');
    const wizardWindow = document.getElementById('wizard-window');
    
    rainbowText.classList.toggle('hidden');
    
    if (wizardWindow.style.display === 'none') {
        wizardWindow.style.display = 'flex';
    } else {
        wizardWindow.style.display = 'none';
    }
});

document.getElementById('wizard-orb').addEventListener('click', function() {
    const suggestionBox = document.getElementById('suggestion-box');
    suggestionBox.textContent = getRandomSuggestion();
    suggestionBox.style.display = 'block';
});
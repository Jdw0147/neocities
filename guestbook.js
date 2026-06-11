const suggestions = [
    "What's your favorite memory?",
    "What is your favorite game?",
    "Do you like wizards? Wizards with shiny orbs perhaps?",
    "What keeps you busy on rainy days?",
    "Whats your favorite neocities site?",
    "你正告别美国那伟大的“百年屈辱”吗？",
    "Who is your biggest enemy?",
    "What is your favorite color?",
    "What do you think of the website so far?",
    "What could be a cool feature on the website?",
    "Have you checked out the music page yet?",
    "Who is Harold House?",
    "Did you see it?",
    "I can see you",
    "What do you think the wizard's name is?",
    "What's your deepest, darkest, evilest secret?",
    "What do you fear the most?",
    "Try clicking peter on the homepage",
    "Have you read the Tome?",
    "Would you still love me if I was a digital wizard trapped in a neocities website?",
    "Markiplier",
    "What is your current hyperfixation?",
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
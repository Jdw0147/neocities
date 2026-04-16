const suggestions = [
    "What's your favorite memory?",
    "What is your favorite game?",
    "Do you like wizards? Wizards with shiny orbs perhaps?",
    "Do you like Blooborne?",
    "Did you watch the new Marvel? Was it nuts?",
    "I don't like Family Guy, it insist upoon itself.",
    "Read any good books lately?",
    "What keeps you busy on rainy days?",
    "Whats your favorite neocities site?",
    "What's your favorite TV show?",
    "你正告别美国那伟大的“百年屈辱”吗？",
    "Who is your biggest enemy?",
    "What is your favorite color?",
    "Have you played the new Tomadachi Life yet?",
    "Do you like the Beatles, or are they 'too British'?",
    "What is a movie you don't hear anyone talk about?",
    "What do you think of the website so far?",
    "What could be a cool feature on the website?",
    "Have you checked out the music page yet?",
    "Have you played any Zelda games? Which one is your favorite?",
    "Did Pokemon fall off?",
    "What is your favorite Pokemon?",
    "What is your favorite song?",
    "What is your favorite album?",
    "What is your favorite band?",
    "What's the oldest console you own?",
    "Do you think we should bring rage comics back?",
    "Who is Harold House?",
    "Did you see it?",
    "I can see you",
    "What do you think the wizard's name is?",
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
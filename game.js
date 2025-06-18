    // Game variables
    let userScore = 0;
    let computerScore = 0;
    const choices = ['SNAKE', 'WATER', 'GUN'];
    let activeEmoji = null;
    
    // DOM elements
    const resultEl = document.getElementById('result');
    const userScoreEl = document.getElementById('user-score');
    const computerScoreEl = document.getElementById('computer-score');
    const themeBtn = document.getElementById('themeBtn');
    const themeDropdown = document.getElementById('themeDropdown');
    const skinBtn = document.getElementById('skinBtn');
    const skinDropdown = document.getElementById('skinDropdown');
    const inviteBtn = document.getElementById('inviteBtn');
    const inviteDropdown = document.getElementById('inviteDropdown');
    const emojiReactions = document.getElementById('emojiReactions');
    
    // Sound effects
    const winSound = document.getElementById('winSound');
    const loseSound = document.getElementById('loseSound');
    const drawSound = document.getElementById('drawSound');
    const emojiSound = document.getElementById('emojiSound');

    // Theme toggle
    themeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      themeDropdown.classList.toggle('show');
      skinDropdown.classList.remove('show');
      inviteDropdown.classList.remove('show');
    });

    // Skin toggle
    skinBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      skinDropdown.classList.toggle('show');
      themeDropdown.classList.remove('show');
      inviteDropdown.classList.remove('show');
    });

    // Theme selection
    document.querySelectorAll('.theme-option').forEach(option => {
      option.addEventListener('click', () => {
        document.body.className = option.dataset.theme;
        themeDropdown.classList.remove('show');
      });
    });

    // Skin selection
    document.querySelectorAll('.skin-option').forEach(option => {
      option.addEventListener('click', () => {
        const currentTheme = document.body.className.split(' ')[0] || 'default';
        document.body.className = `${currentTheme} ${option.dataset.skin}`;
        skinDropdown.classList.remove('show');
      });
    });

    // Invite dropdown
    inviteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      inviteDropdown.classList.toggle('show');
      themeDropdown.classList.remove('show');
      skinDropdown.classList.remove('show');
    });

    // Emoji reactions
    document.querySelectorAll('.emoji-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        emojiSound.currentTime = 0;
        emojiSound.play();
        
        // Remove active class from all emoji buttons
        document.querySelectorAll('.emoji-btn').forEach(btn => {
          btn.classList.remove('active');
        });
        
        // Add active class to clicked emoji
        this.classList.add('active');
        activeEmoji = this;
        
        // Create floating emoji effect
        const floatingEmoji = document.createElement('div');
        floatingEmoji.textContent = this.textContent;
        floatingEmoji.className = 'floating-emoji';
        
        const rect = this.getBoundingClientRect();
        floatingEmoji.style.left = `${rect.left + rect.width/2 - 10}px`;
        floatingEmoji.style.top = `${rect.top - 10}px`;
        
        document.body.appendChild(floatingEmoji);
        
        // Remove floating emoji after animation
        setTimeout(() => {
          floatingEmoji.remove();
        }, 1000);
      });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
      themeDropdown.classList.remove('show');
      skinDropdown.classList.remove('show');
      inviteDropdown.classList.remove('show');
    });

    // Social share functions
    document.getElementById('whatsapp').addEventListener('click', () => {
      window.open(`https://wa.me/?text=Play%20Snake%20Water%20Gun%20with%20me!%20${window.location.href}`);
    });

    document.getElementById('twitter').addEventListener('click', () => {
      window.open(`https://twitter.com/intent/tweet?text=Play%20Snake%20Water%20Gun%20with%20me!&url=${window.location.href}`);
    });

    document.getElementById('email').addEventListener('click', () => {
      window.open(`mailto:?subject=Play%20Snake%20Water%20Gun&body=Play%20this%20game%20with%20me!%20${window.location.href}`);
    });

    document.getElementById('instagram').addEventListener('click', () => {
      alert('Share the game link on Instagram!');
    });

    // Game logic
    function determineWinner(user, computer) {
      if (user === computer) return 'DRAW';
      if ((user === 'SNAKE' && computer === 'WATER') ||
          (user === 'WATER' && computer === 'GUN') ||
          (user === 'GUN' && computer === 'SNAKE')) {
        return 'USER';
      }
      return 'COMPUTER';
    }

    function playRound(userChoice) {
      const computerChoice = choices[Math.floor(Math.random() * choices.length)];
      const winner = determineWinner(userChoice, computerChoice);
      
      if (winner === 'DRAW') {
        resultEl.textContent = `It's a draw! Both chose ${userChoice}.`;
        drawSound.play();
      } else if (winner === 'USER') {
        userScore++;
        resultEl.textContent = `You win! ${userChoice} beats ${computerChoice} 🎉`;
        userScoreEl.textContent = `Your Score: ${userScore}`;
        winSound.play();
      } else {
        computerScore++;
        resultEl.textContent = `You lose! ${computerChoice} beats ${userChoice} 😞`;
        computerScoreEl.textContent = `Computer Score: ${computerScore}`;
        loseSound.play();
      }
      
      // Clear active emoji after each round
      if (activeEmoji) {
        activeEmoji.classList.remove('active');
        activeEmoji = null;
      }
    }

    // Event listeners for choice buttons
    document.getElementById('snake').addEventListener('click', () => playRound('SNAKE'));
    document.getElementById('water').addEventListener('click', () => playRound('WATER'));
    document.getElementById('gun').addEventListener('click', () => playRound('GUN'));
    

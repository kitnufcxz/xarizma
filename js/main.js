document.getElementById('start-screen').addEventListener('click', function() {
    document.getElementById('background').style.transform = 'scale(1.2)';
    
    this.style.opacity = '0';
    setTimeout(() => {
        this.style.display = 'none';
        document.getElementById('content').style.display = 'block';
        
        setTimeout(() => {
            document.getElementById('loading').style.display = 'block';
            
            let percent = 5;
            const loadingInterval = setInterval(() => {
                percent += Math.floor(Math.random() * 10) + 1;
                if (percent > 100) percent = 100;
                
                document.getElementById('loading-percent').textContent = percent;
                document.getElementById('loading-progress').style.width = percent + '%';
                
                if (percent === 100) {
                    clearInterval(loadingInterval);
                    setTimeout(() => {
                        document.getElementById('info-text').style.display = 'none';
                        document.getElementById('loading').style.display = 'none';
                        
                        document.getElementById('final-text').style.display = 'block';
                        
                        setTimeout(() => {
                            document.getElementById('final-text').style.display = 'none';
                            document.getElementById('buttons-container').style.display = 'flex';
                            showMusicPlayer();
                        }, 1500);
                    }, 500);
                }
            }, 300);
        }, 1000);
    }, 500);
});

document.querySelectorAll('.round-button').forEach(button => {
    button.addEventListener('click', function() {
        const cardType = this.getAttribute('data-card');
        const infoCard = document.getElementById('info-card');
        
        document.querySelectorAll('.card-info').forEach(info => {
            info.style.display = 'none';
        });
        
        if (cardType === '1') {
            document.getElementById('telegram-info').style.display = 'block';
        } else if (cardType === '2') {
            document.getElementById('discord-info').style.display = 'block';
        } else if (cardType === '3') {
            document.getElementById('quote-info').style.display = 'block';
        }
        
        infoCard.style.display = 'block';
        infoCard.style.bottom = '20px';
    });
});

function createFamilyMessages() {
            const container = document.querySelector('.family-messages');
            const messages = [
                "че папе?", "че маме?", "че бабке в тапки?", "чем ебали?",
                "че в хуй?", "че с хуя?", "кто ебал тебя?", "имя ебаря?",
                "кто плюет в тебя?", "сосал?", "че бате под сменой?", "че отцу в хуй я мама твоя",
                "куда садили?", "кто ссал на тебя?", "чьим хуем тебя ебали?", "ещё раз че гею?",
                "вопрос в хуй?", "я ты триии", "соври", "не ври",
                "я ты триии", "че в рот те?", "чем плевали?",
                "че отцу хуем по лицу?", "я ты триии", "кому рот твой?", "кто плевал?"
            ];
            
            const gridCols = 10;
            const gridRows = 8;
            const cellWidth = 100 / gridCols;
            const cellHeight = 100 / gridRows;
            
            const occupiedCells = new Array(gridCols * gridRows).fill(false);
            
            messages.forEach((text, index) => {
                const message = document.createElement('div');
                message.classList.add('family-message');
                message.textContent = text;
                
                let col, row, cellIndex;
                do {
                    col = Math.floor(Math.random() * gridCols);
                    row = Math.floor(Math.random() * gridRows);
                    cellIndex = row * gridCols + col;
                } while (occupiedCells[cellIndex]);
                
                occupiedCells[cellIndex] = true;
                
                const posX = col * cellWidth + (Math.random() * 10 + 5);
                const posY = row * cellHeight + (Math.random() * 10 + 5);
                
                message.style.left = `${posX}%`;
                message.style.top = `${posY}%`;
                
                const animationType = Math.floor(Math.random() * 3) + 1;
                const duration = 12 + Math.random() * 6;
                const delay = Math.random() * 5;
                
                message.style.animation = `float${animationType} ${duration}s linear ${delay}s infinite`;
                
                container.appendChild(message);
            });
        }

        createFamilyMessages();



function copyDiscord() {
    const discordText = "username#1234";
    navigator.clipboard.writeText(discordText).then(() => {
        alert("Discord скопирован: " + discordText);
    });
}

function closeInfoCard() {
    const infoCard = document.getElementById('info-card');
    infoCard.style.display = 'none';
}
const buttons = {
    themeBtn : document.getElementById('theme-button'),
    lightThemeBtn : document.getElementById('light-theme'),
    darkThemeBtn : document.getElementById('dark-theme'),

    pickFriendBtn : document.getElementById('pick-friend-button'),
    pickAIBtn : document.getElementById('pick-ai-button'),

    easyAIBtn : document.getElementById('ai-easy'),
    mediumAIBtn : document.getElementById('ai-medium'),
    hardAIBtn : document.getElementById('ai-hard'),

    menuBtn : document.getElementById('menu-button'),
    markXBtn : document.getElementById('pick-x-button'),
    markOBtn : document.getElementById('pick-o-button'),
};

const dropdowns = {
    themeDropdown : document.getElementById('theme-dropdown'),
    modeAIDropdown : document.getElementById('ai-dropdown'),
}

const pages = {
    splashPage : document.getElementById('splash-page'),
    gamePage : document.getElementById('game-page'),
}

setTimeout(() => {
    pages.splashPage.classList.add('drop-out');
}, 2000)
setTimeout(() => {
    pages.splashPage.classList.remove('drop-out');
    pages.splashPage.classList.remove('active');
}, 5000)

buttons.themeBtn.addEventListener('click', function(e){
    dropdowns.themeDropdown.classList.toggle('active');
    buttons.lightThemeBtn.setAttribute('tabindex', '0');
    buttons.darkThemeBtn.setAttribute('tabindex', '0');
});

buttons.lightThemeBtn.addEventListener('click', changePageTheme);
buttons.lightThemeBtn.addEventListener('keydown', changePageTheme);

buttons.darkThemeBtn.addEventListener('click', changePageTheme);
buttons.darkThemeBtn.addEventListener('keydown', changePageTheme);

function changePageTheme(e){
    console.log(e.type)
    if ((e.target === buttons.lightThemeBtn && e.type === 'click') || 
    (e.target === buttons.lightThemeBtn && e.type === 'keydown') && (e.key === ' ' || e.key === 'Enter')){

        const html = document.querySelector('html');
        html.classList.add('light-theme');
        html.classList.remove('dark-theme');

    } 
    else if ((e.target === buttons.darkThemeBtn && e.type === 'click') || 
    (e.target === buttons.darkThemeBtn && e.type === 'keydown') && (e.key === ' ' || e.key === 'Enter')){

        const html = document.querySelector('html');
        html.classList.add('dark-theme');
        html.classList.remove('light-theme');

    }
}


buttons.pickAIBtn.addEventListener('click', function(e){
    dropdowns.modeAIDropdown.classList.toggle('active');
    buttons.easyAIBtn.setAttribute('tabindex', '0');
    buttons.mediumAIBtn.setAttribute('tabindex', '0');
    buttons.hardAIBtn.setAttribute('tabindex', '0');
})

buttons.pickFriendBtn.addEventListener('click', displayGamePage);

buttons.easyAIBtn.addEventListener('click', displayGamePage);
buttons.mediumAIBtn.addEventListener('click', displayGamePage);
buttons.hardAIBtn.addEventListener('click', displayGamePage);

function displayGamePage(e){
    pages.gamePage.classList.add('active');
    buttons.markXBtn.setAttribute('tabindex', '0');
    buttons.markOBtn.setAttribute('tabindex', '0');

    buttons.markXBtn.addEventListener('click', beginGame);
    buttons.markXBtn.addEventListener('keydown', beginGame);

    buttons.markOBtn.addEventListener('click', beginGame);
    buttons.markOBtn.addEventListener('keydown', beginGame);

    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
        tile.setAttribute('tabindex', '0')
    })

    buttons.themeBtn.setAttribute('tabindex', '-1');
    buttons.pickFriendBtn.setAttribute('tabindex', '-1');
    buttons.pickAIBtn.setAttribute('tabindex', '-1');

    const links = document.querySelectorAll('.link');
    links.forEach(link => {
        link.setAttribute('tabindex', '-1');
    })
}

buttons.menuBtn.addEventListener('click', closeGamePage);

function closeGamePage(e){
    pages.gamePage.classList.remove('active');
    buttons.markXBtn.removeAttribute('tabindex');
    buttons.markOBtn.removeAttribute('tabindex');

    buttons.markXBtn.removeEventListener('click', beginGame);
    buttons.markXBtn.removeEventListener('keydown', beginGame);

    buttons.markOBtn.removeEventListener('click', beginGame);
    buttons.markOBtn.removeEventListener('keydown', beginGame);

    buttons.markXBtn.style.setProperty("--x-after-bkgrnd", "");
    buttons.markOBtn.style.setProperty("--o-after-bkgrnd", "");

    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
        tile.setAttribute('tabindex', '-1')
    })

    resetGame();

    buttons.themeBtn.removeAttribute('tabindex');
    buttons.pickFriendBtn.removeAttribute('tabindex');
    buttons.pickAIBtn.removeAttribute('tabindex');

    const links = document.querySelectorAll('.link');
    links.forEach(link => {
        link.removeAttribute('tabindex');
    })
}

function addEventTiles (callback){
    const tiles = document.querySelectorAll('.tile');
            tiles.forEach(tile => {
                tile.addEventListener('click', callback);
                tile.addEventListener('keydown', callback);
            })
}

function removeEventTiles (callback){
    const tiles = document.querySelectorAll('.tile');
            tiles.forEach(tile => {
                tile.removeEventListener('click', callback);
                tile.removeEventListener('keydown', callback);
            })
}

function getAfterColor(elem){
    return window.getComputedStyle(elem, '::after').getPropertyValue('background-color');
}

function displayMarks(){
    let tileIndex = 0;
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
        tile.textContent = Gameboard.tiles[tileIndex];
        tileIndex++;
    })
}

const tileTemplate = (() => {
    return [
    0, 1, 2, 
    3, 4, 5, 
    6, 7, 8
    ]
});

const Gameboard = (() => {
    const tiles = tileTemplate();
    return {tiles};
})();

function resetGame (){
    const tiles = document.querySelectorAll('.tile');
    const tileTemps = tileTemplate();
    tiles.forEach(tile => {
        tile.classList.add('hidden');
        tile.classList.remove('player-one');
        tile.classList.remove('player-two');
        tile.textContent = "";
    });

    removeEventTiles(markTileX);
    removeEventTiles(markTileO);

    for (let i = 0; i < Gameboard.tiles.length; i++){
        Gameboard.tiles[i] = tileTemps[i];
    }

    buttons.markXBtn.style.setProperty("--x-after-bkgrnd", "");
    buttons.markOBtn.style.setProperty("--o-after-bkgrnd", "");

    buttons.markXBtn.addEventListener('click', beginGame);
    buttons.markXBtn.addEventListener('keydown', beginGame);

    buttons.markOBtn.addEventListener('click', beginGame);
    buttons.markOBtn.addEventListener('keydown', beginGame);
}

function beginGame (e){
    if ((e.target === buttons.markXBtn && e.type === 'click') || 
    (e.target === buttons.markXBtn && e.type === 'keydown') && (e.key === ' ' || e.key === 'Enter')){

        buttons.markXBtn.style.setProperty("--x-after-bkgrnd", "#29C71A");
        addEventTiles(markTileX);
        buttons.markXBtn.removeEventListener('click', beginGame);
        buttons.markXBtn.removeEventListener('keydown', beginGame);

        buttons.markOBtn.removeEventListener('click', beginGame);
        buttons.markOBtn.removeEventListener('keydown', beginGame);

    } 
    else if ((e.target === buttons.markOBtn && e.type === 'click') || 
    (e.target === buttons.markOBtn && e.type === 'keydown') && (e.key === ' ' || e.key === 'Enter')){

        buttons.markOBtn.style.setProperty("--o-after-bkgrnd", "#29C71A");
        addEventTiles(markTileO);
        buttons.markXBtn.removeEventListener('click', beginGame);
        buttons.markXBtn.removeEventListener('keydown', beginGame);

        buttons.markOBtn.removeEventListener('click', beginGame);
        buttons.markOBtn.removeEventListener('keydown', beginGame);

    }
}

function markTileX (e){
    const tile = e.target;
    const tileIndex = e.target.getAttribute('data-index');

    if ((e.target === tile && e.type === 'click') || 
    (e.target === tile && e.type === 'keydown') && (e.key === ' ' || e.key === 'Enter')){

        for (let i = 0; i < Gameboard.tiles.length; i++){
            if (i == tileIndex){
                if (Gameboard.tiles[tileIndex] === 0 || Gameboard.tiles[tileIndex] === 1 
                    || Gameboard.tiles[tileIndex] === 2 || Gameboard.tiles[tileIndex] === 3
                    || Gameboard.tiles[tileIndex] === 4 || Gameboard.tiles[tileIndex] === 5
                    || Gameboard.tiles[tileIndex] === 6 || Gameboard.tiles[tileIndex] === 7
                    || Gameboard.tiles[tileIndex] === 8){
    
                    Gameboard.tiles[tileIndex] = "X";
                    tile.classList.remove('hidden');
                    displayMarks();
                    
                    removeEventTiles(markTileX);
                    addEventTiles(markTileO);
                    
                    checkIfWin();
                    if (getAfterColor(buttons.markXBtn) === "rgb(41, 199, 26)"){ // #29C71A .player-one
                        tile.classList.add('player-one');
                        buttons.markXBtn.style.setProperty("--x-after-bkgrnd", "");
                        buttons.markOBtn.style.setProperty("--o-after-bkgrnd", "#C71A1A");
                    } 
                    else {
                        tile.classList.add('player-two'); // #C71A1A .player-two
                        buttons.markXBtn.style.setProperty("--x-after-bkgrnd", "");
                        buttons.markOBtn.style.setProperty("--o-after-bkgrnd", "#29C71A");
                    }
                }
                break;
            }
            else {
                continue;
            }
        }
    }
}

function markTileO (e){
    const tile = e.target;
    const tileIndex = e.target.getAttribute('data-index');

    if ((e.target === tile && e.type === 'click') || 
    (e.target === tile && e.type === 'keydown') && (e.key === ' ' || e.key === 'Enter')){

        for (let i = 0; i < Gameboard.tiles.length; i++){
            if (i == tileIndex){
                if (Gameboard.tiles[tileIndex] === 0 || Gameboard.tiles[tileIndex] === 1 
                    || Gameboard.tiles[tileIndex] === 2 || Gameboard.tiles[tileIndex] === 3
                    || Gameboard.tiles[tileIndex] === 4 || Gameboard.tiles[tileIndex] === 5
                    || Gameboard.tiles[tileIndex] === 6 || Gameboard.tiles[tileIndex] === 7
                    || Gameboard.tiles[tileIndex] === 8){
    
                    Gameboard.tiles[tileIndex] = "O";
                    tile.classList.remove('hidden');
                    displayMarks(); 
                    
                    removeEventTiles(markTileO);
                    addEventTiles(markTileX);

                    checkIfWin();
                    
    
                    if (getAfterColor(buttons.markOBtn) === "rgb(41, 199, 26)"){ // #29C71A .player-one
                        tile.classList.add('player-one');
                        buttons.markXBtn.style.setProperty("--x-after-bkgrnd", "#C71A1A");
                        buttons.markOBtn.style.setProperty("--o-after-bkgrnd", "");
                    } 
                    else {
                        tile.classList.add('player-two'); // #C71A1A .player-two
                        buttons.markXBtn.style.setProperty("--x-after-bkgrnd", "#29C71A");
                        buttons.markOBtn.style.setProperty("--o-after-bkgrnd", "");
                    }
    
                }
                break;
            }
            else {
                continue;
            }
        }

    }
}

function checkIfWin(){

    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
        if (Gameboard.tiles[0] === Gameboard.tiles[3] && Gameboard.tiles[3] === Gameboard.tiles[6]){

            if (tile.getAttribute('data-index') == 0 || tile.getAttribute('data-index') == 3 
            || tile.getAttribute('data-index') == 6){

                tile.classList.add('win');
                removeEventTiles(markTileX);
                removeEventTiles(markTileO);
                setTimeout(function (){
                    tile.classList.remove('win');
                    resetGame();
                }, 4000);

            } 
            
        }
        else if (Gameboard.tiles[1] === Gameboard.tiles[4] && Gameboard.tiles[4] === Gameboard.tiles[7]){

            if (tile.getAttribute('data-index') == 1 || tile.getAttribute('data-index') == 4 
            || tile.getAttribute('data-index') == 7){
                
                tile.classList.add('win');
                removeEventTiles(markTileX);
                removeEventTiles(markTileO);
                setTimeout(function (){
                    tile.classList.remove('win');
                    resetGame();
                }, 4000);
            }
            
        }
        else if (Gameboard.tiles[2] === Gameboard.tiles[5] && Gameboard.tiles[5] === Gameboard.tiles[8]){

            if (tile.getAttribute('data-index') == 2 || tile.getAttribute('data-index') == 5 
            || tile.getAttribute('data-index') == 8){
                
                tile.classList.add('win');
                removeEventTiles(markTileX);
                removeEventTiles(markTileO);
                setTimeout(function (){
                    tile.classList.remove('win');
                    resetGame();
                }, 4000);
            }
            
        }
        else if (Gameboard.tiles[0] === Gameboard.tiles[1] && Gameboard.tiles[1] === Gameboard.tiles[2]){

            if (tile.getAttribute('data-index') == 0 || tile.getAttribute('data-index') == 1 
            || tile.getAttribute('data-index') == 2){

                tile.classList.add('win');
                removeEventTiles(markTileX);
                removeEventTiles(markTileO);
                setTimeout(function (){
                    tile.classList.remove('win');
                    resetGame();
                }, 4000);
            }
            
        }
        else if (Gameboard.tiles[0] === Gameboard.tiles[4] && Gameboard.tiles[4] === Gameboard.tiles[8]){

            if (tile.getAttribute('data-index') == 0 || tile.getAttribute('data-index') == 4 
            || tile.getAttribute('data-index') == 8){
                
                tile.classList.add('win');
                removeEventTiles(markTileX);
                removeEventTiles(markTileO);
                setTimeout(function (){
                    tile.classList.remove('win');
                    resetGame();
                }, 4000);
            }
           
        }
        else if (Gameboard.tiles[2] === Gameboard.tiles[4] && Gameboard.tiles[4] === Gameboard.tiles[6]){

            if (tile.getAttribute('data-index') == 2 || tile.getAttribute('data-index') == 4 
            || tile.getAttribute('data-index') == 6){
                
                tile.classList.add('win');
                removeEventTiles(markTileX);
                removeEventTiles(markTileO);
                setTimeout(function (){
                    tile.classList.remove('win');
                    resetGame();
                }, 4000);
            }
            
        }
        else if (Gameboard.tiles[3] === Gameboard.tiles[4] && Gameboard.tiles[4] === Gameboard.tiles[5]){

            if (tile.getAttribute('data-index') == 3 || tile.getAttribute('data-index') == 4 
            || tile.getAttribute('data-index') == 5){
                
                tile.classList.add('win');
                removeEventTiles(markTileX);
                removeEventTiles(markTileO);
                setTimeout(function (){
                    tile.classList.remove('win');
                    resetGame();
                }, 4000);
            }
            
        }
        else if (Gameboard.tiles[6] === Gameboard.tiles[7] && Gameboard.tiles[7] === Gameboard.tiles[8]){

            if (tile.getAttribute('data-index') == 6 || tile.getAttribute('data-index') == 7 
            || tile.getAttribute('data-index') == 8){
                
                tile.classList.add('win');
                removeEventTiles(markTileX);
                removeEventTiles(markTileO);
                setTimeout(function (){
                    tile.classList.remove('win');
                    resetGame();
                }, 4000);
            }
        
        }
        else if (
            (Gameboard.tiles[0] === "X" || Gameboard.tiles[0] === "O") &&
            (Gameboard.tiles[1] === "X" || Gameboard.tiles[1] === "O") &&
            (Gameboard.tiles[2] === "X" || Gameboard.tiles[2] === "O") &&
            (Gameboard.tiles[3] === "X" || Gameboard.tiles[3] === "O") &&
            (Gameboard.tiles[4] === "X" || Gameboard.tiles[4] === "O") &&
            (Gameboard.tiles[5] === "X" || Gameboard.tiles[5] === "O") &&
            (Gameboard.tiles[6] === "X" || Gameboard.tiles[6] === "O") &&
            (Gameboard.tiles[7] === "X" || Gameboard.tiles[7] === "O") &&
            (Gameboard.tiles[8] === "X" || Gameboard.tiles[8] === "O")
        ){

            tile.classList.add('tie');
            removeEventTiles(markTileX);
            removeEventTiles(markTileO);
            setTimeout(function (){
                tile.classList.remove('tie');
                resetGame();
            }, 4000);
        }
    })
}
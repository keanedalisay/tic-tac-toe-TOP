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
    if ((e.target === buttons.lightThemeBtn && e.type === 'click')
    || (e.target === buttons.lightThemeBtn && e.type === 'keydown'
        && (e.key === ' ' || e.key === 'Enter'))){
        const html = document.querySelector('html');
        html.classList.add('light-theme');
        html.classList.remove('dark-theme');
    } 
    else if ((e.target === buttons.darkThemeBtn && e.type === 'click')
    || (e.target === buttons.darkThemeBtn && e.type === 'keydown'
        && (e.key === ' ' || e.key === 'Enter'))){
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

function displayGamePage(e){
    pages.gamePage.classList.add('active');
    buttons.markXBtn.setAttribute('tabindex', '0');
    buttons.markOBtn.setAttribute('tabindex', '0');

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

    buttons.themeBtn.removeAttribute('tabindex');
    buttons.pickFriendBtn.removeAttribute('tabindex');
    buttons.pickAIBtn.removeAttribute('tabindex');

    const links = document.querySelectorAll('.link');
    links.forEach(link => {
        link.removeAttribute('tabindex');
    })
}
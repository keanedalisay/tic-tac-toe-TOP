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



buttons.pickAIBtn.addEventListener('click', function(e){
    dropdowns.modeAIDropdown.classList.toggle('active');
    buttons.easyAIBtn.setAttribute('tabindex', '0');
    buttons.mediumAIBtn.setAttribute('tabindex', '0');
    buttons.hardAIBtn.setAttribute('tabindex', '0');
})
// 💡 Dark & Light Mode Toggle Using Local Storage
let darkMode = localStorage.getItem('darkMode');
const darkModeToggle = document.querySelector('#darkModeToggle');
const enableDarkMode = () => {
    document.body.classList.add('dark-mode');
    document.getElementById('homeNavbar').classList.remove('bg-white');
    document.getElementById('homeNavbar').classList.remove('navbar-light');
    document.getElementById('homeNavbar').classList.add('navbar-dark');
    document.getElementById('homeNavbar').classList.add('bg-dark');
    localStorage.setItem('darkMode', 'enabled');
}
const disableDarkMode = () => {
    document.body.classList.remove('dark-mode');
    document.getElementById('homeNavbar').classList.add('bg-white');
    document.getElementById('homeNavbar').classList.add('navbar-light');
    document.getElementById('homeNavbar').classList.remove('navbar-dark');
    document.getElementById('homeNavbar').classList.remove('bg-dark');
    localStorage.setItem('darkMode', null);
}
if (darkMode === 'enabled') {
    enableDarkMode();
}
darkModeToggle.addEventListener('click', () => {
    console.log('clicked');
    darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        console.log('disableDarkMode');
        disableDarkMode();
    } else {
        console.log('enableDarkMode');
        enableDarkMode();
    }
});

function calculateAge(fullbirthday) {
    var today = new Date();
    var birthDate = new Date(fullbirthday);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
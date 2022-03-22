const site_url = window.location.href;
function btnActive() {
    if (site_url.includes("/about")) {
        document.getElementsByClassName("tab")[1].classList.add("tab-active");
    } else if (site_url.includes("/blog")) {
        document.getElementsByClassName("tab")[2].classList.add("tab-active");
    } else if (site_url.includes("/podcast")) {
        document.getElementsByClassName("tab")[3].classList.add("tab-active");
    } else if (site_url.includes("/terms-of-services")) {
        document.getElementsByClassName("tab")[4].classList.add("tab-active");
    } else if (site_url.includes("/privacy-policy")) {
        document.getElementsByClassName("tab")[5].classList.add("tab-active");
    } else {
        document.getElementsByClassName("tab")[0].classList.add("tab-active");
    }
}
btnActive();
// 💡 Dark & Light Mode Toggle Using Local Storage
// let darkMode = localStorage.getItem('darkMode');
// const darkModeToggle = document.querySelector('#darkModeToggle');
// const enableDarkMode = () => {
//     document.body.classList.add('dark-mode');
//     document.getElementById('homeNavbar').classList.remove('bg-white');
//     document.getElementById('homeNavbar').classList.remove('navbar-light');
//     document.getElementById('homeNavbar').classList.add('navbar-dark');
//     document.getElementById('homeNavbar').classList.add('bg-dark');
//     document.getElementsByClassName('badge')[0].classList.remove('bg-light');
//     document.getElementsByClassName('badge')[0].classList.add('bg-dark');
//     document.getElementsByClassName('badge')[0].classList.add('text-white');
//     localStorage.setItem('darkMode', 'enabled');
// }
// const disableDarkMode = () => {
//     document.body.classList.remove('dark-mode');
//     document.getElementById('homeNavbar').classList.add('bg-white');
//     document.getElementById('homeNavbar').classList.add('navbar-light');
//     document.getElementById('homeNavbar').classList.remove('navbar-dark');
//     document.getElementById('homeNavbar').classList.remove('bg-dark');
//     document.getElementsByClassName('badge')[0].classList.remove('bg-dark');
//     document.getElementsByClassName('badge')[0].classList.add('bg-light');
//     document.getElementsByClassName('badge')[0].classList.remove('text-white');
//     localStorage.setItem('darkMode', null);
// }
// if (darkMode === 'enabled') {
//     enableDarkMode();
// }
// darkModeToggle.addEventListener('click', () => {
//     darkMode = localStorage.getItem('darkMode');
//     if (darkMode === 'enabled') {
//         disableDarkMode();
//     } else {
//         enableDarkMode();
//     }
// });

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
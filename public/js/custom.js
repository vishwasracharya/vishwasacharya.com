// 💡 Dark & Light Mode Toggle 
function theme() {
    let element = document.body;
    element.classList.toggle("dark-mode");
    let navbar = document.getElementById("navbar")
    navbar.classList.toggle('navbar-dark');
    navbar.classList.toggle('bg-dark');
    navbar.classList.toggle('shadow-white');
    document.getElementById('github').classList.toggle('invert');
}
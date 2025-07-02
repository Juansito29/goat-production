const btnSignIn = document.getElementById('btn-sign-in');
const btnSignUp = document.getElementById('btn-sign-up');
const forms = document.getElementById('forms');
const sidebar = document.getElementById('sidebar');
const signin = document.getElementById('sign-in');
const signup = document.getElementById('sign-up');


btnSignIn.addEventListener('click', ()=>{
    changeSignIn();

});

btnSignUp.addEventListener('click', ()=>{
    changeSignUp();

});

function changeSignIn() {
    forms.classList.remove('active');
    sidebar.classList.remove('active');
    transition(signin)
}

function changeSignUp() {
    forms.classList.add('active');
    sidebar.classList.add('active');
    transition(signup);
}

function transition(parent){
    const children = parent.children;

    Array.from(children).forEach((child) => {
        child.style.opacity = '0';
        child.style.animation = 'none';
    });

    setTimeout(() => {
      Array.from(children).forEach((child, index) => {
        child.style.animation = 'slideIn 0.4s ease forwards';
        let delay = (index * 0.05)+'s';
        child.style.animationDelay = delay;
      });
    }, 300);
}

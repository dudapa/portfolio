const nav = document.querySelector('.nav');
const collapsible = document.querySelector('.collapsible');
const barIcons = document.querySelector('.bar-icons');
const menu = document.querySelector('.menu');
const faBar = document.querySelector('.fa-bars');
const faTimes = document.querySelector('.fa-times');
const skills = document.querySelectorAll('.skill');
const year = document.querySelector('.year');
const form = document.querySelector('.form');
const senderName = document.querySelector('#name');
const email = document.querySelector('#email');
const message = document.querySelector('#message');
const smallName = document.querySelector('.small-name');
const smallEmail = document.querySelector('.small-email');
const smallMessage = document.querySelector('.small-message');
const answer = document.querySelector('.answer');
let numbers = document.querySelector('.number');
let currentYear = new Date().getFullYear();


// Active navigation bar
function activeNav() {
  if (window.scrollY > nav.offsetHeight) {
    nav.classList.add('active');
  } else {
    nav.classList.remove('active');
  }
}

// Show and close menu
function showMenu() {
  barIcons.classList.toggle('show');
  menu.classList.toggle('show');
  faBar.classList.toggle('active');
  faTimes.classList.toggle('active');
}

// Show skill dynamically
function showSkill(ele) {
  let counter = 0;
  let num = Number(ele.textContent.slice(0, 2));
  setInterval(() => {
    if (counter >= num) {
      clearInterval();
    } else {
      counter += 1;
      ele.textContent = `${counter}%`;
    }
  }, 20);
}

// Create the observer for skill section 
const observer = new IntersectionObserver(revealSkill, {
  root: null,
  threshold: 0.3,
});

for (skill of skills) {
  observer.observe(skill);
}

function revealSkill(entries) {
  entries.forEach((entry) => {
    // If the element is visible
    if (entry.isIntersecting) {
      let number = entry.target.querySelector('.number');
      if (!entry.target.classList.contains('animation')) {
        showSkill(number);
      }
      entry.target.classList.add('animation');
    }
  });
}

//  EventListeners
 window.addEventListener('scroll', activeNav);
 collapsible.addEventListener('click', showMenu);
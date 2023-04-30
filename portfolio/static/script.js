const nav = document.querySelector('.nav');
const collapsible = document.querySelector('.collapsible');
const barIcons = document.querySelector('.bar-icons');
const menu = document.querySelector('.menu');
const faBar = document.querySelector('.fa-bars');
const faTimes = document.querySelector('.fa-times');
const skills = document.querySelectorAll('.skill');
const form = document.querySelector('.form');
const senderName = document.querySelector('#name')
const email = document.querySelector('#email');
const message = document.querySelector('#message');
const smallName = document.querySelector('.small-name');
const smallEmail = document.querySelector('.small-email');
const smallMessage = document.querySelector('.small-message');

const successMsg = document.querySelector('.success-message');

// All sections
const sections = document.querySelectorAll('section h1');

// All links
const links = document.querySelectorAll('.menu a');

const menuLinks = document.querySelector('.menu');

// Set year
const currentYear = new Date().getFullYear();
const year = document.querySelector('.year');
year.innerHTML = currentYear;


//  EventListeners
window.addEventListener('scroll', activeNav);
collapsible.addEventListener('click', showMenu);


// Intersection Observers

// Observer for skills
const observer = new IntersectionObserver(revealSkill, {
  root: null,
  threshold: 0.3,
});

for (let skill of skills) {
  observer.observe(skill);
}

// Observer for sections
const option = {
  threshold: 1,
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      links.forEach((link) => {
        link.classList.remove('current');
        const currentLink = link.classList.value;
        const currentSection = e.target.closest('section').id;
        if (`${currentSection}-nav` === currentLink) {
          link.classList.add('current');
        }
      })
      
    }
  });
}, option);

sections.forEach((section) => {
  sectionObserver.observe(section);
})

// Observer to observe Hero 
const obsOpt = {
  threshold: 1
}

const heroObs = new IntersectionObserver(heroCallBack, obsOpt);

heroObs.observe(hero);


//  Functions

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

// Function to load percentage of skill dynamically
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

// Callback function to launch animation of skill circle  
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

// Callback function to remove current class from all links
function heroCallBack(entries, observer) {
  if (entries[0].isIntersecting) {
    links.forEach((link) => {
      link.classList.remove('current');
    });
  }
}

// Close success message after elapsing some time
if (successMsg) {
  setTimeout(() => successMsg.classList.add('vanish'), 4000);
  setTimeout(() => successMsg.classList.add('closed'), 6000);
}

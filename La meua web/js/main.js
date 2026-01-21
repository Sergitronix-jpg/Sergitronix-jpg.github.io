/* DATA JOCS */
const gamesData = {
    'stepland': {
        title: 'STEPLAND: RPG DE VIDA',
        img: 'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
        desc: "Utilitzant les dades del podòmetre del teu mòbil, cada pas que fas al món real es tradueix en experiència per al teu heroi.",
        date: 'Desembre 2024', genre: 'Fitness RPG', plat: 'iOS / Android'
    },
    'neon': {
        title: 'NEON SOUL: OVERDRIVE',
        img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        desc: "Barcelona 2099. Tu ets un glitch en el sistema. Un RPG d'acció frenètica.",
        date: 'Estiu 2025', genre: 'Action RPG', plat: 'PC / PS5'
    },
    'geometry': {
        title: 'GEOMETRY ZEN',
        img: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        desc: "Desconnecta del soroll. Geometry Zen és una experiència de trencaclosques basada en la geometria sagrada.",
        date: 'Disponible', genre: 'Puzzle / Relax', plat: 'Steam / Switch'
    },
    'nature': {
        title: 'NATURE VR',
        img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        desc: "La simulació de natura més realista. Ideal per meditació.",
        date: 'Hivern 2025', genre: 'Simulació / VR', plat: 'Meta Quest 3'
    }
};

/* COOKIES I PRIVADESA */
function checkCookies() {
    if (!localStorage.getItem('cookiesAccepted')) {
        document.getElementById('cookie-banner').classList.remove('d-none');
    }
}
function acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    document.getElementById('cookie-banner').style.display = 'none';
}
function openPolicyModal() {
    new bootstrap.Modal(document.getElementById('policyModal')).show();
}

/* INTRO */
function enterSite() {
    const introScreen = document.getElementById('intro-screen');
    introScreen.style.opacity = '0';
    setTimeout(() => {
        introScreen.style.display = 'none';
        startTypewriter();
        checkCookies(); 
    }, 800);
}

/* CURSOR */
const cursor = document.querySelector('.cursor');
const cursor2 = document.querySelector('.cursor2');
document.addEventListener('mousemove', function(e){
    cursor.style.cssText = cursor2.style.cssText = "left: " + e.clientX + "px; top: " + e.clientY + "px;";
});

/* TYPEWRITER */
const textToType = "DISSENYANT EL FUTUR DEL BENESTAR DIGITAL...";
const typeWriterElement = document.getElementById('typewriter');
let i = 0;
function startTypewriter() {
    if (i < textToType.length) {
        typeWriterElement.innerHTML += textToType.charAt(i);
        i++;
        setTimeout(startTypewriter, 50);
    }
}

/* NAVIGATION */
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(sectionId);
    if (target) { target.classList.add('active'); document.querySelector('.main-content').scrollTop = 0; }
    document.querySelectorAll('.nav-link').forEach(l => {
        l.classList.remove('active');
        if (l.getAttribute('onclick').includes(`'${sectionId}'`)) l.classList.add('active');
    });
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse.classList.contains('show')) new bootstrap.Collapse(navbarCollapse, { toggle: true });
}

/* FILTERS */
function filterProjects(category) {
    document.querySelectorAll('.filter-buttons button').forEach(btn => {
        btn.classList.remove('active');
        if(btn.innerText.toLowerCase().includes(category) || (category === 'all' && btn.innerText === 'Tots')) btn.classList.add('active');
    });
    document.querySelectorAll('.project-item').forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block'; item.style.opacity = '0';
            setTimeout(() => item.style.opacity = '1', 100);
        } else item.style.display = 'none';
    });
}

/* MODAL JOC */
function openGameModal(gameId) {
    const data = gamesData[gameId];
    if(data) {
        document.getElementById('modalTitle').innerText = data.title;
        document.getElementById('modalImg').src = data.img;
        document.getElementById('modalDesc').innerText = data.desc;
        document.getElementById('modalDate').innerText = data.date;
        document.getElementById('modalGenre').innerText = data.genre;
        document.getElementById('modalPlat').innerText = data.plat;
        new bootstrap.Modal(document.getElementById('gameModal')).show();
    }
}

/* FORM */
function handleForm(event) {
    event.preventDefault();
    const btn = event.target.querySelector('button');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Enviant...'; btn.disabled = true;
    setTimeout(() => {
        event.target.reset();
        document.getElementById('success-message').classList.remove('d-none');
        btn.innerHTML = originalText; btn.disabled = false;
        setTimeout(() => document.getElementById('success-message').classList.add('d-none'), 4000);
    }, 1500);
}
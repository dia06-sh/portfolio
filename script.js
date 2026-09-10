// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('site-nav');
navToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});
siteNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  });
});

// Hero terminal typewriter — one orchestrated moment on load
const lines = [
  { prompt: '$ whoami', output: 'dia sharma' },
  { prompt: '$ cat role.txt', output: 'B.Tech CSE (Core), Batch 5, UPES — 2nd year' },
  { prompt: '$ cat skills.txt', output: 'C, Python, HTML/CSS, Linux, Java (learning)' },
  { prompt: '$ ./run.sh', output: 'still debugging, still curious...' }
];

const termBody = document.getElementById('termBody');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function renderStatic() {
  termBody.innerHTML = lines
    .map(l => `<span class="prompt">${l.prompt}</span>\n${l.output}\n`)
    .join('\n');
}

async function typeLine(text, el) {
  for (let i = 0; i < text.length; i++) {
    el.textContent += text[i];
    await new Promise(r => setTimeout(r, 16));
  }
}

async function runTypewriter() {
  for (const line of lines) {
    const promptEl = document.createElement('span');
    promptEl.className = 'prompt';
    termBody.appendChild(promptEl);
    await typeLine(line.prompt, promptEl);
    termBody.appendChild(document.createTextNode('\n'));

    const outputEl = document.createElement('span');
    termBody.appendChild(outputEl);
    await typeLine(line.output, outputEl);
    termBody.appendChild(document.createTextNode('\n\n'));
  }
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  termBody.appendChild(cursor);
}

if (reduceMotion) {
  renderStatic();
} else {
  runTypewriter();
}

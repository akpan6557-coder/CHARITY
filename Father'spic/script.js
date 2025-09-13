const yearEl=document.getElementById('year');
if(yearEl){yearEl.textContent=String(new Date().getFullYear());}

const toggle=document.getElementById('themeToggle');
const root=document.documentElement;

function setTheme(mode){
  if(mode==='light'){root.classList.add('light');localStorage.setItem('theme','light');if(toggle)toggle.textContent='🌙';}
  else{root.classList.remove('light');localStorage.setItem('theme','dark');if(toggle)toggle.textContent='☀️';}
}

const saved=localStorage.getItem('theme');
if(saved==='light'){setTheme('light');}

if(toggle){
  toggle.addEventListener('click',()=>{
    const next=root.classList.contains('light')?'dark':'light';
    setTheme(next);
  });
}

// Populate gallery with all images in folder (manually list; easy to extend)
const galleryFiles=[
  'IMG_9213.JPG',
  'download.jpeg',
  'download (1).jpeg',
  'download (2).jpeg',
  'hands.jpeg',
  'lovehd.jpg',
  'hands.jpg'
];

const grid=document.getElementById('galleryGrid');
if(grid){
  const fragment=document.createDocumentFragment();
  galleryFiles.forEach((name)=>{
    const fig=document.createElement('figure');
    fig.className='card';
    const img=document.createElement('img');
    img.loading='lazy';
    img.alt='Photo';
    // Encode filenames so spaces/parentheses work on Linux servers (e.g., Vercel)
    img.src=encodeURI(name);
    img.addEventListener('error',()=>{
      fig.style.display='none';
    });
    fig.appendChild(img);
    fragment.appendChild(fig);
  });
  grid.appendChild(fragment);
}


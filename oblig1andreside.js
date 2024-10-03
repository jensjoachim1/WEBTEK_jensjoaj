let aktuellSide = 1;
const innleggPerSide = 9;  
const innleggBeholder = document.getElementById('post-boks'); 
const lasterIndikator = document.getElementById('laste');

function hentInnlegg(side) {  
  const apiUrl = `https://jsonplaceholder.typicode.com/posts?_page=${side}&_limit=${innleggPerSide}`;
  lasterIndikator.style.display = 'block'; 

  fetch(apiUrl)
    .then(response => response.json())
    .then(innlegg => {  
      lasterIndikator.style.display = 'none';

      innlegg.forEach(innlegg => {  
        const innleggDiv = document.createElement('div');
        innleggDiv.classList.add('post');
        innleggDiv.innerHTML = `
          <h2>${innlegg.title}</h2>
          <p>${innlegg.body}</p>
        `;
        innleggBeholder.appendChild(innleggDiv);  
      });

      if (innlegg.length === 0) {  
        window.removeEventListener('scroll', skrollHandtering);
        lasterIndikator.innerText = "Ingen flere innlegg å laste.";  
      }
    })
    .catch(error => {
      console.error('Feil ved henting av innlegg:', error);  
      lasterIndikator.style.display = 'none';
    });
}

function skrollHandtering() {
  const skrollPosisjon = window.innerHeight + window.scrollY;
  const dokumentHoyde = document.body.offsetHeight;

  if (skrollPosisjon >= dokumentHoyde - 100) {
    aktuellSide++;
    hentInnlegg(aktuellSide);  
  }
}

hentInnlegg(aktuellSide);  
window.addEventListener('scroll', skrollHandtering);
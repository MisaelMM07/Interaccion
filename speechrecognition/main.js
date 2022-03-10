const texts = document.querySelector('.texts');

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement('p');

recognition.addEventListener('result', (e)=>{
  texts.appendChild(p);
  const text = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

  p.innerText = text;
  if(e.results[0].isFinal){
    if (text.includes('Cómo estás')) {
      p = document.createElement('p');
      p.classList.add('replay');
      p.innerText = 'Felii : )';
      texts.appendChild(p)
    }
    if (text.includes("What's your name") || text.includes('Cuál es tu nombre')) {
      p = document.createElement('p');
      p.classList.add('replay');
      p.innerText = 'Mi nombre es Misael, el amor de tu vida <3.';
      texts.appendChild(p)
    }
    if (text.includes("Ivan") || text.includes('Iván')) {
      p = document.createElement('p');
      p.classList.add('replay');
      p.innerText = 'Alch eres mi perro 🐶';
      texts.appendChild(p)
    }
    if (text.includes('Abre YouTube')) {
      p = document.createElement('p');
      p.classList.add('replay');
      p.innerText = 'Opening YouTube channel';
      texts.appendChild(p)
      console.log('Opening YouTube')
      window.open('https://www.youtube.com')
    }
    p = document.createElement('p');
  }
});


recognition.addEventListener('end', ()=>{
  recognition.start();
})

recognition.start();

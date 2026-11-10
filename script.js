
"use strict";

const continents = [
 {id:"afrikka",name:"Afrikka",emoji:"🦁",visual:"🌅",description:"Afrikassa on lämpimiä savanneja, metsiä ja aavikoita.",fact:"Afrikassa elää esimerkiksi norsuja, leijonia ja kirahveja.",animals:[
  ["Norsu","🐘","Norsulla on pitkä kärsä. Se käyttää kärsäänsä esimerkiksi juomiseen ja ruoan ottamiseen.","norsu"],
  ["Virtahepo","🦛","Virtahepo viettää paljon aikaa vedessä ja osaa uida."],
  ["Leijona","🦁","Leijona on suuri kissaeläin. Se elää usein savannilla.","leijona"],
  ["Kirahvi","🦒","Kirahvilla on pitkä kaula. Sen avulla se ylettyy puiden lehtiin."],
  ["Gorilla","🦍","Gorilla on suuri ihmisapina. Se elää perheryhmissä."]
 ]},
 {id:"aasia",name:"Aasia",emoji:"🐼",visual:"🎋",description:"Aasia on maailman suurin maanosa. Siellä on metsiä ja korkeita vuoria.",fact:"Aasiassa elää esimerkiksi pandoja ja tiikereitä.",animals:[
  ["Kilpikonna","🐢","Kilpikonnalla on kova kilpi, joka suojaa sen kehoa."],
  ["Krokotiili","🐊","Krokotiili elää usein jokien ja järvien lähellä."],
  ["Käärme","🐍","Käärmeellä ei ole jalkoja. Se liikkuu luikertelemalla."],
  ["Tiikeri","🐅","Tiikerillä on oranssi turkki ja mustia raitoja."],
  ["Panda","🐼","Panda on mustavalkoinen karhu. Se syö paljon bambua.","panda"]
 ]},
 {id:"eurooppa",name:"Eurooppa",emoji:"🐺",visual:"🌲",description:"Euroopassa on metsiä, järviä, vuoria ja monenlaisia eläimiä.",fact:"Euroopan metsissä elää esimerkiksi susia, siilejä ja oravia.",animals:[
  ["Hevonen","🐴","Hevonen on vahva eläin. Se pystyy juoksemaan nopeasti."],
  ["Siili","🦔","Siilin selässä on piikkejä. Se etsii ruokaa usein iltaisin."],
  ["Orava","🐿️","Orava kiipeää puissa ja kerää ruokaa talven varalle."],
  ["Susi","🐺","Susi on koiraeläin. Se osaa ulvoa.","susi"],
  ["Poro","🦌","Porolla on sarvet. Se elää kylmillä pohjoisilla alueilla."],
  ["Hirvi","🫎","Hirvi on suuri eläin, jolla on pitkät jalat."],
  ["Jänis","🐇","Jäniksellä on pitkät korvat ja vahvat takajalat."],
  ["Fasaani","🐦","Fasaani on lintu, jolla voi olla pitkä ja värikäs pyrstö."]
 ]},
 {id:"pohjois-amerikka",name:"Pohjois-Amerikka",emoji:"🐻",visual:"🏔️",description:"Pohjois-Amerikassa on metsiä, vuoria, järviä ja kylmiä alueita.",fact:"Pohjois-Amerikassa elää esimerkiksi jääkarhuja ja karhuja.",animals:[
  ["Myskihärkä","🐂","Myskihärällä on paksu turkki, joka auttaa sitä pärjäämään kylmässä."],
  ["Jääkarhu","🐻‍❄️","Jääkarhu elää pohjoisen kylmillä alueilla."],
  ["Ruskeakarhu","🐻","Ruskeakarhu on suuri karhu. Se voi syödä marjoja ja kasveja."]
 ]},
 {id:"etela-amerikka",name:"Etelä-Amerikka",emoji:"🌿",visual:"🌴",description:"Etelä-Amerikassa on sademetsiä, korkeita vuoria ja suuria jokia.",fact:"Etelä-Amerikan luonto on monipuolinen. Siellä on paljon metsiä ja vesistöjä.",animals:[
  ["Tapiiri","🦣","Tapiirilla on lyhyt kärsää muistuttava kuono."]
 ]},
 {id:"oseania",name:"Oseania",emoji:"🦘",visual:"🌊",description:"Oseaniaan kuuluu Australia ja monia Tyynenmeren saaria.",fact:"Australiassa elää monia erikoisia eläimiä, kuten kenguruja ja koaloja.",animals:[
  ["Koala","🐨","Koala elää puissa ja syö eukalyptuksen lehtiä."],
  ["Kenguru","🦘","Kenguru liikkuu hyppimällä ja kantaa poikastaan vatsapussissa.","kenguru"]
 ]},
 {id:"etela-manner",name:"Etelämanner",emoji:"🐧",visual:"❄️",description:"Etelämanner on hyvin kylmä ja jäinen maanosa.",fact:"Etelämanner on jäinen alue. Sen ympäröivissä merissä elää hylkeitä ja valaita.",animals:[
  ["Hylje","🦭","Hylje elää meressä ja lepää joskus jäällä."],
  ["Pingviini","🐧","Pingviini on lintu, joka ei osaa lentää. Se ui hyvin.","pingviini"],
  ["Valas","🐋","Valas on suuri merinisäkäs. Se hengittää ilmaa pinnalla."],
  ["Lokki","🐦","Lokki on lintu, joka viihtyy usein rannikoilla."]
 ]}
];

const STORAGE_KEY = "elainmaailma_progress_v1";

let collectedStars = loadProgress();
let currentQuestion = null;
let currentAudio = null;
let score = 0;
let questionCount = 0;
let questionAnswered = false;

const pageIds = ["home", "map", "continent-page", "quiz", "collection"];

function loadProgress() {
 try {
  const x = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  return Array.isArray(x) ? x : [];
 } catch {
  return [];
 }
}

function saveProgress() {
 try {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(collectedStars));
 } catch (e) {
  console.warn("Tallennus ei onnistunut", e);
 }
}

function earnStar(id) {
 if (!collectedStars.includes(id)) {
  collectedStars.push(id);
  saveProgress();
 }
 updateProgress();
}

function closeMenu() {
 const navigation = document.getElementById("navigation");
 const menuToggle = document.getElementById("menu-toggle");

 if (navigation) navigation.classList.remove("open");

 if (menuToggle) {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Avaa valikko");
 }
}

function showPage(id) {
 pageIds.forEach(x => {
  document.getElementById(x)?.classList.toggle("hidden", x !== id);
 });

 document.querySelectorAll(".nav-button").forEach(b => {
  b.classList.toggle(
   "active",
   b.dataset.page === id ||
   (id === "continent-page" && b.dataset.page === "map")
  );
 });

 closeMenu();
 window.scrollTo({ top: 0, behavior: "smooth" });
 updateProgress();
}

function showHome() {
 stopSpeech();
 showPage("home");
}

function showMap() {
 stopSpeech();
 renderContinents();
 showPage("map");
}

function showCollection() {
 stopSpeech();
 renderCollection();
 showPage("collection");
}

function showQuiz() {
 stopSpeech();
 showPage("quiz");
 if (!currentQuestion) newQuestion();
}

const menuToggle = document.getElementById("menu-toggle");

if (menuToggle) {
 menuToggle.addEventListener("click", () => {
  const navigation = document.getElementById("navigation");
  const open = navigation.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute(
   "aria-label",
   open ? "Sulje valikko" : "Avaa valikko"
  );
 });
}

function updateProgress() {
 const n = collectedStars.length;
 const p = n / continents.length * 100;

 [
  ["progress-text", `${n} / 7 maanosaa tutkittu`],
  ["home-progress-text", `${n} / 7 maanosaa tutkittu`],
  ["collection-count", `${n} / 7 tähteä`]
 ].forEach(([id, t]) => {
  const e = document.getElementById(id);
  if (e) e.textContent = t;
 });

 ["progress-bar", "home-progress-bar"].forEach(id => {
  const e = document.getElementById(id);
  if (e) e.style.width = p + "%";
 });
}

/* Kuvien tiedostonimet */
function getImageFile(name) {
 const files = {
  "Myskihärkä": "myskihärkä.jpg",
  "Jääkarhu": "jääkarhu.jpg",
  "Ruskeakarhu": "ruskeakarhu.jpg",
  "Jänis": "jänis.jpg"
 };

 return files[name] || name.toLowerCase() + ".jpg";
}

/* Näyttää maanosat */
function renderContinents() {
 const list = document.getElementById("continent-list");
 if (!list) return;

 list.innerHTML = continents.map(c => `
  <button class="continent-card" onclick="openContinent('${c.id}')">
   <div class="continent-visual">${c.emoji}<small>${c.visual}</small></div>
   <h3>${c.name}</h3>
   <p>${c.description}</p>
   <div class="continent-bottom">
    <span>${collectedStars.includes(c.id) ? "⭐ Tutkittu" : "Tutkimaan →"}</span>
    <span>🐾</span>
   </div>
  </button>
 `).join("");

 updateProgress();
}

/* Tavujen jakaminen */
function splitSyllables(word) {
 const vowels = "aeiouyäö";
 let parts = [];
 let i = 0;

 while (i < word.length) {
  let start = i;

  while (i < word.length && !vowels.includes(word[i].toLowerCase())) i++;

  if (i >= word.length) {
   if (parts.length) parts[parts.length - 1] += word.slice(start);
   else parts.push(word.slice(start));
   break;
  }

  i++;

  while (i < word.length && !vowels.includes(word[i].toLowerCase())) i++;

  if (i < word.length && vowels.includes(word[i].toLowerCase())) {
   let consonant = i - 1;
   if (consonant > start) i = consonant;
  }

  parts.push(word.slice(start, i));
 }

 return parts.length ? parts : [word];
}

function syllableMarkup(text) {
 return text.split(/(\s+|[.,!?;:]+)/).map(token => {
  if (!token || /^\s+$/.test(token) || /^[.,!?;:]+$/.test(token)) {
   return token;
  }

  return splitSyllables(token)
   .map(s => `<span class="syllable">${s}</span>`)
   .join("");
 }).join("");
}

/* Ääneen lukeminen */
let speechToken = 0;

function stopSpeech() {
 speechToken++;

 if ("speechSynthesis" in window) {
  window.speechSynthesis.cancel();
 }
}

function speakElement(elementId) {
 stopSpeech();

 if (!("speechSynthesis" in window)) {
  alert("Laitteen selain ei tue ääneen lukemista.");
  return;
 }

 const el = document.getElementById(elementId);
 if (!el) return;

 const spans = [...el.querySelectorAll(".syllable")];
 const text = el.dataset.plain || el.textContent;
 const token = speechToken;

 const utterance = new SpeechSynthesisUtterance(text);
 utterance.lang = "fi-FI";
 utterance.rate = 0.82;

 utterance.onstart = () => {
  let i = 0;

  const tick = () => {
   if (token !== speechToken || i >= spans.length) return;

   spans.forEach(s => s.classList.remove("active"));
   spans[i].classList.add("active");
   i++;

   setTimeout(tick, Math.max(180, text.length * 35));
  };

  tick();
 };

 utterance.onend = () => {
  spans.forEach(s => s.classList.remove("active"));
 };

 window.speechSynthesis.speak(utterance);
}

/* Yksittäisen eläimen kuva */
function animalImage(name, emoji) {
 const file = getImageFile(name);

 return `
  <div class="animal-picture">
   <img
    src="kuvat/${file}"
    alt="${name}"
    loading="lazy"
    onerror="this.style.display='none';this.nextElementSibling.style.display='block';"
   >
   <span style="display:none">${emoji}</span>
  </div>
 `;
}

/* Avaa maanosa ja sen eläimet */
function openContinent(id) {
 const c = continents.find(x => x.id === id);
 if (!c) return;

 stopSpeech();
 earnStar(id);

 const animalCards = c.animals.map((a, i) => {
  const descid = `desc-${id}-${i}`;

  return `
   <article class="animal-card">
    ${animalImage(a[0], a[1])}

    <div>
     <h3>${a[0]}</h3>

     <p
      id="${descid}"
      class="read-text"
      data-plain="${a[2]}"
     >${syllableMarkup(a[2])}</p>

     <button class="read-button" onclick="speakElement('${descid}')">
      🔊 Lue tieto
     </button>

     ${a[3] ? `
      <button class="animal-sound" onclick="playAnimalSound('${a[3]}.mp3')">
       🐾 Eläimen ääni
      </button>
     ` : ""}
    </div>
   </article>
  `;
 }).join("");

 document.getElementById("continent-information").innerHTML = `
  <div class="continent-hero">
   <div class="big-emoji">${c.emoji}</div>
   <span class="eyebrow">TUTKIMUSKOHDE</span>
   <h1>${c.name}</h1>
   <p>${c.description}</p>
   <strong>⭐ Tähti lisätty kokoelmaasi!</strong>
  </div>

  <div class="fact-box">
   <h2>📖 Tiesitkö tämän?</h2>
   <p id="continent-fact" class="read-text" data-plain="${c.fact}">
    ${syllableMarkup(c.fact)}
   </p>
   <button class="read-button" onclick="speakElement('continent-fact')">
    🔊 Lue ääneen
   </button>
  </div>

  <h2>🐾 Tutustu eläimiin</h2>
  <div class="animal-grid">${animalCards}</div>

  <button class="primary-button" style="margin-top:25px" onclick="showMap()">
   ← Takaisin maanosiin
  </button>
 `;

 showPage("continent-page");
}

/* Tähtikokoelma */
function renderCollection() {
 const list = document.getElementById("collection-list");
 if (!list) return;

 list.innerHTML = continents.map(c => {
  const yes = collectedStars.includes(c.id);

  return `
   <div class="collection-item ${yes ? "collected" : ""}">
    <span>${yes ? "⭐" : "🔒"}</span>
    <strong>${c.name}</strong>
    <small>${yes ? "Tutkittu!" : "Ei vielä tutkittu"}</small>
   </div>
  `;
 }).join("");

 document.getElementById("finish-message").innerHTML =
  collectedStars.length === 7
   ? "<span>🏆</span><h2>ONNEKSI OLKOON!</h2><p>Olet tutkinut kaikki seitsemän maanosaa!</p>"
   : `<span>🌍</span><h2>Suuri tutkimusmatka odottaa!</h2><p>Olet kerännyt ${collectedStars.length} / 7 tähteä. Jatka tutkimista!</p>`;

 updateProgress();
}

/* Äänivisa */
function shuffle(a) {
 return [...a].sort(() => Math.random() - 0.5);
}

const quizAnimals = [
 {name:"Leijona",emoji:"🦁",file:"leijona.mp3"},
 {name:"Norsu",emoji:"🐘",file:"norsu.mp3"},
 {name:"Panda",emoji:"🐼",file:"panda.mp3"},
 {name:"Kenguru",emoji:"🦘",file:"kenguru.mp3"},
 {name:"Pingviini",emoji:"🐧",file:"pingviini.mp3"},
 {name:"Susi",emoji:"🐺",file:"susi.mp3"}
];

function newQuestion() {
 stopQuizSound();

 questionAnswered = false;
 questionCount++;

 currentQuestion = quizAnimals[
  Math.floor(Math.random() * quizAnimals.length)
 ];

 const answers = shuffle([
  currentQuestion,
  ...shuffle(quizAnimals.filter(a => a !== currentQuestion)).slice(0, 3)
 ]);

 document.getElementById("question-number").textContent = questionCount;
 document.getElementById("quiz-feedback").textContent = "";
 document.getElementById("sound-status").textContent = "Ääni odottaa kuuntelua.";
 document.getElementById("next-question").classList.add("hidden");

 document.getElementById("quiz-answers").innerHTML = answers.map(a => `
  <button class="answer-button" onclick="checkAnswer('${a.name}',this)">
   ${a.emoji} ${a.name}
  </button>
 `).join("");
}

function playAnimalSound(file) {
 playAudio(file);
}

function playQuizSound() {
 if (currentQuestion) playAudio(currentQuestion.file);
}

function playAudio(file) {
 stopQuizSound();

 currentAudio = new Audio("aanet/" + file);

 const status = document.getElementById("sound-status");

 if (status) status.textContent = "🔊 Kuunnellaan...";

 currentAudio.addEventListener("ended", () => {
  if (status) status.textContent = "Ääni loppui. Voit kuunnella uudestaan!";
 });

 currentAudio.addEventListener("error", () => {
  if (status) status.textContent = "Äänitiedostoa ei löytynyt aanet-kansiosta.";
 });

 currentAudio.play().catch(() => {
  if (status) status.textContent = "Äänen toisto ei onnistunut. Tarkista tiedosto.";
 });
}

function stopQuizSound() {
 if (currentAudio) {
  currentAudio.pause();
  currentAudio.currentTime = 0;
  currentAudio = null;
 }
}

function checkAnswer(answer, button) {
 if (questionAnswered) return;

 questionAnswered = true;

 document.querySelectorAll(".answer-button").forEach(b => {
  b.disabled = true;

  if (b.textContent.includes(currentQuestion.name)) {
   b.classList.add("correct");
  }
 });

 const f = document.getElementById("quiz-feedback");

 if (answer === currentQuestion.name) {
  score++;
  f.textContent = "🎉 Oikein! Hienosti arvattu!";
  button.classList.add("correct");
 } else {
  f.textContent = "Melkein! Oikea vastaus oli " + currentQuestion.name + ".";
  button.classList.add("wrong");
 }

 document.getElementById("score").textContent = score;
 document.getElementById("next-question").classList.remove("hidden");
}

/* Käynnistä sivusto */
function initializeWebsite() {
 renderContinents();
 renderCollection();
 updateProgress();
 showHome();
}

initializeWebsite();

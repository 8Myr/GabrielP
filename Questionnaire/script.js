const rep1 = document.getElementById("rep1");
const rep2 = document.getElementById("rep2");
const reponse = document.getElementById("rep");
const questionContainer = document.getElementById("caisse");
const nextp = document.getElementById("nextpage");

let correct = 0;
let incorrect = 0;

function disableButtons() {
  rep1.disabled = true;
  rep2.disabled = true;
}

rep1.addEventListener("click", () => {
  rep1.style.background = "Green";
  rep2.style.background = "#b8163c";
  reponse.style.visibility = "visible";
  nextp.style.visibility = "visible";
  nextp.style.background = "grey";
  correct++;
  console.log(`Bonnes réponses : ${correct}`);
  disableButtons();
});

rep2.addEventListener("click", () => {
  rep1.style.background = "Green";
  rep2.style.background = "#b8163c";
  reponse.style.visibility = "visible";
  nextp.style.visibility = "visible";
  nextp.style.background = "blue";
  incorrect++;
  console.log(`Bonnes réponses : ${incorrect}`);
  disableButtons();
});

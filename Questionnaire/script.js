const rep1 = document.getElementById("rep1");
const rep2 = document.getElementById("rep2");
const reponse = document.getElementById("rep");
const questionContainer = document.getElementById("caisse");

rep1.addEventListener("click", () => {
  rep1.style.background = "Green";
  rep2.style.background = "#b8163c";
  reponse.style.visibility = "visible";
});

rep2.addEventListener("click", () => {
  rep1.style.background = "Green";
  rep2.style.background = "#b8163c";
  reponse.style.visibility = "visible";
});

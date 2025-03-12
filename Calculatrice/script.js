const input1 = document.getElementById("i1");
const input2 = document.getElementById("i2");
const res = document.getElementById("res");

document.querySelector(".btnplus").addEventListener("click", () => {
  res.innerText = parseInt(input1.value, 10) + parseInt(input2.value, 10);
});

document.querySelector(".btnmoins").addEventListener("click", () => {
  res.innerText = parseInt(input1.value, 10) + parseInt(input2.value, 10);
});

document.querySelector(".btnmult").addEventListener("click", () => {
  res.innerText = parseInt(input1.value, 10) + parseInt(input2.value, 10);
});

const startBtn = document.querySelector(".start-button");
const backboard = document.getElementById("backboard");
const hackerTextEl = document.querySelector(".code-column");
const allTextChars = hackerTextEl.textContent.split("");

startBtn.addEventListener("click", () => {
	hackerTextEl.textContent = " ";
	backboard.style.height = "50vh";
	startBtn.style.display = "none";
	let i = 0;
	setInterval(() => {
		i++;
		if (i < allTextChars.length) {
			hackerTextEl.textContent += allTextChars[i];
		}
	}, 40);
});
document.addEventListener("DOMContentLoaded", () => {
    const hiddenButton = document.querySelector(".hidden-button");
  
    setTimeout(() => {
      hiddenButton.style.display = "block";
    }, 10000);
    hiddenButton.addEventListener("click", () => {
      window.location.href = "/paginas/jogo.html"; 
    });
  });
  document.addEventListener("DOMContentLoaded", () => {
    const hiddenButton2 = document.querySelector(".hidden-button2");
  
    setTimeout(() => {
      hiddenButton2.style.display = "block";
    }, 10000);
    hiddenButton2.addEventListener("click", () => {
      window.location.href = "/paginas/jogo2.html"; 
    });
  });
  document.addEventListener("DOMContentLoaded", () => {
    const hiddenButton3 = document.querySelector(".hidden-button3");
  
    setTimeout(() => {
      hiddenButton3.style.display = "block";
    }, 100);
    hiddenButton3.addEventListener("click", () => {
      window.location.href = "/index.html"; 
    });
  });
/* 
TODO: 
- maybe add background with small shapes like circles squares triangles
  with curved angles, maybe going in rows diagonally
- centralize #preview
*/

let showHideBtns = document.querySelectorAll(".show-hide");
let pageContents = document.querySelector(".page-content");

for (let showHideBtn of Array.from(showHideBtns)) {
    showHideBtn.addEventListener("click", () => {
        showHideBtn.classList.toggle("open");
        let pageContent = showHideBtn.parentElement.nextElementSibling;
        pageContent.classList.toggle("open");

        let remainingBtns = Array.from(showHideBtns).filter(b => b !== showHideBtn);
        for (let showHideBtn of remainingBtns) {
            showHideBtn.classList.remove("open")
            let pageContent = showHideBtn.parentElement.nextElementSibling;
            pageContent.classList.remove("open");
        }
    });
}

let switchThemeBtn = document.querySelector("#theme-switch");
switchThemeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    switchThemeBtn.classList.toggle("dark-mode");
});

let showHideBtns = document.querySelectorAll(".show-hide");
let pageContents = document.querySelector(".page-content");

for (let showHideBtn of Array.from(showHideBtns)) {
    showHideBtn.addEventListener("click", () => {
        showHideBtn.setAttribute("data-opened", 
            showHideBtn.getAttribute("data-opened") == "true" ? "false" : "true"
        );
        let pageContent = showHideBtn.parentElement.nextElementSibling;
        pageContent.setAttribute("data-opened", 
            pageContent.getAttribute("data-opened") == "true" ? "false" : "true"
        );

        let remainingBtns = Array.from(showHideBtns).filter(b => b !== showHideBtn);
        for (let showHideBtn of remainingBtns) {
            showHideBtn.setAttribute("data-opened", "false");
            let pageContent = showHideBtn.parentElement.nextElementSibling;
            pageContent.setAttribute("data-opened", "false");
        }
    });
}
function changeText() {
    document.getElementById("titre").innerHTML = "New title";
}

function genererEchiquier() {
    const echequier = document.getElementById("echiquier");
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8;j++) {
            const caseDiv = document.createElement("div");
            caseDiv.classList.add("case");

            if ((i + j) % 2 == 0) {
                caseDiv.classList.add("blanche");
            } else {
                caseDiv.classList.add("noire");
            }

            echequier.appendChild(caseDiv);
        }
    }
}

let compter = 0
function incrementer() {
    compter++;
    document.getElementById("compter").innerHTML = compter;
}
let asc =0;
let contadorNota = 0;
let nota = 0;
const main = document.querySelector("main");
let quizz;


function renderizarTela2(response) {
    main.innerHTML = `
        <div class="quizzBackground" style="
            background: linear-gradient(to bottom, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), 
            url(${response.image});
            background-size: cover;
            background-position: center;">
            <h1>
                ${response.title}
            </h1>
        </div>
        <div class="quizzQuestions">
        </div>
        <div class="containerResults">
        </div>
        <div class="botoesQuizz">
        </div>
  `;
    questoes_quizz(response);
}
function questoes_quizz(parametro) {
    console.log(parametro)
    let adicionarQuizz = document.querySelector(".quizzQuestions");
    console.log(adicionarQuizz)
    quizz = parametro
    for (let j = 0; j < parametro.questions.length; j++) {
        let sorteador = parametro.questions;
        sorteador[j].answers.sort(comparador)
        adicionarQuizz.innerHTML +=
            `<div id="a${j}" class="containerQuestion">        
        <div class="questionLine" style = "background-color:${sorteador[j].color} ;"><h1>${sorteador[j].title}</h1></div>
        </div>`;


        for (let i = 0; i < sorteador[j].answers.length; i++) {
            let adicionarPerguntasum = adicionarQuizz.querySelector(`#a${j}.containerQuestion`);
        console.log(adicionarPerguntasum)

            adicionarPerguntasum.innerHTML += `<div class="questionOptions" onclick="selecionarResposta(this)">
        <img src=${sorteador[j].answers[i].image}>
        <p class="questionOptions ${sorteador[j].answers[i].isCorrectAnswer} oculta">${sorteador[j].answers[i].text}</p>`;
        }
        console.log(sorteador[j].answers)
    }
    scrollar();

    function scrollar() {
        let scroler = document.querySelector("main").scrollIntoView();
    }
}
function comparador() {
    return Math.random() - 0.5;
}


function finalQuizz() {

    nota = Math.round((contadorNota * 100) / quizz.questions.length);
    console.log(nota);
    for (let i = (quizz.levels.length - 1); i >= 0; i = i - 1) {
        if (nota >= quizz.levels[i].minValue) {
            let addFim = document.querySelector(".containerResults");
            addFim.innerHTML = `      
            <div class="resultLine">
                <h1> ${nota}% de acerto: ${quizz.levels[i].title} </h1>
            </div>
            <div class="quizzResults">
                <img src=${quizz.levels[i].image}>
                <div class="quizzResultsText">
                    <h4>${quizz.levels[i].text}<h4>
                </div>        
            </div>       
            `;
        }
    }
    let addBotao = document.querySelector("botoesQuizz");
    addBotao.innerHTML = `
    <button>Acessar Quizz</button>
    <a href="index.html" rel="prev"><button class="home">Voltar pra home</button></a>`
}

function selecionarResposta(elemento) {
    console.log(elemento.querySelector(".true"));


    elemento.classList.remove("auxiliar");
    elemento.querySelector(".questionOptions").classList.remove("oculta");

    elemento.querySelector(".questionOptions").classList.add("clicada");

    const pai = elemento.parentNode.parentNode;
    console.log(pai);

    if (elemento.querySelector(".true") !== null) {
        contadorNota++;
    }
    console.log(contadorNota);

    for (let i = 0; i < 3; i++) {
        let aux = pai.querySelector("questionOptions");
        if (aux !== null) {
            aux.classList.remove("auxiliar");
            aux.classList.add("naoclicada");
            aux.querySelector(".questionOptions").classList.remove("oculta");
        }
    }
    if (asc <= quizz.length) {
        setTimeout(scrollar, 2000);

        function scrollar() {
            let scrolll = document.querySelector(`.containerQuestion:nth-child(${asc})`).scrollIntoView();
            asc++;
        }
    } else {
        finalQuizz();
        setTimeout(scrollar, 2000);

        function scrollar() {
            let scrolll = document.querySelector(".finalizador").scrollIntoView();
        }
    }


}

let asc =0;
let contadorNota = 0;
let nota = 0;
const main = document.querySelector("main");


function renderizarTela2(response) {
  console.log(response);
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
  `;
    questoes_quizz(response);
}
function questoes_quizz(quizz) {
    console.log(quizz)
    let adicionarQuizz = document.querySelector(".quizzQuestions");
    console.log(adicionarQuizz);
    for (let j = 0; j < quizz.questions.length; j++) {
        let sorteador = quizz.questions;
        sorteador[j].answers.sort(comparador)
        adicionarQuizz.innerHTML +=
            `<div id="a${j}" class="containerQuestion">        
        <div class="questionLine" style = "background-color:${sorteador[j].color} ;"><h1>${sorteador[j].title}</h1></div>
        </div>`;


        for (let i = 0; i < sorteador[j].answers.length; i++) {
            let adicionarPerguntasum = adicionarQuizz.querySelector(`#a${j}.containerQuestion`);
        console.log(adicionarPerguntasum)

            adicionarPerguntasum.innerHTML += `<div class="questionOptions">
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

    nota = Math.round((contadorNota * 100) / quizzQuestions.length);
    console.log(nota);
    for (let i = (quizz.levels.length - 1); i >= 0; i = i - 1) {
        if (nota >= quizz.levels[i].minValue) {
            let addFim = document.querySelector(".containerResults");
            addFim.innerHTML = `      
            <div class="img-topo-fim">
                <h2> ${nota}% de acerto: ${quizz.levels[i].title} </h2>
            </div>
            <div class="quizzResultsText">
            <img src=${quizz.levels[i].image}>
            <p class="texto-fim">${quizz.levels[i].text}</p>          
            </div>
            </div>        
            `;
        }
    }
    let addBotao = document.querySelector("botoesQuizz");
    addBotao.innerHTML = `
<div class="button.home" onclick="voltarInicial()"><p>Voltar pra home</p></div>`
}

function selecionarResposta(elemento) {
    console.log(elemento.querySelector(".true"));


    elemento.classList.remove("auxiliar");
    elemento.querySelector(".opcao-resposta").classList.remove("oculta");

    elemento.querySelector(".opcao-resposta").classList.add("clicada");

    const pai = elemento.parentNode.parentNode;
    console.log(pai);

    if (elemento.querySelector(".true") !== null) {
        contadorNota++;
    }
    console.log(contadorNota);

    for (let i = 0; i < 3; i++) {
        let aux = pai.querySelector(".auxiliar");
        if (aux !== null) {
            aux.classList.remove("auxiliar");
            aux.classList.add("naoclicada");
            aux.querySelector(".opcao-resposta").classList.remove("oculta");
        }
    }
    if (asc <= quizz.questions.length) {
        setTimeout(scrollar, 2000);

        function scrollar() {
            let scrolll = document.querySelector(`.caixa-quizz:nth-child(${asc})`).scrollIntoView();
            asc++;
        }
    } else {
        implementar_finalizador();
        setTimeout(scrollar, 2000);

        function scrollar() {
            let scrolll = document.querySelector(".finalizador").scrollIntoView();
        }
    }


}

window.renderizarTela2 = renderizarTela2
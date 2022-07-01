let userQuizz = {
    title: "",
    image: "",
    questions:[],
    levels:[]
}

let qQuestion
let nLevels


function apiPost(){
    axios.post("https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes",userQuizz)
    .then(renderPronto)
    .catch((err) => {
        alert("deu ruim")
    });
}

function renderTela3() {
    document.querySelector("main").innerHTML = `
    <div class="tela3">
        <div class="container">
            <div class="criarQuizz">
                <div class="comeco">
                    <h1>Comece pelo começo</h1>
                    <div class="caixaPergunta">
                        <input id = "title" type="text" placeholder="Título  do seu quizz">
                        <input id = "url" type="url" placeholder="URL da imagem do seu quizz">
                        <input id = "qQuestion" type="number" placeholder="Quantidade de perguntas do quizz">
                        <input id = "qLevels" type="number" placeholder="Quantidade de níveis do quizz">
                    </div>
                    <button onclick = "renderPerguntas()">Prosseguir pra criar perguntas</button>
                </div>
            </div>
        </div>
    `
}

function savequizz1(){
    
}

function renderPerguntas() {
    qQuestion = Number(document.querySelector(".tela3 .comeco #qQuestion").value)
    nLevels = Number(document.querySelector(`.tela3 .comeco #qLevels`).value)
    let n = 1

    userQuizz.title = String(document.querySelector(".tela3 .comeco #title").value)
    userQuizz.image = String(document.querySelector(".tela3 .comeco #url").value)

    console.log(userQuizz)
    document.querySelector(".tela3 .criarQuizz").innerHTML = `
                <div class="criarPerguntas ">
                    <h1>Crie sua pergunta</h1>
                    <ul></ul>
                    <button onclick = "saveQuestions()">Prosseguir pra criar níveis</button>
                </div>
    `
    for (let i = 0; i < qQuestion; i++) {
        document.querySelector(".tela3 .criarQuizz ul").innerHTML += `     
                    <li class="caixaPergunta" id = "qAnswer_${i}">
                        <h1>Pergunta ${n}</h1>
                        <input type="text" id="titleQuestion" placeholder="Texto da pergunta">
                        <input type="text" id="colorQuestion" placeholder="Cor de fundo da pergunta">
                        <h1>Resposta Correta</h1>
                        <input type="text" id="answerTrue" placeholder="Resposta correta">
                        <input type="url" id="urlAnswertrue" placeholder="URL da imagem">
                        <h1>Resposta incorretas</h1>
                        <input type="text" id="answerFalse1" placeholder="Resposta incorreta 1">
                        <input type="url" id="urlAnswerFalse1" placeholder="URL da imagem">
                        <input type="text" id="answerFalse2" placeholder="Resposta incorreta 2">
                        <input type="url" id="urlAnswerFalse2" placeholder="URL da imagem">
                        <input type="text" id="answerFalse3" placeholder="Resposta incorreta 3">
                        <input type="url" id="urlAnswerFalse3" placeholder="URL da imagem">
                    </li>          
    `
    n++
    }
}

function saveQuestions(){

    for (let i=0;i<qQuestion;i++){
        let nQuestion = document.querySelector(`.tela3 .caixaPergunta#qAnswer_${i}`)
        userQuizz.questions[i]= {
            title: String(nQuestion.querySelector(`#titleQuestion`).value),
            color: String(nQuestion.querySelector(`#colorQuestion`).value),
            answers:[]
        }
    }
    saveAnswer()
}

function saveAnswer(){
    for (let i=0;i<qQuestion;i++){
        let nQuestion = document.querySelector(`.tela3 .caixaPergunta#qAnswer_${i}`)

        if (nQuestion.querySelector(`#answerFalse1`).value !== "" && nQuestion.querySelector(`#answerTrue`).value !== ""){
            if (nQuestion.querySelector(`#answerFalse2`).value !== "" ){
                if (nQuestion.querySelector(`#answerFalse3`).value !== ""){
                    userQuizz.questions[i].answers=[{
                        text: String(nQuestion.querySelector(`#answerTrue`).value),
                        image: String(nQuestion.querySelector(`#urlAnswertrue`).value),
                        isCorrectAnswer: true
                    },
                    {
                        text: String(nQuestion.querySelector(`#answerFalse1`).value),
                        image: String(nQuestion.querySelector(`#urlAnswerFalse1`).value),
                        isCorrectAnswer: false
                    },
                    {
                        text: String(nQuestion.querySelector(`#answerFalse2`).value),
                        image: String(nQuestion.querySelector(`#urlAnswerFalse2`).value),
                        isCorrectAnswer: false
                    },
                    {
                        text: String(nQuestion.querySelector(`#answerFalse3`).value),
                        image: String(nQuestion.querySelector(`#urlAnswerFalse3`).value),
                        isCorrectAnswer: false
                    }]
                    
                }else{
                    userQuizz.questions[i].answers=[{
                        text: String(nQuestion.querySelector(`#answerTrue`).value),
                        image: String(nQuestion.querySelector(`#urlAnswertrue`).value),
                        isCorrectAnswer: true
                    },
                    {
                        text: String(nQuestion.querySelector(`#answerFalse1`).value),
                        image: String(nQuestion.querySelector(`#urlAnswerFalse1`).value),
                        isCorrectAnswer: false
                    },
                    {
                        text: String(nQuestion.querySelector(`#answerFalse2`).value),
                        image: String(nQuestion.querySelector(`#urlAnswerFalse2`).value),
                        isCorrectAnswer: false
                    }]
                    
                }
            }else{
                userQuizz.questions[i].answers=[{
                    text: String(nQuestion.querySelector(`#answerTrue`).value),
                    image: String(nQuestion.querySelector(`#urlAnswertrue`).value),
                    isCorrectAnswer: true
                },
                {
                    text: String(nQuestion.querySelector(`#answerFalse1`).value),
                    image: String(nQuestion.querySelector(`#urlAnswerFalse1`).value),
                    isCorrectAnswer: false
                }]
                
            }
        }else alert (`Na pergunta ${i+1} é obrigatorio que tenha pelo menos uma certa e errada`)
    }
    renderNiveis()
}

function renderNiveis() {
    
    document.querySelector(".tela3 .criarQuizz").innerHTML = `
                <div class="criarNiveis">
                    <h1>Agora, decida os níveis</h1>
                    <ul></ul>
                    <button onclick = "saveLevels()">Prosseguir pra criar níveis</button>
                </div>
    `
    for(let i=0; i < nLevels;i++){
        document.querySelector(`.tela3 .criarQuizz ul`).innerHTML += `
                    <li class="caixaPergunta" id="qLevels_${i}">
                        <h1>Nível ${i+1}</h1>
                        <input type="text" id = "titleLevel" placeholder="Título do nível">
                        <input type="number" id = "percentage" placeholder="% de acerto mínima">
                        <input type="url"  id = "url" placeholder="URL da imagem do nível">
                        <input type="text" id = "text" placeholder="Descrição do nível">
                    </li>
    `}
}

function saveLevels(){
   
    for (let i=0;i<nLevels;i++){
        let level = document.querySelector(`.tela3 .caixaPergunta#qLevels_${i}`)
        userQuizz.levels[i] = 
            {
                image: String(level.querySelector(`#url`).value),
                title: String(level.querySelector(`#titleLevel`).value),
                text: String(level.querySelector(`#text`).value),
                minValue: Number(level.querySelector(`#percentage`).value)
            }
    }
    console.log(userQuizz)
    storageQuizz()
}

function renderPronto() {
    storageQuizz()
    document.querySelector(".tela3 .criarQuizz").innerHTML = `
                <div class="quizzPronto">
                    <div class="quizz" style="
                    background:linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%),
                    url(${userQuizz.image});
                    background-size: cover;
                    background-position: center;">
                        <h1>${userQuizz.title}</h1>
                    </div>
                    <button>Acessar Quizz</button>
                    <a href="index.html" rel="prev"><button class="home">Voltar pra home</button></a>
                </div>
    `
}
let listUserQuizz = []
   

function storageQuizz() {
    listUserQuizz.push(JSON.parse(localStorage.getItem("User")))
    console.log(listUserQuizz)
    listUserQuizz.push(userQuizz)  
    localStorage.setItem("Useri", JSON.stringify(listUserQuizz))
    console.log(listUserQuizz)
    console.log(userQuizz)
}

window.renderTela3 = renderTela3
window.saveQuestions = saveQuestions
window.saveLevels = saveLevels
window.renderPerguntas = renderPerguntas
window.renderNiveis = renderNiveis
window.renderPronto = renderPronto

console.log("t3")


export default function renderizarTela2(listaQuizzes){
    let result = listaQuizzes + 1
    return result
}
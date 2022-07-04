let userQuizz = {
    title: "",
    image: "",
    questions: [],
    levels: []
}
let listUserQuizz = []

let qQuestion
let nLevels





function apiPost() {
    axios.post("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes", userQuizz)
        .then((promise)=> renderPronto(promise))
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
                    <button onclick = "saveBegin()">Prosseguir pra criar perguntas</button>
                </div>
            </div>
        </div>
    `
}

function saveBegin() {
    qQuestion = Number(document.querySelector(".tela3 .comeco #qQuestion").value)
    nLevels = Number(document.querySelector(`.tela3 .comeco #qLevels`).value)

    let title = String(document.querySelector(".tela3 .comeco #title").value)
    let image = String(document.querySelector(".tela3 .comeco #url").value)
    let regexURL = image.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)

    if (title.length >= 20 && title.length <= 65) {
        if (regexURL) {
            if (qQuestion >= 3) {
                if (nLevels >= 2) {
                    userQuizz.title = title
                    userQuizz.image = image
                    renderPerguntas()
                } else alert(`Deve ter pelo menos 2 níveis`)
            } else alert(`Deve ter pelo menos 3 perguntas`)
        } else alert(`A imagem do quizz deve ser no formato URL`)
    } else alert(`O titulo do quizz deve ter entre 20 a 65 caracteres`)
}


function renderPerguntas() {
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
                        <h1>Pergunta ${i + 1}</h1>
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
    }
}

function saveQuestions() {
    let i = 0

    for (i; i < qQuestion; i++) {
        let nQuestion = document.querySelector(`.tela3 .caixaPergunta#qAnswer_${i}`)
        let title = String(nQuestion.querySelector(`#titleQuestion`).value)
        let color = String(nQuestion.querySelector(`#colorQuestion`).value)

        if (title.length >= 20) {
            if (color.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
                userQuizz.questions[i] = {
                    title: title,
                    color: color,
                    answers: []
                }

            } else alert(`Na cor da pergunta ${i + 1} tem que ser um valor hexadecimal (#EC362D)`)
        } else alert(`No texto da pergunta ${i + 1} tem que ter pelo menos 20 caracteres`)
    }
    if (i === qQuestion) {
        console.log(userQuizz)
        saveAnswer()
    }
}

function saveAnswer() {
    let i = 0
    for (i; i < qQuestion; i++) {
        let nQuestion = document.querySelector(`.tela3 .caixaPergunta#qAnswer_${i}`)
        let answerTrue = String(nQuestion.querySelector(`#answerTrue`).value)
        let urlTrue = String(nQuestion.querySelector(`#urlAnswertrue`).value)
        let answerFalse1 = String(nQuestion.querySelector(`#answerFalse1`).value)
        let urlFalse1 = String(nQuestion.querySelector(`#urlAnswerFalse1`).value)
        let answerFalse2 = String(nQuestion.querySelector(`#answerFalse2`).value)
        let urlFalse2 = String(nQuestion.querySelector(`#urlAnswerFalse2`).value)
        let answerFalse3 = String(nQuestion.querySelector(`#answerFalse3`).value)
        let urlFalse3 = String(nQuestion.querySelector(`#urlAnswerFalse3`).value)

        let regexURLTrue = urlTrue.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
        let regexURLFalse1 = urlFalse1.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
        let regexURLFalse2 = urlFalse2.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
        let regexURLFalse3 = urlFalse3.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)

        if (answerFalse1 !== "" && answerTrue !== "") {
            if (regexURLTrue && regexURLFalse1) {
                if (answerFalse2 !== "") {
                    if (regexURLFalse2) {
                        if (answerFalse3 !== "") {
                            if (regexURLFalse3) {
                                userQuizz.questions[i].answers = [{
                                    text: answerTrue,
                                    image: urlTrue,
                                    isCorrectAnswer: true
                                },
                                {
                                    text: answerFalse1,
                                    image: urlFalse1,
                                    isCorrectAnswer: false
                                },
                                {
                                    text: answerFalse2,
                                    image: urlFalse2,
                                    isCorrectAnswer: false
                                },
                                {
                                    text: answerFalse3,
                                    image: urlFalse3,
                                    isCorrectAnswer: false
                                }]

                            } else alert(`Na pergunta ${i + 1} a imagem da terceira resposta errada tem que ser um URL (https:)`)
                        } else {
                            userQuizz.questions[i].answers = [{
                                text: answerTrue,
                                image: urlTrue,
                                isCorrectAnswer: true
                            },
                            {
                                text: answerFalse1,
                                image: urlFalse1,
                                isCorrectAnswer: false
                            },
                            {
                                text: answerFalse2,
                                image: urlFalse2,
                                isCorrectAnswer: false
                            }]
                        }
                    } else alert(`Na pergunta ${i + 1} a imagem da segunda resposta errada tem que ser um URL (https:)`)
                } else {
                    userQuizz.questions[i].answers = [{
                        text: answerTrue,
                        image: urlTrue,
                        isCorrectAnswer: true
                    },
                    {
                        text: answerFalse1,
                        image: urlFalse1,
                        isCorrectAnswer: false
                    }]
                }
            } else alert(`Na pergunta ${i + 1} a imagem da resposta correta tem que ser um URL (https:)`)

        } else alert(`Na pergunta ${i + 1} é obrigatorio que tenha pelo menos uma certa e errada`)


    }
    if (i === qQuestion) {
        console.log(userQuizz)
        renderNiveis()
    }

}

function renderNiveis() {

    document.querySelector(".tela3 .criarQuizz").innerHTML = `
                <div class="criarNiveis">
                    <h1>Agora, decida os níveis</h1>
                    <ul></ul>
                    <button onclick = "saveLevels()">Prosseguir pra criar níveis</button>
                </div>
    `
    for (let i = 0; i < nLevels; i++) {
        document.querySelector(`.tela3 .criarQuizz ul`).innerHTML += `
                    <li class="caixaPergunta" id="qLevels_${i}">
                        <h1>Nível ${i + 1}</h1>
                        <input type="text" id = "titleLevel" placeholder="Título do nível">
                        <input type="number" id = "percentage" placeholder="% de acerto mínima">
                        <input type="url"  id = "url" placeholder="URL da imagem do nível">
                        <input type="text" id = "text" placeholder="Descrição do nível">
                    </li>
    `}
}

function saveLevels() {
    let i = 0
    for (i; i < nLevels; i++) {
        let level = document.querySelector(`.tela3 .caixaPergunta#qLevels_${i}`)
        let image = String(level.querySelector(`#url`).value)
        let title = String(level.querySelector(`#titleLevel`).value)
        let text = String(level.querySelector(`#text`).value)
        let minValue = Number(level.querySelector(`#percentage`).value)
        let url_level = image.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)

        if (title.length >= 10) {
            if (minValue >= 0 && minValue <= 100) {
                if (url_level) {
                    if (text.length >= 30) {
                        userQuizz.levels[i] = {
                            image: image,
                            title: title,
                            text: text,
                            minValue: minValue
                        }
                    } else {
                        alert(`No nivel ${i + 1} precisa ter a descrição com mais de 30 caracteres`)

                    }
                } else {
                    alert(`No nivel ${i + 1} precisa ter a imagem no formato de URL`)

                }
            } else {
                alert(`No nivel ${i + 1} precisa ter um numero de acertos entre 0 a 100`)

            }
        } else {
            alert(`No nivel ${i + 1} precisa ter o título com mais de 10 caracteres`)

        }


    }
    if (i === nLevels) {
        apiPost()
    }

}

function renderPronto(promise) {
    storageQuizz(promise)
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

function storageQuizz(promise) {
    if (JSON.parse(localStorage.getItem("User") != null)) {
        listUserQuizz = (JSON.parse(localStorage.getItem("User")))
    }

    listUserQuizz.push(promise.data)
    localStorage.setItem("User", JSON.stringify(listUserQuizz))
    console.log(promise)
}

window.renderTela3 = renderTela3
window.saveBegin = saveBegin
window.saveQuestions = saveQuestions
window.saveLevels = saveLevels
window.renderPerguntas = renderPerguntas
window.renderNiveis = renderNiveis
window.renderPronto = renderPronto
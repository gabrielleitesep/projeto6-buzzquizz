let quizz = [{
    image:"https",
    text:"aaaa"
}]



export default function renderTela3(){
    document.querySelector("main").innerHTML = `
    <div class="tela3">
        <div class="container">
            <div class="criarQuizz">
                <div class="comeco">
                    <h1>Comece pelo começo</h1>
                    <div class="caixaPergunta">
                        <input type="text" placeholder="Título  do seu quizz">
                        <input type="url" placeholder="URL da imagem do seu quizz">
                        <input type="number" placeholder="Quantidade de perguntas do quizz">
                        <input type="number" placeholder="Quantidade de níveis do quizz">
                    </div>
                    <button onclick = "renderPerguntas()">Prosseguir pra criar perguntas</button>
                </div>
            </div>
        </div>
    `
}

function renderPerguntas(){
    document.querySelector(".tela3 .criarQuizz").innerHTML = `
                <div class="criarPerguntas ">
                    <h1>Crie sua pergunta</h1>
                    <div class="caixaPergunta">
                        <h1>Pergunta 1</h1>
                        <input type="text" placeholder="Texto da pergunta">
                        <input type="text" placeholder="Cor de fundo da pergunta">
                        <h1>Resposta Correta</h1>
                        <input type="text" placeholder="Resposta correta">
                        <input type="url" placeholder="URL da imagem">
                        <h1>Resposta incorretas</h1>
                        <input type="number" placeholder="Resposta incorreta 1">
                        <input type="url" placeholder="URL da imagem">
                        <input type="number" placeholder="Resposta incorreta 2">
                        <input type="url" placeholder="URL da imagem">
                        <input type="number" placeholder="Resposta incorreta 3">
                        <input type="url" placeholder="URL da imagem">
                    </div>
                    <button onclick = "renderNiveis()">Prosseguir pra criar níveis</button>
                </div>
    `
}

function renderNiveis(){
    document.querySelector(".tela3 .criarQuizz").innerHTML = `
                <div class="criarNiveis">
                    <h1>Agora, decida os níveis</h1>
                    <div class="caixaPergunta">
                        <h1>Nível 1</h1>
                        <input type="text" placeholder="Título do nível">
                        <input type="number" placeholder="% de acerto mínima">
                        <input type="url" placeholder="URL da imagem do nível">
                        <input type="text" placeholder="Descrição do nível">
                    </div>
                    <div class="caixaPergunta">
                        <h1>Nível 2</h1>
                        <input type="text" placeholder="Título do nível">
                        <input type="number" placeholder="% de acerto mínima">
                        <input type="url" placeholder="URL da imagem do nível">
                        <input type="text" placeholder="Descrição do nível">
                    </div>
                    <button onclick = "renderPronto()">Prosseguir pra criar níveis</button>
                </div>
    `
}

function renderPronto(){
    document.querySelector(".tela3 .criarQuizz").innerHTML = `
                <div class="quizzPronto">
                    <div class="quizz" style="
                    background:linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%),
                    url(https://c4.wallpaperflare.com/wallpaper/332/915/762/one-piece-roronoa-zoro-hd-wallpaper-preview.jpg);
                    background-size: cover;
                    background-position: center;">
                        <h1>Zorão da massa</h1>
                    </div>
                    <button>Acessar Quizz</button>
                    <a href="index.html" rel="prev"><button class="home">Voltar pra home</button></a>
                </div>
    `
}



function storageQuizz(){
    localStorage.setItem("usuario",JSON.stringify(quizz))
    
    }

window.renderTela3 = renderTela3
window.renderPerguntas = renderPerguntas
window.renderNiveis = renderNiveis
window.renderPronto = renderPronto

console.log("t3")
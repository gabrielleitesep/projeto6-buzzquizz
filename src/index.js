const getQuizz = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes");
getQuizz.then(renderizarQuizz);
renderizarQuizzLocal();

function renderizarQuizz(promise) {
  console.log(promise.data);
  promise.data.map((quizzPromise) => {
    const id = quizzPromise.id;
    const title = quizzPromise.title;
    const image = quizzPromise.image;
    const questions = quizzPromise.questions;
    const levels = quizzPromise.levels;

    document.querySelector(".tela1 .container ul").innerHTML += `
    <li id="${id}" onclick="renderizarTela2(this)" class="quizz" style="background-image: linear-gradient(180deg,rgba(255, 255, 255, 0) 0%,rgba(0, 0, 0, 0.5) 64.58%,#000000 100%), url(${image})">
      <h1>${title}</h1>
    </li>`
    ;
  });
}

function renderizarQuizzLocal() {
  let getLocalQuizz = JSON.parse(localStorage.getItem("User"));
  console.log(getLocalQuizz)
  if (!getLocalQuizz) {
    document.querySelector(".tela1 .quizzUsuario").innerHTML = `
    <div class="semQuizz">
    <div onclick="">
      <h1>Você não criou nenhum quizz ainda :(</h1>
      <button onclick="renderTela3()">Criar quizz</button>
    </div>
    </div>`;
  } else {
    document.querySelector(".tela1 .quizzUsuario").innerHTML = `
    <div class="quizzSalvos">
      <div>
        <div>
          <h1>Seus Quizzes</h1>
          <ion-icon name="add-circle-sharp" onclick="renderTela3()"></ion-icon>
        </div>
        <ul>
        </ul>
      </div>
    </div>`
    
    getLocalQuizz.map((quizz) => {
      const id = quizz.id;
      const title = quizz.title;
      const image = quizz.image;
      const questions = quizz.questions;
      const levels = quizz.levels;

      document.querySelector(".tela1 .quizzUsuario ul").innerHTML += `
    <li id="${id}" class="quizz" style="background-image: linear-gradient(180deg,rgba(255, 255, 255, 0) 0%,rgba(0, 0, 0, 0.5) 64.58%,#000000 100%), url(${image})">
      <h1>${title}</h1>
    </li>
    `;
    });
  }
}

function renderMain(){
  let homepage = document.querySelector(body);
  homepage.innerHTML = `
  <div class="root">
  <header>
    <h1>BuzzQuizz</h1>
  </header>
  <main>
    <div class="tela1">
      <div class="quizzUsuario">
        <div class="semQuizz">
          <div onclick="">
            <h1>Você não criou nenhum quizz ainda :(</h1>
            <button onclick="renderTela3()">Criar quizz</button>
          </div>
        </div>
        <div class="quizzSalvos">
          <div>
            <div>
              <h1>Seus Quizzes</h1>
              <ion-icon name="add-circle-sharp" onclick="renderTela3()"></ion-icon>
            </div>
            <ul>
            </ul>
          </div>
        </div>
      </div>
      <div class="container">
        <h1>Todos os Quizzes</h1>
        <ul>
        </ul>
      </div>
    </div>
  </main>
  </div>
`
}

function returnMain(){
  renderMain();
  renderizarQuizzLocal();
  renderizarQuizz();
}


window.renderizarQuizz = renderizarQuizz
window.renderizarQuizzLocal = renderizarQuizzLocal
window.returnMain = returnMain
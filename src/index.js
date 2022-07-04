const getQuizz = axios.get("https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes");
getQuizz.then(renderizarQuizz);
renderizarQuizzLocal();

function renderizarQuizz(promise) {
  console.log(promise.data);
  promise.data.map((quizz) => {
    const id = quizz.id;
    const title = quizz.title;
    const image = quizz.image;
    const questions = quizz.questions;
    const levels = quizz.levels;

    document.querySelector(".tela1 .container ul").innerHTML += `
    <li id="${id}" class="quizz" style="background-image: linear-gradient(180deg,rgba(255, 255, 255, 0) 0%,rgba(0, 0, 0, 0.5) 64.58%,#000000 100%), url(${image})">
      <h1>${title}</h1>
    </li>
    `;
  });
}

<<<<<<< HEAD
function renderizarQuizzLocal() {
  let userQuizz = JSON.parse(localStorage.getItem("userQuizz"));
  if (!userQuizz) {
    document.querySelector(".tela1 .quizzUsuario").innerHTML = `
    <div class="semQuizz">
    <div onclick="">
      <h1>Você não criou nenhum quizz ainda :(</h1>
      <button onclick="renderTela3()">Criar quizz</button>
    </div>
    </div>`;
  } else {
    document.querySelector(".tela1 .quizzUsuario ul").innerHTML = `
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
    `
    userQuizz.map((quizz) => {
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

function renderTela2() {
  //Esperando o Get das perguntas pra evitar retrabalho
}
=======
console.log(renderizarTela2(1))
/*function testeee(){
    let au = JSON.parse(localStorage.getItem("usuario"))
    
    console.log(au)
    
}*/
>>>>>>> 54b990ed0787de439408d2a4d4b8d42c58a0f561

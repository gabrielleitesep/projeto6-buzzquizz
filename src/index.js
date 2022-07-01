const getQuizz = axios
  .get("https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes")
  .then(renderizarQuizz);

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

function renderTela2(){
  //Esperando o Get das perguntas pra evitar retrabalho
}

/*function testeee(){
    let au = JSON.parse(localStorage.getItem("usuario"))
    
    console.log(au)
    
}*/
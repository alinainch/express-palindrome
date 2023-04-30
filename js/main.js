document.querySelector('#check').addEventListener('click', makeReq)
document.querySelector('#history').addEventListener('click', readDB)

function makeReq(){

  const userInput = document.querySelector('input').value

  fetch(`/palindrome/${userInput}`)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      document.querySelector('h2').textContent = data.status
    })

}

function readDB(){
  fetch(`/history`)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      document.querySelector('h3').textContent = JSON.stringify(data.result)
    })
}
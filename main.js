//Select input and get-button and show-data div
let inputData = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let showData = document.querySelector(".show-data");

//Function when get-button is clicked
getButton.onclick = function () {
  getRepos();
};

function getRepos() {
  //Check if input is Empty
  if (inputData.value == "") {
    showData.innerHTML = `<span>Enter Username First</span>`
  } else {
    //Empty Show data div
    showData.innerHTML = ''
    //Get data from api
    fetch(`https://api.github.com/users/${inputData.value}/repos`).then(response => {
      return response.json()
    }).then(repos => {

      //Loop on Data
      repos.forEach((repo) => {

        //Create Main div for every Repo
        let mainDiv = document.createElement("div")
        mainDiv.classList.add("repo-box")
        
        //Create Text span and append to Main div
        let TextSpan = document.createElement("span")
        let TextSpanText = document.createTextNode(repo.name)
        TextSpan.appendChild(TextSpanText)
        TextSpan.classList.add("text")
        mainDiv.appendChild(TextSpan)
        
        //Create Stars count span and append to Main div
        let starsCountSpan = document.createElement("span")
        let starsCountSpanText = document.createTextNode(`Stars ${repo.stargazers_count}`)
        starsCountSpan.appendChild(starsCountSpanText)
        mainDiv.appendChild(starsCountSpan)

        //Create anchor tag for repo page and append to Main div
        let repoUrl = document.createElement("a")
        let repoUrlText = document.createTextNode("Visit")
        repoUrl.appendChild(repoUrlText)
        
        //Set href for anchor tag
        repoUrl.setAttribute("href", `https://github.com/${inputData.value}/${repo.name}`)
        mainDiv.appendChild(repoUrl)

        showData.appendChild(mainDiv)
      })
    })
  }
}

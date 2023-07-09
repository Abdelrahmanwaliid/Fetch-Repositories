// Main variables
let theInput = document.querySelector(".get_repos input"),
  getButton = document.querySelector(".get_button"),
  reposData = document.querySelector(".show_data");

getButton.onclick = () => {
  getRepos();
};

// To Press Enter Key
theInput.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    getButton.click();
  }
});

function getRepos() {
  if (theInput.value === "") {
    reposData.innerHTML = "<span>Please Write Github Username.</span>";
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((Response) => Response.json())

      .then((repositories) => {
        //Empty the container
        reposData.innerHTML = "";

        //Looping on repositories
        repositories.forEach((repo) => {
          //create main div
          let mainDiv = document.createElement("div");
          mainDiv.appendChild(document.createTextNode(repo.name));

          //create repo URL
          let theUrl = document.createElement("a");
          theUrl.appendChild(document.createTextNode("visit"));

          //add the hypertext reference
          theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;

          //Set attr
          theUrl.setAttribute("target", "_blanc");

          //Append URl To main Div
          mainDiv.appendChild(theUrl);

          // create Stars Count span
          let starSpan = document.createElement("span");
          starSpan.appendChild(
            document.createTextNode(` Stars: ${repo.stargazers_count}`)
          );

          //Append Stars count to main div
          mainDiv.appendChild(starSpan);

          //Add class to main Div
          mainDiv.className = "repo-box";

          //Append the main div to container
          reposData.appendChild(mainDiv);

          // create container for span and url
          let containerDiv = document.createElement("div");
          containerDiv.appendChild(starSpan);
          containerDiv.appendChild(theUrl);
          mainDiv.appendChild(containerDiv);
        });
      });
  }
}

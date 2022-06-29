// after DOM content loaded, associate button
// click with fetching function, and fetch a slip of advice
window.addEventListener('DOMContentLoaded', (e) => {
document.querySelector(".advice__btn-new").addEventListener("click", fetchAdviceSlip);
 fetchAdviceSlip();
});

// function to get advice
function fetchAdviceSlip() {
  console.log("Attempting to fetch advice");
  fetch('https://api.adviceslip.com/advice', {cache: "reload"})
  .then(response => {
    console.log("getting response", response);
    if (response.status >= 200 && response.status <=299) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  })
  .then(response => parseSlip(response.slip))
.catch((error) => {
    console.log(error);
    console.log("There was an error loading the advice.");
    displayErrorMessage();
});
}

// function to style the graph based on the data
function parseSlip(slip) {
  /*/ temporary for layout purposes
  document.querySelector(".advice__id").textContent = "117";
  document.querySelector(".advice__content").textContent = "It is easy to sit up and take notice, what's difficult is getting up and taking action.";
  /*/
  document.querySelector(".advice__id").textContent = slip.id.toString();
  document.querySelector(".advice__content").textContent = slip.advice;
  
}

// function to make error message visible if data fails to load
function displayErrorMessage() {
  document.querySelector(".advice__id").textContent = "?";
  document.querySelector(".advice__text").innerHTML = "There was an error fetching the advice.";
}


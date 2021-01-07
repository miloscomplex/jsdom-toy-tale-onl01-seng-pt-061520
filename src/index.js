let addToy = false;
const toyCollection = document.getElementById('toy-collection')
const toyUrl = "http://localhost:3000/toys"

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const submitBtn = document.querySelector(".submit")
  const toyForm = document.querySelector(".add-toy-form")

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  submitBtn.addEventListener("click", function(event) {
    event.preventDefault()
    let newToyName = toyForm.children[1].value
    let newToyImg = toyForm.children[3].value
    createToyObj(newToyName, newToyImg)
  })

  fetch(toyUrl)
    .then(resp => resp.json())
    .then(json => addToys(json))


  function addNewToy(toyObj) {
    console.log(toyObj)
    debugger
  }

  function addToyToPage(toy) {
    const div = document.createElement('div')
    div.className = "card"

    const name = document.createElement('h2')
    name.innerText = toy.name
    div.appendChild(name)

    const img = document.createElement('img')
    img.src = toy.image
    img.className = "toy-avatar"
    div.appendChild(img)

    const likes = document.createElement('p')
    likes.innerText = toy.likes
    div.appendChild(likes)

    const likeBtn = document.createElement('button')
    likeBtn.className = "like-btn"
    likeBtn.innerText = "Like <3"
    div.appendChild(likeBtn)

    likeBtn.addEventListener('click', function(event) {
      let plusOne = parseInt(likes.innerText) + 1
      likes.innerText = plusOne
      updateLike(plusOne, toy)
    })

    toyCollection.appendChild(div)
  }

  function addToys(toyObj) {
    console.log(toyObj);
    toyObj.forEach(toy => {
      addToyToPage(toy)
    })
  }

  function updateLike(likeNum, toyObj) {
    let data = {
      likes: likeNum
    }

    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    }

    fetch("http://localhost:3000/toys/" + toyObj.id, configObj)
      .then(function(response) {
        return response.json()
      })
      .then(function(object) {
        // console.log(toyObj)
        // console.log(object)
        // debugger
        return toyObj.likes = object.likes 
      })
  }

  function createToyObj(toyName, toyImg) {
    let data = {
      name: toyName,
      image: toyImg,
      likes: 0
    }

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    }

    return fetch("http://localhost:3000/toys", configObj)
      .then(function(response) {
        return response.json()
      })
      .then(function(object) {
        addToyToPage(object)
      })
  }
});

const jokes = document.querySelector("#jokes")
const buttonAdd = document.querySelector("#add")
const buttonDelete = document.querySelector("#delete")

const addNewJoke = async () => {
  const jokeText = await getDadJoke()
  const newLI = document.createElement("LI")
  newLI.append(jokeText)
  jokes.append(newLI)
  buttonDelete.addEventListener("click", function () {
    jokes.removeChild(newLI)
  })
}

const getDadJoke = async () => {
  try {
    const config = { headers: { Accept: "application/json" } }
    const res = await axios.get("https://icanhazdadjoke.com/", config)
    return res.data.joke
  } catch (e) {
    return "NO JOKES AVAILABLE! SORRY :("
  }
}

buttonAdd.addEventListener("click", addNewJoke)

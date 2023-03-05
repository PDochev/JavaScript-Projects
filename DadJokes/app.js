const jokes = document.querySelector("#jokes");
const buttonAdd = document.querySelector("#add");
const buttonDelete = document.querySelector("#delete");

buttonDelete.disabled = true;

const addNewJoke = async () => {
  const jokeText = await getDadJoke();
  const newLI = document.createElement("LI");
  newLI.append(jokeText);
  jokes.append(newLI);
  buttonDelete.disabled = false;
  buttonDelete.addEventListener("click", function () {
    jokes.removeChild(newLI);
    buttonDelete.disabled = true;
  });
};

const getDadJoke = async () => {
  try {
    const config = { headers: { Accept: "application/json" } };
    const res = await axios.get("https://icanhazdadjoke.com/", config);
    return res.data.joke;
  } catch (e) {
    return "NO JOKES AVAILABLE! SORRY :(";
  }
};

buttonAdd.addEventListener("click", addNewJoke);

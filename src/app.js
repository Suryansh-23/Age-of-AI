const searchMap = {
  Home: `The Age of Artificial Intelligence Where machines Come to life`,
  Features: `What is AI? Artificial intelligence is intelligence demonstrated by machines, as opposed to the natural intelligence displayed by animals including humans. It is the ability of a computer or a robot controlled by a computer to do tasks that are usually done by humans because they require human intelligence and discernment. Why AI? Aritificial Intelligence allows organizations to make better decisions, improving core business processes by increasing both the speed and accuracy of strategic decision-making processes.AI in Everyday Life Voice assistants, image recognition for face unlock in cellphones, and ML-based financial fraud detection are examples of AI software currently being used in everyday life. Current State of AI AI adoption is continuing its steady rise: 56 percent of all respondents (of a 2021 survey) report AI adoption in at least one function. The global AI adoption rate grew steadily and now is at 35%. Future of AI AI is ready to become the main component of various emerging technologies like big data, robotics, and IoT. It will continue to act as a technological innovator in the coming years.`,
  "Data for AI": `DATA FOR AI AI works on a variety of data. It requires humongous amount of data, which is termed as "Big Data". Data is of three types, namely, Visual, Textual, and Numerical. As the name suggests, Visual data is made up of images and tagged by what they contain. Textual data is specific to the linguistic world, and Numerical data is made up of figures and measurements.`,
  "Computer Vision": `COMPUTER VISION Would you like to generate a live face mesh of your face?`,
  NLP: `Natural Language Processing Natural language processing is a subfield of linguistics, computer science, and artificial intelligence concerned with the interactions between computers and human language, in particular how to program computers to process and analyze large amounts of natural language data. NLP has two sub-parts: 1. Natural Language Understanding (NLU): It is related to how machines understand given information.
  2. Natural Language Generation (NLG): It is realted to how machines generate output as per the given information. #FunFact: AI machines find NLG to be easier than NLU, whereas human beings find Understanding to be easier than Generating.`,
  "Contact Us": `Contact Us Use the form on right to contact us. Ask us anything by first entering your e-mail so that we can reply you promptly. Also briefly describe your issue/praise/query.`
};

let searchBox = document.getElementById("search_box");
let searchRes = document.getElementById("search_results");

searchBox.addEventListener("input", (e) => {
  const tmp = e.target.value.trim().toLowerCase();
  if (tmp) {
    let results = {};
    for (let i of Object.keys(searchMap)) {
      let str = searchMap[i].toLowerCase();
      while (str.length !== 0) {
        let ind = str.indexOf(tmp);
        if (
          ind !== -1 &&
          searchMap[i].slice(ind, ind + tmp.length).toLowerCase() === tmp
        ) {
          results[searchMap[i].slice(ind + tmp.length)] = [
            i,
            searchMap[i].slice(ind, ind + tmp.length)
          ];
        } else {
          break;
        }
        str = str.slice(ind + tmp.length);
      }
    }

    searchRes.classList.remove("visually-hidden-focusable");
    searchRes.innerHTML = "";
    for (let i of Object.keys(results)) {
      searchRes.innerHTML += `<button type="button" class="list-group-item list-group-item-action text-truncate list-item" data-label='${results[i][0]}'>${results[i][0]} <i class="bi bi-dot"> <b>${results[i][1]}</b>${i}</i></button>`;
    }
  }
});

searchRes.addEventListener("click", (e) => {
  let btn = e.path.filter((i) => i.type === "button")[0];
  let id = btn.getAttribute("data-label");
  let tmpEl = document.getElementById(id);

  tmpEl.focus();
  tmpEl.scrollIntoView();
  console.log(tmpEl);
});

searchBox.addEventListener("focusout", () => {
  searchRes.classList.add("visually-hidden-focusable");
});

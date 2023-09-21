const input = document.getElementById("input");
const btnSearch = document.getElementById("btnSearch");
const word = document.getElementById("word");
const phonetic = document.getElementById("phonetic");
const meanings = document.getElementById("meanings");
const phonetics = document.getElementById("phonetics");
const sourceUrl = document.getElementById("sourceUrl");
const history = document.getElementById("history");

const getWords = async () => {
  const searchWord = input.value;

  word.innerHTML = searchWord;
  try {
    const res = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`
    );

    // const link = document.createElement('')
    const audioLink = document.createElement("audio");

    // audioLink.setAttribute(controls);
    const Url = document.createElement("a");

    result = res.data[0].meanings[0].definitions[0].definition;
    meanings.innerHTML = result;
    phonetic.innerHTML = res.data[0].phonetic;

    phonetics.innerHTML = `

        <audio controls>
            <source src="${res.data[0].phonetics[0].audio}" type="audio/ogg" />
            <source src="${res.data[0].phonetics[0].audio}" type="audio/mpeg" />
        </audio>
    `;
    // phonetics.appendChild(audioLink);
    // link.innerHTML = `<a href="${res.data[0].phonetics[0].audio}">${res.data[0].phonetics[0].audio}</a>`;
    // phonetics.appendChild(link);

    sourceUrl.innerHTML = `<a href="${res.data[0].sourceUrls[0]}">${res.data[0].sourceUrls[0]}</a>`;
    sourceUrl.appendChild(Url);
    history.innerHTML += `  ${input.value} `;

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

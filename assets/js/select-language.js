const selectLangHTML = `
<h4>Select language:</h4>

<div>
  <input type="radio" id="python" name="fav_language" value="python" checked>
  <label for="python">Python</label><br>
  <input type="radio" id="java" name="fav_language" value="java">
  <label for="java">Java</label><br>
  <input type="radio" id="javascript" name="fav_language" value="javascript">
  <label for="javascript">JavaScript</label>
</div>
`
const div = document.createElement("div")
div.innerHTML = selectLangHTML

const firstH1 = document.querySelector("h1")
const firstH1parent = firstH1.parentNode

firstH1parent.insertBefore(div, firstH1)

const pythons = document.querySelectorAll(".language-python")
const javas = document.querySelectorAll(".language-java")
const jss = document.querySelectorAll(".language-js")

function hide(elements) {
  elements.forEach((el) => (el.style.display = "none"))
}

function show(elements) {
  elements.forEach((el) => (el.style.display = "initial"))
}

hide(javas)
hide(jss)

const radios = document.querySelectorAll("input[type='radio']")
radios.forEach((radio) => {
  radio.onchange = (e) => {
    const lang = e.target.value
    console.log(lang)
    if (lang === "javascript") {
      hide(javas)
      hide(pythons)
      show(jss)
    } else if (lang === "java") {
      hide(pythons)
      hide(jss)
      show(javas)
    } else if (lang === "python") {
      hide(javas)
      hide(jss)
      show(pythons)
    } else {
      alert("invalid language")
    }
  }
})

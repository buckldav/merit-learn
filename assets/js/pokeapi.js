let object = {}

document.forms[0].onsubmit = (e) => {
  e.preventDefault()
  const id = document.getElementById("pkid").value
  fetch(`//pokeapi.co/api/v2/pokemon/${id}/`).then((res) =>
    res.json().then((data) => {
      object = data
      const containerEl = document.getElementById("jsonOut")
      renderJSONTreeView(data, containerEl, {
        expanded: false,
      })
      document.forms[1].style = ""
    })
  )
}

document.forms[1].onsubmit = (e) => {
  e.preventDefault()
  const trim = (str) => (str.length > 30 ? str.slice(0, 30) + "..." : str)
  let access = document.getElementById("access").value
  const el = document.getElementById("accessedObj")
  if (object.id) {
    if (access.indexOf("object.") === 0) {
      el.innerHTML = eval(access)
    } else {
      el.innerHTML = `Invalid input <code>${trim(
        access
      )}</code>. Try the format <code>object.&lt;property&gt;</code>.`
    }
  } else {
    el.innerHTML = `Cannot access <code>${trim(access)}</code>.`
  }
}

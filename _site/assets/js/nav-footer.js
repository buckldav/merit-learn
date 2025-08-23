/*
 * By David Buckley 9/11/2021
 * Some dirty client-side pagination for posts
 */

const path = window.location.pathname.split("/")
let pageNo = ""
let pathParent = ""
for (let i = path.length - 1; i >= 0; i--) {
  if (path[i]) {
    pageNo = path[i]
    pathParent = path.slice(0, i).join("/") + "/"
    break
  }
}

function enableBtn(url, cssClass) {
  fetch(url)
    .then((res) => {
      if (res.status === 200) {
        // Page exists, enable navigation button
        // console.log(res)
        const el = document.querySelector(`.${cssClass} a`)
        el.setAttribute("href", url)
        el.classList.remove("disabled")
      }
    })
}
const prevUrl = pathParent + ("0" + (parseInt(pageNo) + -1)).slice(-2) + "/"
const nextUrl = pathParent + ("0" + (parseInt(pageNo) + 1)).slice(-2) + "/"
enableBtn(prevUrl, "post-nav-prev")
enableBtn(nextUrl, "post-nav-next")

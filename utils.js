let referenceJira = localStorage.getItem("jiraProjectRef")
if (referenceJira) {
  const jiraReferenceInput = document.getElementById("jiraProjectRef")
  if (jiraReferenceInput) {
    jiraReferenceInput.value = referenceJira
  }
  const jiraReferenceLabel = document.getElementById("jiraProjectRefLabel")
  if (jiraReferenceLabel) {
    const text = document.createTextNode(referenceJira)
    jiraReferenceLabel.appendChild(text)
  }
}
window.addEventListener("beforeunload", () => {
  const jiraReferenceInput = document.getElementById("jiraProjectRef")
  if (jiraReferenceInput) {
    localStorage.setItem("jiraProjectRef", jiraReferenceInput.value)
  }
})

let jiraUrl = localStorage.getItem("projectUrl")
if (jiraUrl) {
  const jiraUrlInput = document.getElementById("projectUrl")
  if (jiraUrlInput) {
    jiraUrlInput.value = jiraUrl
  }
}
window.addEventListener("beforeunload", () => {
  const jiraUrlInput = document.getElementById("projectUrl")
  if (jiraUrlInput) {
    localStorage.setItem("projectUrl", jiraUrlInput.value)
  }
})

const goToJira = document.getElementById("buttonGoTo")

const jiraReference = document.getElementById("jiraReference")
if (goToJira && jiraReference) {
  goToJira.addEventListener("click", () => {
    const reference = jiraReference.value
    const url = `${jiraUrl}${referenceJira}${reference}`
    window.open(url, "_blank")
  })
}

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
    //window.open(url, "_blank")
    try {
      window.api.openExternal(url)
    } catch (error) {
      alert("Error opening Jira issue: " + error)
    }
  })
}

const addFavoriteButton = document.getElementById("addFavoriteButton")
if (addFavoriteButton) {
  addFavoriteButton.addEventListener("click", () => {
    const jiraReference = document.getElementById("jiraReference")
    if (jiraReference) {
      const reference = jiraReference.value
      if (reference) {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || []
        if (!favorites.includes(reference)) {
          favorites.push(reference)
          localStorage.setItem("favorites", JSON.stringify(favorites))
        }
      } else {
        alert("Please enter a Jira reference")
      }
    }
  })
}

const favoritesList = document.getElementById("favoritesList")
if (favoritesList) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || []
  if (favorites.length > 0) {
    favorites.forEach((favorite) => {
      const listItem = document.createElement("div")
      listItem.className = "form-container"
      const deleteButton = document.createElement("div")
      deleteButton.className = "buttonDelete"

      deleteButton.onclick = () => {
        // Prevent the click from triggering the listItem's onclick
        const favorites = JSON.parse(localStorage.getItem("favorites")) || []
        const newFavorites = favorites.filter((fav) => {
          return fav !== favorite
        })
        localStorage.setItem("favorites", JSON.stringify(newFavorites))
        listItem.remove() // Remove the list item from the DOM
        //favoritesList.removeChild(listItem) // Remove the list item from the DOM
      }

      const linkButton = document.createElement("button")

      linkButton.className = "button-55"
      linkButton.onclick = () => {
        const jiraUrl = localStorage.getItem("projectUrl") || ""
        const referenceJira = localStorage.getItem("jiraProjectRef") || ""
        const url = `${jiraUrl}${referenceJira}${favorite}`

        try {
          window.api.openExternal(url)
        } catch (error) {
          alert("Error opening Jira issue: " + error)
        }
      }

      linkButton.textContent = favorite
      listItem.appendChild(linkButton)
      listItem.appendChild(deleteButton)
      favoritesList.appendChild(listItem)
    })
  } else {
    const noFavoritesMessage = document.createElement("li")
    noFavoritesMessage.textContent = "No favorites added yet."
    favoritesList.appendChild(noFavoritesMessage)
  }
}

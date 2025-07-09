let referenceLink = localStorage.getItem("linkProjectRef")
if (referenceLink) {
  const linkReferenceInput = document.getElementById("linkProjectRef")
  if (linkReferenceInput) {
    linkReferenceInput.value = referenceLink
  }
  const linkReferenceLabel = document.getElementById("linkProjectRefLabel")
  if (linkReferenceLabel) {
    const text = document.createTextNode(referenceLink)
    linkReferenceLabel.appendChild(text)
  }
}

function goToUrl() {
  const reference = linkReference.value
  const url = `${linkUrl}${referenceLink}${reference}`
  try {
    window.api.openExternal(url)
  } catch (error) {
    alert("Error opening link issue: " + error)
  }
}

window.addEventListener("beforeunload", () => {
  const linkReferenceInput = document.getElementById("linkProjectRef")
  if (linkReferenceInput) {
    localStorage.setItem("linkProjectRef", linkReferenceInput.value)
  }
})

let linkUrl = localStorage.getItem("projectUrl")
if (linkUrl) {
  const linkUrlInput = document.getElementById("projectUrl")
  if (linkUrlInput) {
    linkUrlInput.value = linkUrl
  }
}

window.addEventListener("beforeunload", () => {
  const linkUrlInput = document.getElementById("projectUrl")
  if (linkUrlInput) {
    localStorage.setItem("projectUrl", linkUrlInput.value)
  }
})

const goToLink = document.getElementById("button-go-to")

const linkReference = document.getElementById("linkReference")
if (linkReference) {
  linkReference.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      goToUrl()
    }
  })
}

if (goToLink) {
  goToLink.addEventListener("click", async (event) => {
    const clipboardText = await window.api.readClipboard()
    const url = `${linkUrl}${referenceLink}${clipboardText}`
    window.api.openExternal(url)
  })
}

const addFavoriteButton = document.getElementById("add-favorite-button")
if (addFavoriteButton) {
  addFavoriteButton.addEventListener("click", () => {
    const linkReference = document.getElementById("linkReference")
    if (linkReference) {
      const reference = linkReference.value
      if (reference) {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || []
        if (!favorites.includes(reference)) {
          favorites.push(reference)
          localStorage.setItem("favorites", JSON.stringify(favorites))
        }
      }
    }
    linkReference.value = ""
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
      deleteButton.className = "button-delete"

      deleteButton.onclick = () => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || []
        const newFavorites = favorites.filter((fav) => {
          return fav !== favorite
        })
        localStorage.setItem("favorites", JSON.stringify(newFavorites))
        listItem.remove()
      }

      const linkButton = document.createElement("button")

      linkButton.className = "button-55"
      linkButton.onclick = () => {
        const linkUrl = localStorage.getItem("projectUrl") || ""
        const referenceLink = localStorage.getItem("linkProjectRef") || ""
        const url = `${linkUrl}${referenceLink}${favorite}`

        try {
          window.api.openExternal(url)
        } catch (error) {
          alert("Error opening link issue: " + error)
        }
      }

      linkButton.textContent = favorite
      listItem.appendChild(linkButton)
      listItem.appendChild(deleteButton)
      favoritesList.appendChild(listItem)
    })
  } else {
    const noFavoritesMessage = document.createElement("div")
    noFavoritesMessage.className = "empty"
    favoritesList.appendChild(noFavoritesMessage)
  }
}

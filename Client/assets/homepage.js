window.onload = () => {
    const username = [...new URLSearchParams(window.location.search).values()][0]
    const userButton = document.getElementsByName('UsernameDropdown')[0]
    userButton.textContent = username
    getUserData(username) 
}


async function getUserData(username) {
    try {
        const data = await fetch(`http://localhost:3000/users/username/${username}`)
        if(data.ok){
            const userData = await data.json()
            console.log(userData)
            setUpPage(userData)
        }
    } catch(e) {
        console.log(e)
    }
}

async function setUpPage(userData) {
    userAddressId = userData.address_id
    let isAdmin = userData.isAdmin
    try {
        const data = await fetch(`http://localhost:3000/address/${userAddressId}`)
        if (data.ok) {
            addressData = await data.json()
            zoneId = addressData.zone_id
            try {
                const zoneData = await fetch(`http://localhost:3000/collectDay/zone/${zoneId}`)
                if(zoneData.ok) {
                    collectionDayData = await zoneData.json()
                    console.log(collectionDayData)
                    displayBins(collectionDayData)
                }
            }catch(e) {
                console.log(e)
            }
        }
    } catch(e) {
        console.log(e)
    }
    if(userData.isAdmin) {
        const adminButton = document.createElement("button")
        adminButton.name = "admin_button"
        adminButton.textContent= "admin"
        
        const buttonsDiv = document.getElementsByName("main_buttons")[0]
        buttonsDiv.appendChild(adminButton)   
    }
}

async function displayBins (data) {
    const weekdayData = await fetch(`http://localhost:3000/weekday/${data.weekday_id}`)
    let weekday = ""
    let bin = ""
    if(weekdayData.ok) {
         const usableWeekdayData = await weekdayData.json()
         weekday = usableWeekdayData.weekday
    }
    const binData = await fetch(`http://localhost:3000/bin/${data.bin_type_id}`)
    if(binData.ok) {
        const usefulBinData = await binData.json()
        bin = usefulBinData.bin
    }

    const binCollectionBox = document.createElement("div")
    binCollectionBox.id = "bin_box"

    const binInfo = document.createElement("p")
    binInfo.id= "bin_info"
    binInfo.textContent = `Your bins will be collected on ${weekday}.`
    binCollectionBox.appendChild(binInfo)

    const binImg = document.createElement("img")
    binImg.alt = `${bin}`
    binImg.src = `./assets/images/${bin}.png`
    binImg.id = "bin_img"
    binCollectionBox.appendChild(binImg)

    const binFlorin = document.getElementById("bin_and_user")
    binFlorin.appendChild(binCollectionBox)
}

const recycleButton = document.getElementsByName("RecyclingButton")[0]
recycleButton.addEventListener("click", openRecyclingMenu)

async function openRecyclingMenu() {
    const recyclingMenuContainer = document.createElement("div")
    recyclingMenuContainer.id = "recycling_menu_container"

    const recyclingMenu = document.createElement("main")
    recyclingMenu.id = "recycling_menu"
    recyclingMenuContainer.appendChild(recyclingMenu)

    const backButton = document.createElement("button")
    backButton.textContent = "Back"
    backButton.name = "back_button"
    backButton.addEventListener("click", returnHome)
    recyclingMenu.appendChild(backButton)

    const recyclingForm = document.createElement("form")
    recyclingForm.name = "recycling_form"

    const searchBar = document.createElement("input")
    searchBar.type = "text"
    searchBar.placeholder = "Search..."
    searchBar.name = "search_bar"
    searchBar.addEventListener('keyup', obtainRecycleItems)

    const disposeButton = document.createElement("button")
    disposeButton.textContent = "WasteWise this item"
    disposeButton.value = "submit"
    disposeButton.name = "dispose_button"
    recyclingForm.addEventListener("submit", disposeItem)

    recyclingForm.appendChild(searchBar)
    recyclingForm.appendChild(disposeButton)
    recyclingMenu.appendChild(recyclingForm)

    const body = document.querySelector('body')
    body.appendChild(recyclingMenuContainer)
}

const returnHome = () => {
    const element = document.getElementById("recycling_menu_container")
    element.remove()
}

async function obtainRecycleItems() {
    const searchContents = document.getElementsByName("search_bar")[0].value
    if(searchContents.length>=3){
        try {
            const data = await fetch(`http://localhost:3000/object/${searchContents}`)
            if(data.ok) {
                const searchItems = await data.json()
                console.log(searchItems)
            }
        } catch(e){
            console.log(e)
        }
    }
}

async function disposeItem(e) {
    e.preventDefault()
    const searchContents = document.getElementsByName("search_bar")[0].value
    try {
        const response = await fetch(`http://localhost:3000/object/${searchContents}`)
        if(response.status == 404) {
            alert("Error: this is an unrecognised item.")
        } else {
            const searchItem = await response.json()
            checkIfTheyMeanIt(searchItem)
        }
    } catch(e){
        console.log(e)
    }
}

async function checkIfTheyMeanIt(itemData) {
    const popUpContainer = document.createElement("div")
    popUpContainer.name = "pop_up_container"

    const popUp = document.createElement("div")
    popUp.name = "pop_up"

    const areYouSure = document.createElement("p")
    areYouSure.name = "title"
    areYouSure.textContent = "Are You Sure?"

    const moralCheck = document.createElement("p")
    moralCheck.name = "body"
    moralCheck.textContent = `By clicking 'Confirm' you confirm you disposed of this ${itemData.name} correctly.`

    const backButton = document.createElement("button")
    backButton.name = "back_button_popup"
    backButton.textContent = "Back"
    backButton.addEventListener("click", deletePopUp)

    const confirmButton = document.createElement("button")
    confirmButton.name = "confirm_button_popup"
    confirmButton.textContent = "Confirm"
    confirmButton.addEventListener("Click", submitItem)

    popUp.appendChild(areYouSure)
    popUp.appendChild(moralCheck)
    popUp.appendChild(backButton)
    popUp.appendChild(confirmButton)
    popUpContainer.appendChild(popUp)

    const body = document.querySelector('body')
    body.appendChild(popUpContainer)
}

const deletePopUp = () => {
    const element = document.getElementsByName('pop_up_container')[0]
    element.remove()
}

async function submitItem(e) {
    e.preventDefault()
    const username = [...new URLSearchParams(window.location.search).values()][0]
    try {
        const response = await fetch(`http://localhost:3000/users/username/${username}`)
        if(response.ok){
            data = await response.json()
            let currentPoints = parseInt(data.points)
            currentPoints++
            let pointsObject = {
                points: currentPoints
            }
            const options = {
                method: "PATCH",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pointsObject)
            }

            const updateRes = await fetch(`http://localhost:3000/users/points/${username}`, options) 
            const updateData = await updateRes.json()

            if(updateRes.status == 200) {
                alert("Thank you for correctly disposing of your waste!")
                let popUp = document.getElementsByName('pop_up_container')
                popUp.remove
            }
        }    
    } catch(e) {
        console.log(e)
    }
}


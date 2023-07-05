window.onload = () => {
    const username = [...new URLSearchParams(window.location.search).values()][0]
    const userButton = document.getElementsByName('UsernameDropdown')[0]
    userButton.textContent = username
    getUserData(username) 
}


async function getUserData(username) {
    try {
        const options = {
            headers:  {
                'Authorization': localStorage.getItem("token")
            }
        }
        const data = await fetch(`http://localhost:3000/users/username/${username}`,options)
        if(data.ok){
            const userData = await data.json()
            console.log(userData)
            const pointsButton = document.getElementsByName("points_button")[0]
            pointsButton.textContent = `Points: ${userData.points}`
            localStorage.setItem("id", userData.id)
        }
    } catch(e) {
        console.log(e)
    }
}

const logoutButton = document.getElementsByName("Log_out")[0]
logoutButton.addEventListener("click", logoutUser)

async function logoutUser(e) {
    e.preventDefault()
    try {
        const options = {
            headers:  {
                'Authorization': localStorage.getItem("token")
            }
        }
        const response = await fetch("http://localhost:3000/users/logout", options)
        const data = await response.json()

        if(response.status == 200) {
            localStorage.clear()
            alert(data.message)
            window.location.assign("index.html")
        }
    }catch(e){
        console.log(e)
    }
}

const settingsButton = document.getElementsByName("Settings")[0]
settingsButton.addEventListener("click", loadUserSettings)

async function loadUserSettings(e) {
    e.preventDefault()
    const settingsMenuContainer = document.createElement("div")
    settingsMenuContainer.id = "settings_menu_container"

    const settingsMenu = document.createElement("main")
    settingsMenu.id = "settings_menu"
    settingsMenuContainer.appendChild(settingsMenu)

    const backButton = document.createElement("button")
    backButton.textContent = "Back"
    backButton.name = "back_button"
    backButton.addEventListener("click", returnHome3)
    settingsMenu.appendChild(backButton)

    const settingsTitle = document.createElement("p")
    settingsTitle.setAttribute("name", "title")
    settingsTitle.textContent = "User Settings"
    settingsMenu.appendChild(settingsTitle)

    const usernameForm = document.createElement("form")
    usernameForm.name = "username_form"
    usernameForm.addEventListener("submit", changeUsername)

    const userFormLabel = document.createElement("label")
    userFormLabel.setAttribute("name", "user_form_label")
    userFormLabel.textContent = "Change Username"
    usernameForm.appendChild(userFormLabel)

    const userFormInput = document.createElement("input")
    userFormInput.type = "text"
    userFormInput.placeholder = "username"
    userFormInput.name = "user_form_input"
    usernameForm.appendChild(userFormInput)

    const userFormButton = document.createElement("button")
    userFormButton.name = "user_form_button"
    userFormButton.type = "submit"
    userFormButton.textContent = "Change Username"
    usernameForm.appendChild(userFormButton)


    const passwordForm = document.createElement("form")
    passwordForm.name = "password_form"
    passwordForm.addEventListener("submit", changePassword)

    const passwordFormLabel = document.createElement("label")
    passwordFormLabel.setAttribute("name", "password_form_label")
    passwordFormLabel.textContent = "Change Password"
    passwordForm.appendChild(passwordFormLabel)

    const passwordFormInput = document.createElement("input")
    passwordFormInput.type = "password"
    passwordFormInput.placeholder = "password"
    passwordFormInput.name = "password_form_input"
    passwordForm.appendChild(passwordFormInput)

    const passwordFormInput2 = document.createElement("input")
    passwordFormInput2.type = "password"
    passwordFormInput2.placeholder = "repeat password"
    passwordFormInput2.name = "password_form_input2"
    passwordForm.appendChild(passwordFormInput2)

    const passwordFormButton = document.createElement("button")
    passwordFormButton.name = "password_form_button"
    passwordFormButton.type = "submit"
    passwordFormButton.textContent = "Change Password"
    passwordForm.appendChild(passwordFormButton)


    const addressForm = document.createElement("form")
    addressForm.name = "address_form"
    addressForm.addEventListener("submit", changeAddress)

    const addressFormLabel = document.createElement("label")
    addressFormLabel.setAttribute("name", "address_form_label")
    addressFormLabel.textContent = "Change Address"
    addressForm.appendChild(addressFormLabel)

    const numberInput = document.createElement("input")
    numberInput.type = "text"
    numberInput.placeholder = "House Number"
    numberInput.name = "house_number"

    const streetName = document.createElement("input")
    streetName.type = "text"
    streetName.placeholder = "Street"
    streetName.name = "street_name"

    const postcode = document.createElement("input")
    postcode.type = "text"
    postcode.placeholder = "Postcode"
    postcode.name = "postcode"
    
    addressForm.appendChild(numberInput)
    addressForm.appendChild(streetName)
    addressForm.appendChild(postcode)

    const addressFormButton = document.createElement("button")
    addressFormButton.name = "address_form_button"
    addressFormButton.type = "submit"
    addressFormButton.textContent = "Change Address"
    addressForm.appendChild(addressFormButton)
    

    settingsMenu.appendChild(usernameForm)
    settingsMenu.appendChild(passwordForm)
    settingsMenu.appendChild(addressForm)

    const body = document.querySelector('body')
    body.appendChild(settingsMenuContainer)
}

const returnHome3 = () => {
    const element = document.getElementById("settings_menu_container")
    element.remove()
}

async function changeUsername(e) {
    e.preventDefault()
    const popUpContainer = document.createElement("div")
    popUpContainer.setAttribute("name", "pop_up_container")

    const popUp = document.createElement("div")
    popUp.setAttribute("name", "pop_up")

    const areYouSure = document.createElement("p")
    areYouSure.setAttribute("name", "title")
    areYouSure.textContent = "Are You Sure?"

    const popUpText = document.createElement("p")
    popUpText.setAttribute("name", "body")
    popUpText.textContent = `Your username will be changed to ${e.target.user_form_input.value}.`

    const backButton = document.createElement("button")
    backButton.name = "back_button_popup"
    backButton.textContent = "Back"
    backButton.addEventListener("click", deletePopUp)

    const confirmButton = document.createElement("button")
    confirmButton.name = "confirm_button_popup"
    confirmButton.textContent = "Confirm"
    confirmButton.addEventListener("click", async function () {
        const username = [...new URLSearchParams(window.location.search).values()][0]
        try {
            const usernameObj = {
                username: e.target.user_form_input.value
            }

            const options  = {
                method:"PATCH",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usernameObj)
            }

            const response = await fetch(`http://localhost:3000/users/username/${username}`, options) 
                const data = response.json()

                if (response.status == 200) {
                    let popUp = document.getElementsByName('pop_up_container')[0]
                    popUp.remove()
                    document.getElementsByName("username_form")[0].reset()
                    alert("Username Changed Successfully")
                }
        } catch (e) {
            console.log(e)
        }
    })

    const buttonSection = document.createElement("div")
    buttonSection.setAttribute("name", "popup_buttons")
    buttonSection.appendChild(backButton)
    buttonSection.appendChild(confirmButton)

    popUp.appendChild(areYouSure)
    popUp.appendChild(popUpText)
    popUp.appendChild(buttonSection)
    popUpContainer.appendChild(popUp)

    const body = document.querySelector('body')
    body.appendChild(popUpContainer)
}

const checkPasswordsMatch = (str1, str2) => {
    return str1 === str2
}

async function changePassword(e) {
    e.preventDefault()
    if(checkPasswordsMatch(e.target.password_form_input.value, e.target.password_form_input2.value)){
        const popUpContainer = document.createElement("div")
        popUpContainer.setAttribute("name", "pop_up_container")

        const popUp = document.createElement("div")
        popUp.setAttribute("name", "pop_up")

        const areYouSure = document.createElement("p")
        areYouSure.setAttribute("name", "title")
        areYouSure.textContent = "Are You Sure?"

        const popUpText = document.createElement("p")
        popUpText.setAttribute("name", "body")
        popUpText.textContent = `Your password will be changed.`

        const backButton = document.createElement("button")
        backButton.name = "back_button_popup"
        backButton.textContent = "Back"
        backButton.addEventListener("click", deletePopUp)

        const confirmButton = document.createElement("button")
        confirmButton.name = "confirm_button_popup"
        confirmButton.textContent = "Confirm"
        confirmButton.addEventListener("click", async function () {
            const username = [...new URLSearchParams(window.location.search).values()][0]
            try {
                const passwordObj = {
                    password: e.target.password_form_input2.value
                }

                const options  = {
                    method:"PATCH",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(passwordObj)
                }

                const response = await fetch(`http://localhost:3000/users/password/${username}`, options) 
                    const data = response.json()

                    if (response.status == 200) {
                        let popUp = document.getElementsByName('pop_up_container')[0]
                        popUp.remove()
                        document.getElementsByName("password_form")[0].reset()
                        alert("Password Changed Successfully")
                    }
            } catch (e) {
                console.log(e)
            }
        })

        const buttonSection = document.createElement("div")
        buttonSection.setAttribute("name", "popup_buttons")
        buttonSection.appendChild(backButton)
        buttonSection.appendChild(confirmButton)

        popUp.appendChild(areYouSure)
        popUp.appendChild(popUpText)
        popUp.appendChild(buttonSection)
        popUpContainer.appendChild(popUp)

        const body = document.querySelector('body')
        body.appendChild(popUpContainer)
    } else {
        alert("Passwords must match")
    }
}

async function changeAddress(e) {
    e.preventDefault()
    const address = e.target.house_number.value + " " + e.target.street_name.value + ", " + e.target.postcode.value.toUpperCase()

    const popUpContainer = document.createElement("div")
    popUpContainer.setAttribute("name", "pop_up_container")

    const popUp = document.createElement("div")
    popUp.setAttribute("name", "pop_up")

    const areYouSure = document.createElement("p")
    areYouSure.setAttribute("name", "title")
    areYouSure.textContent = "Are You Sure?"

    const popUpText = document.createElement("p")
    popUpText.setAttribute("name", "body")
    popUpText.textContent = `Your address will be changed to ${address}.`

    const backButton = document.createElement("button")
    backButton.name = "back_button_popup"
    backButton.textContent = "Back"
    backButton.addEventListener("click", deletePopUp)

    const confirmButton = document.createElement("button")
    confirmButton.name = "confirm_button_popup"
    confirmButton.textContent = "Confirm"
    confirmButton.addEventListener("click", async function () {
        const username = [...new URLSearchParams(window.location.search).values()][0]
        try {
            const rawAddressData = await fetch(`http://localhost:3000/address/user/${e.target.house_number.value}&${e.target.postcode.value.toUpperCase()}`)
            if(rawAddressData.ok){
                const addressData = await rawAddressData.json()
                console.log(addressData)

                const addressIdData = {
                    address_id: addressData.id
                }

                const options = {
                    method:"PATCH",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(addressIdData)
                }

                try {
                    const response = await fetch(`http://localhost:3000/users/address/${username}`, options) 
                    const data = response.json()

                    if (response.status == 200) {
                        let popUp = document.getElementsByName('pop_up_container')[0]
                        popUp.remove()
                        document.getElementsByName("address_form")[0].reset()
                        alert("Address Changed Successfully")
                    }
                } catch(e) {
                    console.log(e)
                }
            }
            
        }catch(e) {
            console.log(e)
        }
    })

    const buttonSection = document.createElement("div")
    buttonSection.setAttribute("name", "popup_buttons")
    buttonSection.appendChild(backButton)
    buttonSection.appendChild(confirmButton)

    popUp.appendChild(areYouSure)
    popUp.appendChild(popUpText)
    popUp.appendChild(buttonSection)
    popUpContainer.appendChild(popUp)

    const body = document.querySelector('body')
    body.appendChild(popUpContainer)
}

const homeButton = document.getElementsByName("home_button")[0]
homeButton.addEventListener("click", () => {
    window.location.assign(`homepage.html?username=${[...new URLSearchParams(window.location.search).values()][0]}`)
})
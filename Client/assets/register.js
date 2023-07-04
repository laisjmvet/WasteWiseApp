const createForm = document.querySelector('form')

createForm.addEventListener("submit", createUser)

async function createUser(e) {
    e.preventDefault()
    if(checkPasswordsMatch(e.target.password.value, e.target.password2.value)){
        if(checkValidPostcode(e.target.postcode.value.toUpperCase())){
            const userData = {
                name: e.target.first_name.value + " " + e.target.last_name.value,
                house_number: e.target.number.value,
                street_name: e.target.street_name.value,
                postcode: e.target.postcode.value.toUpperCase(),
                username: e.target.username.value,
                password: e.target.password.value
            }
            
            const options = {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            }
    
            const response = await fetch("http://localhost:3000/users/register", options)
            const data = await response.json()
    
            if (response.status == 201) {
                window.location.assign("index.html");
            } else {
                alert(data.error);
            }
        } else {
            alert("Error: Please enter a valid postcode.")
        }
    } else {
        alert("Error: Passwords must match.")
    }
}
    

const checkPasswordsMatch = (str1, str2) => {
    return str1 === str2
}

const checkValidPostcode = (str) => {
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let halves = str.split(" ")
    if(halves[1].length == 3) {
        if(alphabet.includes(halves[1][1]) && alphabet.includes(halves[1][2]) && Number.isNaN(parseInt(halves[1][0])) == false){
            if(halves[0].length == 3) {
                if(alphabet.includes(halves[0][0]) && alphabet.includes(halves[0][1]) && Number.isNaN(parseInt(halves[0][2])) == false) {
                    return true
                } else {
                    return false
                }
            } else if(halves[0].length == 4) {
                if(alphabet.includes(halves[0][0]) && alphabet.includes(halves[0][1]) && Number.isNaN(parseInt(halves[0][2])) == false && Number.isNaN(parseInt(halves[0][3])) == false) {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        }  else {
            return false
        }
    } else {
        return false
    }
}

const backButton = document.getElementsByName("back_button")[0]
backButton.addEventListener("click", () => {
    window.location.assign("index.html")
})
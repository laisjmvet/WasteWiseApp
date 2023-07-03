const createForm = document.querySelector('form')

createForm.addEventListener("submit", createUser)

async function createUser(e) {
    e.preventDefault()
    if(checkPasswordsMatch(e.target.password.value, e.target.password2.value)){
        const userData = {
            name: e.target.first_name.value + " " + e.target.last_name.value,
            house_number: e.target.number.value,
            street_name: e.target.street_name.value,
            postcode: e.target.postcode.value,
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
        alert("Error: Passwords must match")
    }
}
    

const checkPasswordsMatch = (str1, str2) => {
    return str1 === str2
}
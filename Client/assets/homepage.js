window.onload = () => {
    const username = [...new URLSearchParams(window.location.search).values()][0]
    const userButton = document.getElementsByName('UsernameDropdown')[0]
    userButton.textContent = username
    getUserData(username) 
}


async function getUserData(username) {
    try {
        const data = await fetch(`http://localhost:3000/users/${username}`)
        if(data.ok){
            const userData = await data.json()
            return userData
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
                const zoneData = await fetch(`http://localhost:3000/collectionDay/${zone_id}`)
                if(zoneData.ok) {
                    collectionDayData = await zoneData.json()
                    displayBins(collectionDayData)
                }
            }catch(e) {
                console.log(e)
            }
        }
    } catch(e) {
        console.log(e)
    }
    if(isAdmin) {
        //code to generate admin button
    }
}

const displayBins = (data) => {
    //Code to create and display bins
}
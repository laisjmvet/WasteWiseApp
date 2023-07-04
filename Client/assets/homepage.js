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
    if(isAdmin) {
        //code to generate admin button
    }
}

async function displayBins (data) {
    // const weekdayData = await fetch(`http://localhost:3000/weekday/${data.weekday_id}`)
    // if(weekdayData.ok) {
    //      const usableWeekdayData = await weekdayData.json()
    //      const weekday = usableWeekdayData.weekday
    // }
    let weekday = "wednesday"
    // const binData = await fetch(`http://localhost:3000/bin_types/${data.bin_type_id}`)
    // if(binData.ok) {
    //     const usefulBinData = await binData.json()
    //     const bin = usefulBinData.bin_type_name
    // }
    let bin = "Recycling"

    const binCollectionBox = document.createElement("div")
    binCollectionBox.id = "bin_box"

    const binInfo = document.createElement("p")
    binInfo.id= "bin_info"
    binInfo.textContent = `Your bins will be collected on ${weekday}`
    binCollectionBox.appendChild(binInfo)

    const binImg = document.createElement("img")
    binImg.alt = `${bin}`
    binImg.src = `./assets/images/${bin}.png`
    binImg.id = "bin_img"
    binCollectionBox.appendChild(binImg)

    const body = document.querySelector('body')
    body.appendChild(binCollectionBox)

}


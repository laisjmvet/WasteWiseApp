window.onload = () => {
    const username = [...new URLSearchParams(window.location.search).values()][0]
    getUserData(username)
}


async function getUserData(username) {
    try {
        const userData = await fetch(`http://localhost:3000/grids/${name}`)
    } catch(e) {
        console.log(e)
    }
}

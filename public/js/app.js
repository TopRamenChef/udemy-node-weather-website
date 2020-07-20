console.log('Client side JavaScript file loaded.')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// fetch('http://localhost:3000/weather?address=Boston').then((response) => {
//     response.json().then(({error, forecast,location}) => {
//         if (error) return console.log(error)
        
//         console.log(location)
//         console.log(forecast)
//     })
// })

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('http://localhost:3000/weather?address='+String(location)).then((response) => {
        response.json().then(({error, forecast,location}) => {
            if (error) return messageOne.textContent = error

            messageOne.textContent = location
            messageTwo.textContent = forecast
        })
    })
})
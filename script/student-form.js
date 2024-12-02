document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('student-form')
    const selectDescription = document.createElement('select')
    const selectShift = document.createElement('select')
    // const labelClass = document.createElement('label')
    // const labelShift = document.createElement('label')

    const url = 'http://localhost:5287/api/ClassRoom'

    fetch(url)
        .then(response => response.json())
        .then(data => {
            data.map(classroom => {
                const optionDescription = document.createElement('option')
                optionDescription.textContent = classroom.description
                const optionShift = document.createElement('option')
                optionShift.textContent = classroom.shift
                selectDescription.appendChild(optionDescription)
                selectShift.appendChild(optionShift)
                form.appendChild(selectDescription)
                form.appendChild(selectShift)
            })
        })


})

function handleOnSubmit(e) {
    e.preventDefault()
    const cpf = document.getElementById('cpf').value
    const register = document.getElementById('register').value
    const address = document.getElementById('address').value
    const phone = document.getElementById('phone').value
    const name = document.getElementById('name').value


    const obj = {
        name,
        registrationNumber: register,
        phone,
        address,
        cpf
    }
    const url = 'http://localhost:5287/api/Student'
    fetch(url, () => {
        const paramns =
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }

    })



}
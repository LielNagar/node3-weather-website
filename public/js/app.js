fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})


const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const errorP=document.querySelector('#Error')
const dataP=document.querySelector('#Data')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    dataP.textContent="Loading..."
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            dataP.textContent=""
            errorP.textContent="Error!! "+ data.error
        } 
        else {
            dataP.textContent=data.location +" weather for today:\n" +data.forecastData.forecast+ " and the temp is: "
            +data.forecastData.temp +" with a " + data.forecastData.precip +"% chance to rain."
            errorP.textContent=""
        }
    })
})

})
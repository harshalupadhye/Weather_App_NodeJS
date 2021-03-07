
const weatherForm=document.querySelector('form');
const search=document.querySelector('input');
const message=document.querySelector('#msg');

weatherForm.addEventListener('submit',(event)=>{
    message.textContent="....Loding"
    event.preventDefault();
    const place=search.value
    getGeo(place)
    
})
const getGeo=(address)=>{
    fetch('http://localhost:3000/product?address='+encodeURIComponent(address)).then(response=>{
        response.json().then(data=>{
            console.log(data)
            message.textContent=data
        })
    })
}
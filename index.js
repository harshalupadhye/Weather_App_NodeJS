const express=require('express');
const path=require('path')
const hbs=require('hbs')
const geocode=require('./geo/geocode');
const temperature = require('./geo/temprature');

const app=express();

console.log(path.join(__dirname,'./components'))

const TemplateDir=path.join(__dirname,'./components')
const viewPath=path.join(__dirname,'/templates/views')
const partialPath=path.join(__dirname,'./templates/partials')
const imagePath=path.join(__dirname,'./components/img')


app.use(express.static(TemplateDir))
app.use(express.static(imagePath))


app.set('view engine','hbs');
app.set('views',viewPath)
hbs.registerPartials(partialPath)

app.get('',(req,res)=>{
    console.log(req.query)
    // res.sendFile(path.join(__dirname,'./components/js/fetch.js'))

    res.render('index',{
        title:'Weather App',
        name:'harshal'
    })
})

app.get('/about',(req,res)=>{
    res.render('about.hbs')
})
app.get('/help',(req,res)=>{
    res.render('help.hbs')
})

app.get('/product',(req,res)=>{
    console.log(req.query.address)
    let msg=''
    let long=''
    let lat=''
    if(req.query.address){
    geocode(req.query.address,(error,response)=>{
        if(error){
          return res.send("check your internet connection")

        }
        else if(response.body.message){
            console.log(response.body.message)
            return res.send(response.body.message)
            

        }
        else{
            console.log(response.body.features[0].center[0],response.body.features[0].center[1])
            long=response.body.features[0].center[0]
            lat=response.body.features[0].center[1]
            temperature(response.body.features[0].center[0],response.body.features[0].center[1],(error,resp)=>{
                if(error){
                    return res.send("check your internet connection")
          
                  }
                  else if(resp.body.error){
                      console.log(resp.body.error)
                      return res.send(resp.body.error)
          
                  }
                  else{
                    console.log('currently the temprature out there is '+resp.body.current.temperature+' F')
                    res.send({longitude:response.body.features[0].center[0],
                        latitude:response.body.features[0].center[1],
                        'currently the temprature out there is': resp.body.current.temperature})
                      
                  }
            })
        }
    })
    
    
}

    

    
})

app.get('*',(req,res)=>{
    res.render('404',{
        errorMsg:'Page Not Found'
    })
})

// app.get('',(req,res)=>{
//     res.send("<h1>Welcome To Weather</h1>")
// });
// app.get('/help',(req,res)=>{
//     res.send({
//         name:'harshal',
//         age:25
//     })
// });
// app.get('/about',(req,res)=>{
//     res.send("welcome to about page")
// });

app.listen(3000,()=>{
    console.log("Server is running now on port 3000")
});
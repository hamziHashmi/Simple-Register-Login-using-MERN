const mongoose =require('mongoose');

mongoose.connect("mongodb://localhost:27017/firstregistrationmern",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connection Established");
}).catch((e)=>{
    console.log(`Conncection Could not Established due to ${e}`);
})
const mongoose = require("mongoose");

//database connection
mongoose.connect("mongodb://localhost:27017/rest_node" ,{
    useCreateIndex: true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify: false,
}
).then(()=>{
    console.log("Connection Sucessfully");
}).catch(()=>{
    console.log("No connection");
})
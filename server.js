const express = require('express');
const app =express();
const port= process.env.PUBLIC_PORT||3001;

app.get('/tools', (req, res)=>{
    res.send('tools manufactured');
});

if(require.main==module){
    app.listen(port, ()=>{
        console.log("Hello, welcome");
    });
}
module.exports=app;
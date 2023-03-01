const http=require('http');
const port=9000;
const fs=require('fs');


function requestHandler(req,res){
    console.log(req.url);
    res.writeHead(200,{'content-type' : 'text/html'});

         //part-1 comment
    // fs.readFile('./index.html',function(err,data){
    //     if(err){
    //         console.log('error',err);
    //         return res.end('<h1>Error!</h1>');
    //     }
    //     return res.end(data); 
    // });

    // // res.end('<h1>Lucky..</h1>');

    let filePath;
    switch(req.url){
        case '/':
            filePath='./index.html'
            break;
        
        case '/profile':
            filepath='./profile.html'
            break;
        
        default:
            filePath='./404.html'    
    }

    fs.readFile(filePath,function(err,data){
        if(err){
            console.log('error',err);
            return res.end('<h1>Error!</h1>');
        }
        return res.end(data);
    });
}


const server=http.createServer(requestHandler);


server.listen(port,function(err){
    if(err){
        console.log(err);
    }
    console.log("Server is up and running on port : ",port);
});
const request = require("request");

module.exports.makeFacebookRequest = (path, token) => {
    
    return new Promise((resolve, reject) => {
        request.get('https://graph.facebook.com/me/?fields=name,email,id,first_name&access_token=' + token
        , (error, response, body) => {
            if(error){
               reject('error');
            }
            let json = JSON.parse(body);
            console.log(response);
            console.log(body);
            resolve(body);
            /*res.setEncoding("utf8");
            let body = "";
            res.on("data", data => {
              body += data;
            });
            res.on("end", () => {
              body = JSON.parse(body);
              resolve(body);
            });*/
           
        });
    });
     
}
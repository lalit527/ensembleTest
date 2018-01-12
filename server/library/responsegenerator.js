exports.generate = function(app, error, message, status, data, token){
    app.use((req, res, next) => {
        res.set({
            'Content-Type': 'text/plain',
            'Content-Length': '123',
            'ETag': '12345',
            'Access-Control-Allow-Origin': '*',
            'x-auth': token
        });
        next();
    });
    
    var myResponse = {
            error: error,
            message: message,
            status: status,
            data: data
    }

    return myResponse;
}
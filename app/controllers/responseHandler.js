// response status
export const setResponse = (data,response) =>{
    response.status(200);
    response.json(data);
}

//error status
export const setError = (err,response) => {
    response.status(500);
    console.log(err)
    response.json({
        error:{
            code: 'InternalServerError',
            message: ' Error occured while processing the request',
            details: err.error
        }
    })
}
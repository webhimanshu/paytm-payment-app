//For Promise
//Now we do not have write then and catch everytime
const asyncHandlerV1 = (requestHanlder) => {
    (req, resp, next) => {
        Promise.resolve(requestHanlder(req, resp, next)).catch((err) => next(err));
    }
}

//For Async and Await
const asyncHandlerV2 = (fn) => async (req, resp, next) => {
    try {
        await fn(req, resp, next);
    } catch (error) {
        resp.status(err.code || 500).json({
            success: false,
            message: err.message
        })
    }
}
// const asyncHandler = ()=>{}
// const asyncHandler = (func)=> {}
// const asyncHandler = (func)=> async ()=> {}

module.exports = { asyncHandlerV1, asyncHandlerV2 }

module.exports = class ApiResponse {
    constructor(statusCode, data, message = 'success') {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400; // above 400 will come under api error
    }
}
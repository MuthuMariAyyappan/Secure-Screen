const ErrorHandler = require('../error/ErrorHandler');

const errorHandler = (err, req, res, next) => {
    console.log("error", err);
    if (err instanceof ErrorHandler) {
        return res.status(err.statusCode).json(err);
    }
    // Handle other types of errors
    res.status(500).json({ errorMessage: 'Internal Server Error' });
};

module.exports = errorHandler;

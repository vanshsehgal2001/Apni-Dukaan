module.exports = (handleAsyncErrors) => (req, res, next) => {
    Promise.resolve(handleAsyncErrors(req, res, next)).catch(next);
}
class DataNotFoundError extends Error {
    constructor(message) {
        super();
        this.name = this.constructor.name;
        this.message = message || "Input data not found in database";
        this.status = 404;
    }

    toJSON() {
        return {
            error: {
                name: this.name,
                message: this.message,
            },
        };
    }
}

module.exports = DataNotFoundError;

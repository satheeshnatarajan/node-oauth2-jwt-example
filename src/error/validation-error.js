class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.message = message || "Input data not valid";
        this.status = 400;
    }

    toJSON() {
        return {
            error: {
                name: this.name,
                message: this.message,
                stackTrace: this.stack,
            },
        };
    }
}

module.exports = ValidationError;

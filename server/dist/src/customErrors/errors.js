import { GraphQLError } from 'graphql';
export class AuthorizationError extends GraphQLError {
    constructor(message, code) {
        super(message || 'User not Authorized', {
            extensions: {
                code: code || 'AUTH_ERROR',
            },
        });
    }
}
export class InputValidationError extends GraphQLError {
    constructor(message, code) {
        super(message || 'Inputs Provided ares Incorrect', {
            extensions: {
                code: code || 'INPUT_VALIDATION_ERROR',
            },
        });
    }
}
export class DbError extends GraphQLError {
    constructor(message, code) {
        super(message || 'Database Error', {
            extensions: {
                code: code || 'DB_ERROR',
            },
        });
    }
}

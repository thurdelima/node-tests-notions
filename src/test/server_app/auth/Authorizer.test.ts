import { Authorizer } from "../../../app/server_app/auth/Authorizer"
import { SessionTokenDataAccess } from "../../../app/server_app/data/SessionTokenDataAccess"
import { UserCredentialsDataAccess } from "../../../app/server_app/data/UserCredentialsDataAccess"


const isValidTokenMock = jest.fn();
const generateTokenMock = jest.fn();
const invalidateTokenMock = jest.fn();


jest.mock('../../../app/server_app/data/SessionTokenDataAccess', () => {

    return {
        SessionTokenDataAccess: jest.fn().mockImplementation(() => {
            return {
                isValidToken: isValidTokenMock,
                generateToken: generateTokenMock,
                invalidateToken: invalidateTokenMock
            }

        })
    }
})


describe('Authorizer test suite', () => {
    
})
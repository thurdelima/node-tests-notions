import { RequestTestWrapper } from "./test_utils/RequestTestWrapper";
import { ResponseTestWrapper } from "./test_utils/ResponseTestWrapper";
import { HTTP_CODES, HTTP_METHODS } from "../../app/server_app/model/ServerModel";
import { Account } from "../../app/server_app/model/AuthModel";
import { DataBase } from "../../app/server_app/data/DataBase";


jest.mock('../../app/server_app/data/DataBase');


const requestWrapper = new RequestTestWrapper();
const responseWrapper = new ResponseTestWrapper();

const fakeServer = {
    listen: () => {},
    close: () => {}
}


jest.mock('http', () => ({

    createServer: (cb: any) => {
        cb(requestWrapper, responseWrapper)
        return fakeServer;
    }
}))


const someAccount: Account = {
    id: '',
    password: 'somePassword',
    userName: 'someUserName'
}

const someToken = '1234';

const jsonHeader = { 'Content-Type': 'application/json' }

describe('Login requests test suite', () => {

    const insertSpy = jest.spyOn(DataBase.prototype, 'insert');
    const getBySpy = jest.spyOn(DataBase.prototype, 'getBy');

    beforeEach(()=>{
        requestWrapper.headers['user-agent'] = 'jest tests'
    })

    afterEach(() => {
        requestWrapper.clearFields();
        responseWrapper.clearFields();
        jest.clearAllMocks();
    })


})
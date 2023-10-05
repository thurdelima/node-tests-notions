import { RequestTestWrapper } from './test_utils/RequestTestWrapper';
import { ResponseTestWrapper } from './test_utils/ResponseTestWrapper';
import { HTTP_CODES, HTTP_METHODS } from "../../app/server_app/model/ServerModel";
import { Reservation } from '../../app/server_app/model/ReservationModel';
import { DataBase } from '../../app/server_app/data/DataBase';


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
        return fakeServer
    }
}))

const someReservation: Reservation = {
    id: '',
    endDate: 'someEndDate',
    startDate: 'someStartDate',
    room: 'someRoom',
    user: 'someUser'
}

const someId = 'someId';

const jsonHeader = { 'Content-Type': 'application/json'}



describe('Reservation requests test suite', () => {

    const insertSpy = jest.spyOn(DataBase.prototype, 'insert');
    const getBySpy = jest.spyOn(DataBase.prototype, 'getBy');
    const getAllElementSpy = jest.spyOn(DataBase.prototype, 'getAllElements');
    const updateSpy = jest.spyOn(DataBase.prototype, 'update');
    const deleteSpy = jest.spyOn(DataBase.prototype, 'delete');


    afterEach(() => {
        requestWrapper.clearFields();
        responseWrapper.clearFields();
        jest.clearAllMocks();
    })

})
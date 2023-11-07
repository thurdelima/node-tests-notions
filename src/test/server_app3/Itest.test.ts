import { Account } from "../../app/server_app/model/AuthModel";
import { Reservation } from "../../app/server_app/model/ReservationModel";
import { HTTP_CODES, HTTP_METHODS } from "../../app/server_app/model/ServerModel";
import { Server } from "../../app/server_app/server/Server"
import { makeAwesomeRequest } from "./utils/http-client";





describe('Server app integration tests', () => {

    let server: Server;

    beforeAll(() => {
        server = new Server();
        server.startServer();

    })

    afterAll(() => {

        server.stopServer();
    })

    const someUser: Account = {
        id: '',
        userName: 'someUser',
        password: 'somePassword'
    }

    const someReservation: Reservation = {
        id: '',
        endDate: '',
        startDate: '',
        room: '',
        user: 'someUser'

    }

    it('should register new user', async () => {
        const result = await fetch('http://localhost:8080/register', {
            method: HTTP_METHODS.POST,
            body: JSON.stringify(someUser)
        });

        const resultBody = await result.json();

        expect(result.status).toBe(HTTP_CODES.CREATED);
        expect(resultBody.userId).toBeDefined();


    })

    it('should register new user with awesomeRequest', async () => {
        const result = await makeAwesomeRequest({
            host: 'localhost',
            port: 8080,
            method: HTTP_METHODS.POST,
            path: '/register'
        }, someUser)



        expect(result.statusCode).toBe(HTTP_CODES.CREATED);
        expect(result.body.userId).toBeDefined();


    })

    let token: string;

    it('should login a register user', async () => {
        const result = await fetch('http://localhost:8080/login', {
            method: HTTP_METHODS.POST,
            body: JSON.stringify(someUser)
        });

        const resultBody = await result.json();

        expect(result.status).toBe(HTTP_CODES.CREATED);
        expect(resultBody.token).toBeDefined();
        token = resultBody.token;


    });

    let createReservationId: string;

    it('should create reservation if authorized', async () => {
        const result = await fetch('http://localhost:8080/reservation', {
            method: HTTP_METHODS.POST,
            body: JSON.stringify(someReservation),
            headers: {
                authorization: token
            }

        });

        const resultBody = await result.json();

        expect(result.status).toBe(HTTP_CODES.CREATED);
        expect(resultBody.reservationId).toBeDefined();
        createReservationId = resultBody.reservationId;


    })

    it('should get reservation if authorized', async () => {
        const result = await fetch(`http://localhost:8080/reservation/${createReservationId}`, {
            method: HTTP_METHODS.GET,
            headers: {
                authorization: token
            }

        });

        const resultBody = await result.json();

        const expectedReservation = structuredClone(someReservation);
        expectedReservation.id = createReservationId;

        expect(result.status).toBe(HTTP_CODES.OK);
        expect(resultBody).toEqual(expectedReservation);



    })


    it('should create  and retrieve  multiple reservations if authorized', async () => {
        await fetch('http://localhost:8080/reservation', {
            method: HTTP_METHODS.POST,
            body: JSON.stringify(someReservation),
            headers: {
                authorization: token
            }

        });

        await fetch('http://localhost:8080/reservation', {
            method: HTTP_METHODS.POST,
            body: JSON.stringify(someReservation),
            headers: {
                authorization: token
            }

        });

        await fetch('http://localhost:8080/reservation', {
            method: HTTP_METHODS.POST,
            body: JSON.stringify(someReservation),
            headers: {
                authorization: token
            }

        });

        const getResultAll = await fetch(`http://localhost:8080/reservation/all`, {
            method: HTTP_METHODS.GET,
            headers: {
                authorization: token
            }

        });

        const resultBody = await getResultAll.json();

      

     
        expect(getResultAll.status).toBe(HTTP_CODES.OK)
        expect(resultBody).toHaveLength(4);


    })


})
import request from "supertest";
import { createApp } from "../createApp.js";

const app = createApp();

describe("customers endpoint", () => {
    it("get /customers and expect 200", async () => {
        const res = await request(app).get('/customers').expect(200);
        expect(res.statusCode).toEqual(200);
    });
});

describe("post customers endpoint", () => {
    it("post /customers and expect 200", async () => {
        const res = await request(app).post('/customers').send({
            name: "Test Customer",
            email: "test@email.com"
        }).expect(200);
        expect(res.statusCode).toEqual(200);
    });
});

describe("post and patch customers/id endpoint", () => {
    it("post and then patch /customers/id and expect 200", async () => {
        const postRes = await request(app).post('/customers').send({
            name: "Post Customer",
            email: "post@email.com"
        }).expect(200);
        const id = postRes._body.customer_id;
        const patchRes = await request(app).patch(`/customers/${id}`).send({
            name: "Patch Customer",
            email: "patch@email.com"
        }).expect(200);
        expect(patchRes.statusCode).toEqual(200);
    });
});

describe("post and delete customers/id endpoint", () => {
    it("post and then delete /customers/id and expect 200", async () => {
        const postRes = await request(app).post('/customers').send({
            name: "Post Customer",
            email: "post@email.com"
        }).expect(200);
        const id = postRes._body.customer_id;
        const deleteRes = await request(app).delete(`/customers/${id}`).expect(200);
        expect(deleteRes.statusCode).toEqual(200);
    });
});

describe("get sales endpoint", () => {
    it("get /sales and expect 200", async () => {
        const res = await request(app).get('/sales').expect(200);
        expect(res.statusCode).toEqual(200);
    });
});

describe("post sales endpoint", () => {
    it("post /sales and expect 200", async () => {
        const res = await request(app).post('/sales').send({
            customerName: "Test Customer",
            customerEmail: "test@email.com",
            createdDate: "2024-01-15",
            contractStartDate: "2024-01-15",
            contractEndDate: "2024-12-31",
            status: "active"
        }).expect(200);
        expect(res.statusCode).toEqual(200);
    });
});

describe("post and patch sales/id endpoint", () => {
    it("post and patch /sales/id and expect 200", async () => {
        const postRes = await request(app).post('/sales').send({
            customerName: "Test Customer",
            customerEmail: "test@email.com",
            createdDate: "2024-01-15",
            contractStartDate: "2024-01-15",
            contractEndDate: "2024-12-31",
            status: "active"
        }).expect(200);
        const id = postRes._body.sale_id;
        const patchRes = await request(app).patch(`/sales/${id}`).send({
            customerName: "Test Customer",
            customerEmail: "test@email.com",
            createdDate: "2025-01-15",
            contractStartDate: "2025-01-15",
            contractEndDate: "2025-12-31",
            status: "pending"
        }).expect(200);
        expect(patchRes.statusCode).toEqual(200);
    });
});

describe("post and delete sales/id endpoint", () => {
    it("post and delete /sales/id and expect 200", async () => {
        const postRes = await request(app).post('/sales').send({
            customerName: "Test Customer",
            customerEmail: "test@email.com",
            createdDate: "2026-01-15",
            contractStartDate: "2026-01-15",
            contractEndDate: "2026-12-31",
            status: "pending"
        }).expect(200);
        const id = postRes._body.sale_id;
        const deleteRes = await request(app).delete(`/sales/${id}`).expect(200);
        expect(deleteRes.statusCode).toEqual(200);
    });
});

describe("post and get sales/id endpoint", () => {
    it("post and get /sales/id and expect 200", async () => {
        const postRes = await request(app).post('/sales').send({
            customerName: "Test Customer",
            customerEmail: "test@email.com",
            createdDate: "2027-01-15",
            contractStartDate: "2027-01-15",
            contractEndDate: "2027-12-31",
            status: "pending"
        }).expect(200);
        const id = postRes._body.sale_id;
        const getRes = await request(app).get(`/sales/${id}`).expect(200);
        expect(getRes.statusCode).toEqual(200);
    });
});

describe("get sales/id endpoint", () => {
    it("try to get /sales/id and expect 404", async () => {
        const res = await request(app).get('/sales/999').expect(404);
        expect(res.statusCode).toEqual(404);
    });
});
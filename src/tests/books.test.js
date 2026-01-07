// import request from "supertest";
// import app from "../src/app.js";
// import { PrismaClient } from "@prisma/client";
const request = require("supertest");
const app = require("../app");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

beforeAll(async () => {
    await prisma.book.deleteMany();
});

afterAll(async () => {
    await prisma.$disconnect();
});

test("POST /api/books => 201", async () => {
    const res = await request(app)
        .post("/api/books")
        .send({ title: "Test Book", author: "John Doe" });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Test Book");
});

test("GET /api/books => 200", async () => {
    const res = await request(app).get("/api/books");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
});
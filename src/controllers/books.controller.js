// import { PrismaClient } from "@prisma/client";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createBook(req, res) {
    const { title, author } = req.body;
    const book = await prisma.book.create({ data: { title, author } });
    res.status(201).json(book);
}

async function listBooks(req, res) {
    const books = await prisma.book.findMany();
    res.json(books);
}

async function getBook(req, res) {
    const { id } = req.params;
    const book = await prisma.book.findUnique({ where: { id: Number(id) } });
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
}

async function updateBook(req, res) {
    const { id } = req.params;
    const { title, author } = req.body;
    try {
        const book = await prisma.book.update({
            where: { id: Number(id) }, data: {
                title,
                author
            }
        });
        res.json(book);
    } catch (err) {
        res.status(404).json({ error: "Book not found" });
    }
}

async function deleteBook(req, res) {
    const { id } = req.params;
    try {
        await prisma.book.delete({ where: { id: Number(id) } });
        res.status(204).end();
    } catch {
        res.status(404).json({ error: "Book not found" });
    }
}

module.exports = { createBook, listBooks, getBook, updateBook, deleteBook };
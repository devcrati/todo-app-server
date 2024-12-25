import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import { ValidationError, errorHandler } from "./middleware/errorHandler";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());

const validateTask = (title: string, color: string) => {
  if (!title || title.trim().length === 0) {
    throw new ValidationError("Title is required");
  }
  if (!color || color.trim().length === 0) {
    throw new ValidationError("Color is required");
  }
  if (title.length > 100) {
    throw new ValidationError("Title must be less than 100 characters");
  }
};

app.get("/tasks", async (req, res) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});

app.post("/tasks", async (req, res, next) => {
  try {
    const { title, color } = req.body;
    validateTask(title, color);

    const task = await prisma.task.create({
      data: { title, color },
    });
    res.json(task);
  } catch (error) {
    next(error);
  }
});

app.patch("/tasks/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (updates.title || updates.color) {
      validateTask(updates.title || "", updates.color || "");
    }

    const task = await prisma.task.update({
      where: { id: Number(id) },
      data: updates,
    });
    res.json(task);
  } catch (error) {
    next(error);
  }
});

app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.task.delete({
    where: { id: Number(id) },
  });
  res.json({ message: "Task deleted" });
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

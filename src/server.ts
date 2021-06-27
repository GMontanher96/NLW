import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import { router } from "./routes";

import "./database";

// @types/express
const app = express();
app.use(cors());

app.use(express.json());

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({ error: err.message });
    }

    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
);

/**
 * GET => BUSCAR INFORMAÇÕES
 * POST => INSERIR INFORMAÇÕES
 * PUT => ALTERAR INFORMAÇÕES
 * DELETE => DELETAR INFORMAÇÕES
 * PATCH => ALTERAR UMA INFORMAÇÃO ESPECIFICA
 */

/**
 * TIPOS DE PARÂMETROS
 * ROUTES PARAMS => HTTP://localhost:3000/PRODUTOS/54545455
 * QUERY PARAMS => HTTP://localhost:3000/PRODUTOS?name=teclado&promotion=gratis
 *
 * BODY PARAMS =>  { "name": "teclado", "promotion": "frete gratis"}
 */

// http://localhost:3000
app.listen(3000, () => console.log("Server is running"));

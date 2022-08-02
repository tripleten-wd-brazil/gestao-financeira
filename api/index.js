import express, { Router } from "express";
import cors from "cors";
import DataStore from "nedb";
import path from "path";

const __dirname = path.resolve(path.dirname(""));

const runServer = async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  const db = new DataStore({
    filename: path.join(__dirname, "/db/dbfile"),
    autoload: true,
  });

  // ROUTES
  const router = new Router();
  router.get("/", async (req, res, next) => {
    db.find({}, (err, docs) => {
      if (err) next(err);
      res.json(docs);
    });
  });

  router.post("/", async (req, res, next) => {
    const { date, description, value } = req.body;
    db.insert(
      {
        date,
        description,
        value,
      },
      (err, doc) => {
        if (err) next(err);
        res.status(201).json(doc);
      }
    );
  });

  router.delete("/:id", async (req, res, next) => {
    const { id: _id } = req.params;
    db.remove({ _id }, (err, doc) => {
      if (err) next(err);
      res.status(204).json(doc);
    });
  });

  app.use("/api", router);
  app.use((err, req, res, next) => {
    if (err) {
      console.log("Somthing went wrong!!!", err);
      res.status(500).send("Internal error");
    }
  });

  app.listen(3000, () => console.log("Server running on port 3000"));
};

runServer();

import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import { v4 as uuid } from 'uuid'

const app = express();
const  PORT = process.env.PORT ?? 3000;

// Middlewares
app.use(cors());
app.use(logger('dev'));
app.use(express.json());


// data
const videogames = []

class Videogame {
  constructor({id, title, description}) {
    this.id = id;
    this.title = title;
    this.description = description;
  }

  getId() {
    return this.id;
  }

  getTitle() {
    return this.title;
  }

  setTitle(title) {
    this.title = title;
  }

  getDescription() {
    return this.description;
  }

  setDescription(description) {
    this.description = description;
  }
}

// Routes
app.get('/api/videogames', (req, res) => {
  const videogamesData = videogames.map((videogame) => ({
    id: videogame.getId(),
    title: videogame.getTitle(),
    description: videogame.getDescription()
  }))
  res.status(200).json(videogames)
})

app.post('/api/videogames', (req, res) => {
  const { title, description } = req.body;
  
  const videogameId = uuid();
  const newVideogame = new Videogame({id: videogameId, title, description});
  console.log(newVideogame.getId())
  videogames.push(newVideogame);
  return res.status(201).json(newVideogame);
})

app.get('/api/videogames/:id', (req, res) => {
  const { id } = req.params;
  console.log(id)
  const foundVideogame = videogames.find((videogame) => (videogame.getId() === id.toString())) ?? {message: "Videogame not found"}
  
  res.status(200).json(foundVideogame)
})



const run = () => {
    console.log(`Server running on port ${PORT}`) 
}

app.listen(PORT, run);

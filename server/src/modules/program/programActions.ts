import programRepository from "./programRepository";

import type { RequestHandler } from "express";

const programs = [
  {
    id: 1,
    title: "The Good Place",
    synopsis:
      "À sa mort, Eleanor Shellstrop est envoyée au Bon Endroit, un paradis fantaisiste réservé aux individus exceptionnellement bienveillants. Or Eleanor n'est pas exactement une « bonne personne » et comprend vite qu'il y a eu erreur sur la personne. Avec l'aide de Chidi, sa prétendue âme sœur dans l'au-delà, la jeune femme est bien décidée à se redécouvrir.",
    poster:
      "https://img.betaseries.com/JwRqyGD3f9KvO_OlfIXHZUA3Ypw=/600x900/smart/https%3A%2F%2Fpictures.betaseries.com%2Ffonds%2Fposter%2F94857341d71c795c69b9e5b23c4bf3e7.jpg",
    country: "USA",
    year: 2016,
  },
  {
    id: 2,
    title: "Dark",
    synopsis:
      "Quatre familles affolées par la disparition d'un enfant cherchent des réponses et tombent sur un mystère impliquant trois générations qui finit de les déstabiliser.",
    poster:
      "https://img.betaseries.com/zDxfeFudy3HWjxa6J8QIED9iaVw=/600x900/smart/https%3A%2F%2Fpictures.betaseries.com%2Ffonds%2Fposter%2Fc47135385da176a87d0dd9177c5f6a41.jpg",
    country: "Allemagne",
    year: 2017,
  },
];

const browse: RequestHandler = async (req, res, next) => {
  try {
    const programsFromDB = await programRepository.readAll();

    res.json(programsFromDB);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = (req, res, next) => {
  try {
    const parsedId = Number.parseInt(req.params.id);

    const program = programs.find((p) => p.id === parsedId);

    if (program != null) {
      res.json(program);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const program = {
      id: Number(req.params.id),
      title: req.body.title,
      synopsis: req.body.synopsis,
      poster: req.body.poster,
      country: req.body.country,
      year: Number(req.body.year), // Fix: Utilisation de req.body pour year
      category_id: Number(req.body.category_id), // Fix: Ajouter category_id
    };

    const affectedRows = await programRepository.update(program);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

// Destroy
const destroy: RequestHandler = async (req, res, next) => {
  try {
    const programId = Number(req.params.id);

    const affectedRows = await programRepository.delete(programId);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

// Validate

import Joi from "joi";

const serieSchema = Joi.object({
  title: Joi.string().max(255).required(),
  synopsis: Joi.string().max(255).required(),
  poster: Joi.string().max(255).required(),
  country: Joi.string().max(255).required(),
  year: Joi.number().integer().required(),
  category_id: Joi.number().integer().required(), 
});

const validate: RequestHandler = (req, res, next) => {
  const { error } = serieSchema.validate(req.body, { abortEarly: false });

  if (error == null) {
    next();
  } else {
    res.status(400).json({ validationErrors: error.details });
  }
};

export default { browse, read, edit, destroy, validate };

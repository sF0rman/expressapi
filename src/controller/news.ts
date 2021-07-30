import { ResourceNotFoundError, Resource, BadRequestError } from "../utils/errorHandler";
import { News, NewsData } from "../models/News";
import { HTTPCode } from "../models/HTTPCodes";
import { okResponse } from "../utils/utils";
import { RequestHandler } from "express";

const getAllNews: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const found: any = await News.findAll();
    if (!found) {
      return next(new ResourceNotFoundError(Resource.News))
    }
    res.status(HTTPCode.OK).send(okResponse(found));
  } catch (err) {
    next(err);
  }
}

const getNewsById: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id) { return next(new BadRequestError) }

    const news: NewsData = await News.findByPk(id);
    if (!news) {
      return next(new ResourceNotFoundError(Resource.News));
    }

    res.status(HTTPCode.OK).send(okResponse(news));
  } catch (err) {
    next(err);
  }
}

export {
  getAllNews,
  getNewsById
}
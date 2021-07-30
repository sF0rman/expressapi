import { HTTPCode } from "../models/HTTPCodes";
import { BadRequestError } from "../utils/errorHandler";
import path from 'path';

const getImage = async (req, res, next): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id) { return next(new BadRequestError) }

    res.status(HTTPCode.OK).sendFile(path.join(__dirname, `../media/img/${id}`));
  } catch (err) {
    next(err);
  }
}

export {
  getImage
}
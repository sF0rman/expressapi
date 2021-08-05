import fs from 'fs';
import path from 'path';
import { HTTPCode } from "../models/HTTPCodes";
import { BadRequestError, Resource, ResourceNotFoundError } from "../utils/errorHandler";

const getImage = async (req, res, next): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id) { return next(new BadRequestError) }

    const localPath = path.join(__dirname, `../media/img/${id}`);
    const img = fs.existsSync(localPath);

    if (!img) {
      return next(new ResourceNotFoundError(Resource.Img))
    }
    res.status(HTTPCode.OK).sendFile(localPath);

  } catch (err) {
    next(err);
  }
}

export {
  getImage
};

import { HTTPCode } from "../models/HTTPCodes";
import { BadRequestError, Resource, ResourceNotFoundError } from "../utils/errorHandler";
import path from 'path';
import fs from 'fs';

const getImage = async (req, res, next): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id) { return next(new BadRequestError) }

    const localPath = path.join(__dirname, `../media/img/${id}`);
    const image = fs.existsSync(localPath);

    if (!image) {
      return next(new ResourceNotFoundError(Resource.Img))
    }

    console.log(image);

    res.status(HTTPCode.OK).sendFile(localPath);
  } catch (err) {
    next(err);
  }
}

export {
  getImage
}
import { BadRequestError, Resource, ResourceNotFoundError } from "../utils/errorHandler";
import { Users } from '../models/User';
import { HTTPCode } from "../models/HTTPCodes";
import { isValidUUID, okResponse } from "../utils/utils";

/**
 * @description Get logged in user
 * @route GET /api/auth/register
 * @access all logged in
 */
const getSelf = async (req, res, next): Promise<void> => {
  try {
    // Protected route, should always have userid.
    const id = req.user.id;

    const user = await Users.findByPk(id);
    if (!user) {
      return next(new ResourceNotFoundError(Resource.User))
    }

    res.status(HTTPCode.OK).send(okResponse(user));
  } catch (err) {
    next(err);
  }
}

/**
 * @description Get User By Id
 * @route GET /api/auth/register
 * @access all logged in
 */
const getUserById = async (req, res, next): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id) { return next(new BadRequestError()) }
    if (!isValidUUID(id)) { return next(new BadRequestError('UUID')) }

    const user = await Users.findByPk(id);
    if (!user) {
      return next(new ResourceNotFoundError(Resource.User))
    }

    res.status(HTTPCode.OK).send(okResponse(user));
  } catch (err) {
    next(err);
  }
}

/**
 * 
 * @description Get all Users
 * @route GET /api/user
 * @access all logged in
 */
const getAllUsers = async (req, res, next): Promise<void> => {
  try {
    const users = await Users.findAll();

    if (!users) {
      return next(new ResourceNotFoundError(Resource.User))
    }

    res.status(HTTPCode.OK).send(okResponse(users));
  } catch (err) {
    next(err);
  }
}

export {
  getSelf,
  getUserById,
  getAllUsers
}
import {Router} from 'express';
import * as userController from './userController.js';
import * as userSchema from './userSchema.js';
import { validation } from '../../middleware/validationMiddleware.js';
import { fileUpload } from '../../utils/fileUpload.js';
import { isAuthenticated } from './../../middleware/authenticationMiddleware.js';
const router=Router();

router.post('/register',fileUpload().fields([
    {name:"profileImage",maxCount:1},
]),validation(userSchema.register),userController.register);

router.get('/activate_account/:token',validation(userSchema.activate_account),userController.activate_account);

router.post('/login',validation(userSchema.login),userController.login);

router.post('/forgetPassword',validation(userSchema.forgetPassword),userController.forgetPassword);

router.put('/resetPassword',validation(userSchema.resetPassword),userController.resetPassword);

router.delete('/deleteUser',isAuthenticated,userController.deleteUser);

router.put('/updateUser',isAuthenticated,fileUpload().fields([
    {name:"profileImage",maxCount:1},
]),validation(userSchema.updateUser),userController.updateUser);

export default router;
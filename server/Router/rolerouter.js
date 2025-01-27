import {Router} from "express";
const rolerouter = Router();

import * as controller from '../Controller/roleController.js';


rolerouter.route('/addrole').post(controller.addRole)

rolerouter.route('/deleterole').post(controller.deleterole)

export default rolerouter;


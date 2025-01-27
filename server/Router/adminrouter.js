import {Router} from "express";
const adminrouter = Router();

import * as controller from '../Controller/adminController.js';

adminrouter.route('/adminlogin').post(controller.adminlogin);
// adminrouter.route('/addrole').post(controller.AddRole)

// adminrouter.route('/deleterole').post(controller.DeleteRole)

export default adminrouter;

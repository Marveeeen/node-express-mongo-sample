const express = require('express');
const router = express.Router();
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');
const {
    getAllEmployees,
    createNewEmployees,
    updateEmployee,
    deleteEmployee,
    getEmployee
} = require('../../controllers/employeesController')

router.route('/')
    .get(getAllEmployees)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),createNewEmployees)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),updateEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin),deleteEmployee)

router.route('/:id')
    .get(getEmployee)


module.exports = router;
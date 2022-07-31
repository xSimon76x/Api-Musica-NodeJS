const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const {
  createItem,
  getItems,
  deleteItem,
  getItem,
} = require("../controllers/storage");
const { validatorGetItem } = require("../validators/storage");
// http://localhost:3001:/api/storage

/**
 * http://localhost:3001/api
 *
 * Route Crear un item
 * @openapi
 * /storage?myfile:
 *      post:
 *          tags:
 *              - storage
 *          summary: "Subir un archivo"
 *          description: "Esta ruta es para crear un item en el storage"
 *          security:
 *            - bearerAuth: []
 *          requestBody:
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            myfile:
 *                              type: string
 *                              format: binary
 *          responses:
 *                  '201':
 *                      description: El archivo se ingresa de manera correcta
 *                  '403':
 *                      description: Error por validacion
 */
router.post("/", uploadMiddleware.single("myfile"), createItem);

/**
 * http://localhost:3001/api
 *
 * Route Obtener todos los archivos
 * @openapi
 * /storage:
 *      get:
 *          tags:
 *              - storage
 *          summary: "Obtener todos los archivos"
 *          description: "Esta ruta es para obtener todos los item del storage"
 *          security:
 *            - bearerAuth: []
 *          responses:
 *                  '201':
 *                      description: Se obtuvieron todos los archivos
 *                      content:
 *                        application/json:
 *                          schema:
 *                            type: array
 *                            items:
 *                              $ref: "#/components/schemas/storage"
 *
 *                  '422':
 *                      description: Error por validacion
 */
router.get("/", getItems);

/**
 * Delete del storage
 * @openapi
 * /storage/{id}:
 *    delete:
 *      tags:
 *        - storage
 *      summary: "Eliminar un archivo en storage"
 *      description: Elimiar el detalle de una storage
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID de canción a retornar
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Retorna el objecto de la storage.
 *        '422':
 *          description: Error de validacion.
 */
router.delete("/:id", validatorGetItem, deleteItem);

/**
 * Obtener el detalle del archivo
 * @openapi
 * /storage/{id}:
 *    get:
 *      tags:
 *        - storage
 *      summary: "Detalle de uin archivo en storage"
 *      description: Obten el detalle de una storage
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID de storage a retornar
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Retorna el objecto de la storage.
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/storage'
 *        '422':
 *          description: Error de validacion.
 */
router.get("/:id", validatorGetItem, getItem);

module.exports = router;

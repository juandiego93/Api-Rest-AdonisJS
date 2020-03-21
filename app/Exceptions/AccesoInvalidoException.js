'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class AccesoInvalidoException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle(error, { response }) {
    return response.status(403).json({ mensaje: 'Usted no es dueño de este proyecto.' })
  }
}

module.exports = AccesoInvalidoException

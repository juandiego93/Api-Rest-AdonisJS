'use strict'
const AcesoInvalido = use('App/Exceptions/AccesoInvalidoException')
const RecursoNoEncontrado = use('App/Exceptions/RecursoNoEncontradoException')

class AutorizacionServices {
    verificarPermiso(recurso, usuario) {
        if(!recurso){
            throw new RecursoNoEncontrado();
        }
        if (usuario.id !== recurso.user_id) {
            throw new AcesoInvalido()
        }
    }
}


module.exports = new AutorizacionServices()
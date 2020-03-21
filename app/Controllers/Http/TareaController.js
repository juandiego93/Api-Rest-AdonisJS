'use strict'
const Proyecto = use('App/Models/Proyecto')
const Tarea = use('App/Models/Tarea')
const AutorizacionServices = use('App/Services/AutoriacionServices')

class TareaController {

    async index({ auth, request, params }) {
        const user = await auth.getUser()
        const { id } = params
        const proyecto = await Proyecto.find(id)
        AutorizacionServices.verificarPermiso(proyecto, user)
        return proyecto.tareas().fetch()
    }

    async create({ auth, request, params }) {
        const user = await auth.getUser()
        const { description } = request.all()
        const { id } = params
        const proyecto = await Tarea.find(id)
        AutorizacionServices.verificarPermiso(proyecto, user)
        const tarea = new Tarea()
        tarea.fill({
            description
        })
        await proyecto.tareas().save(tarea)
        return tarea
    }

    async update({ auth, params, request }) {
        const user = await auth.getUser()
        const { id } = params
        const tarea = await Tarea.find(id)
        const proyecto = await tarea.proyecto().fetch()
        AutorizacionServices.verificarPermiso(proyecto, user)
        Tarea.merge(request.only('decripcion','completada'))
        await tarea.save()
        return tarea
    }

    async destroy({ auth, response, params }) {
        const user = await auth.getUser()
        const { id } = params
        const tarea = await Tarea.find(id)
        const proyecto = await tarea.proyecto().fetch()
        AutorizacionServices.verificarPermiso(proyecto, user)
        await tarea.delete()
        return tarea
    }
}

module.exports = TareaController

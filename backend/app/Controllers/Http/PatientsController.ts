import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Patient from 'App/Models/Patient'
import Database from '@ioc:Adonis/Lucid/Database'

export default class PatientsController {
  public async index({ request, logger, response }: HttpContextContract) {
    try {
      const page = request.input('page', 1)
      const limit = 10
      return await Database.from('patients').paginate(page, limit)
    } catch (error) {
      logger.error(`Error index method Patient: ${error.message}`)
      response.status(500).send('Server internal error')
    }
  }

  public async store({ request, logger, response }: HttpContextContract) {
    try {
      const patient = await Patient.create(request.body())

      return patient
    } catch (error) {
      logger.error(`Error store method Patient: ${error.message}`)
      response.status(500).send('Server internal error')
    }
  }

  public async show({ logger, response }: HttpContextContract) {
    try {
      // const patient = await Patient.create(request.body())
      // return patient
    } catch (error) {
      logger.error(`Error store method Patient: ${error.message}`)
      response.status(500).send('Server internal error')
    }
  }

  public async update({ request, logger, response }: HttpContextContract) {
    try {
      const { id } = request.params()
      const patient = await Patient.findBy('id', id)

      if (!patient) return response.status(404).send('Not Found Patient')

      await patient.merge(request.body()).save()

      return patient
    } catch (error) {
      logger.error(`Error store method Patient: ${error.message}`)
      response.status(500).send('Server internal error')
    }
  }

  public async destroy({ request, logger, response }: HttpContextContract) {
    try {
      const { id } = request.params()
      const patient = await Patient.findBy('id', id)

      if (!patient) return response.status(404).send('Not Found Patient')

      await patient.delete()

      return 'Patient deleted'
    } catch (error) {
      logger.error(`Error store method Patient: ${error.message}`)
      response.status(500).send('Server internal error')
    }
  }
}

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Depense from 'App/Models/Depense';
import User from 'App/Models/User';

export default class DepensesController {
    public async index({ request, response }: HttpContextContract) {
        const userId = request.input('users_id')
        const depenses = userId 
          ? await Depense.query().where('users_id', userId)
          : await Depense.all()
    
        return response.status(200).json({
          message: 'Depenses retrieved successfully',
          status: 'success', 
          data: depenses
        })
      }
    
      public async store({ request, response }: HttpContextContract) {
        const payload = request.body()
        const userId = request.input('users_id')
    
        // Récupérer l'utilisateur
        const user = await User.findOrFail(userId)
    
        // Récupérer le solde actuel de l'utilisateur et le caster en nombre 
        let currentBalance = Number(user.solde)
    
        // Récupérer le montant de la dépense et le caster en nombre
        const depenseAmount = Number(payload.montant)
    
        // Soustraire le montant de la dépense du solde actuel
        currentBalance -= depenseAmount
    
        // Mettre à jour le solde de l'utilisateur
        user.solde = currentBalance
    
        // Enregistrer les modifications du solde de l'utilisateur
        await user.save()
    
        // Créer la nouvelle dépense
        const depense = await Depense.create({ ...payload, users_id: userId })
    
        return response.status(201).json({
          message: 'Depense created successfully',
          status: 'success',
          data: depense 
        })
      }

      public async show ({ response, params }: HttpContextContract) {
        const depense = await Depense.findOrFail(params.id);      
        return response.status(200).json({
          message: 'Depense retrieved successfully',
          status: 'success',
          data: depense 
        });
      
      }


      public async update ({ request, response, params }: HttpContextContract) {      
        const depenses = await Depense.findOrFail(params.id);
        const payload = request.body();    
        depenses.merge(payload).save();      
        return response.status(200).json({
          message: 'Depense updated successfully',
          status: 'success',
          data: depenses
        });
      
      }
      
      public async destroy ({ response, params }: HttpContextContract) {      
        const depenses = await Depense.findOrFail(params.id);
        await depenses.delete();      
        return response.status(200).json({
          message: 'Depense deleted successfully',
          status: 'success',
          data: depenses
        });
      
      }
}

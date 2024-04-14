import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Recharge from 'App/Models/Recharge'
import User from 'App/Models/User';
export default class RechargesController {
    public async index ({request, response}: HttpContextContract) {
        const userId = request.input('users_id');
        const categories = userId ? await Recharge.query().where('users_id', userId) : await Recharge.all();
        return response.status(200).json({
            message: 'Categories retrieved successfully',
            status: 'success', 
            data: categories
        });
    }

    public async store ({ request, response }: HttpContextContract) {

        const payload = request.body()
      
        const user = await User.findOrFail(request.input('users_id'))
      
        // Récupérer le solde actuel et le caster en nombre 
        const currentBalance = Number(user.solde)

        // Récupérer le montant de la recharge et le caster en nombre
        const rechargeAmount = Number(payload.montant)

        // Faire l'addition 
        const newBalance = currentBalance + rechargeAmount

        // Sauvegarder la nouvelle valeur
        user.solde = newBalance
      
        await user.save()
      
        const recharge = await Recharge.create({...payload, users_id: request.input('users_id')});
      
        return response.status(201).json({
          message: 'Recharge created successfully',
          status: 'success',
          data: recharge 
        })
      
      }
      
    
      public async show ({ response, params }: HttpContextContract) {
        const category = await Recharge.findOrFail(params.id);      
        return response.status(200).json({
          message: 'Recharge retrieved successfully',
          status: 'success',
          data: category 
        });
      
      }
      
      public async update ({ request, response, params }: HttpContextContract) {      
        const recharge = await Recharge.findOrFail(params.id);
        const payload = request.body();    
        recharge.merge(payload).save();      
        return response.status(200).json({
          message: 'Recharge updated successfully',
          status: 'success',
          data: recharge
        });
      
      }
      
      public async destroy ({ response, params }: HttpContextContract) {      
        const recharge = await Recharge.findOrFail(params.id);
        await recharge.delete();      
        return response.status(200).json({
          message: 'Recharge deleted successfully',
          status: 'success',
          data: recharge
        });
      
      }
}

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import LoginUserValidator from 'App/Validators/LoginUserValidator'
import RegisterUserValidator from 'App/Validators/RegisterUserValidator'

export default class AuthController {
    public async register({ request, response }: HttpContextContract) {

        const payload = await request.validate(RegisterUserValidator);
    
        try {
        const user = await User.create(payload);
    
        return response.status(201).send({
            message: 'User created successfully', 
            status: 'success',
            data: {
            id: user.id  
            }
        });
    
        } catch (error)  {
            // Logger l'erreur 
            console.error(error)
            return response.status(400).send({
                message: 'Error creating user',
                status: 'error',
                stack: error.stack,
            }); 
        }
    
    } 
    
    public async login({ request, response, auth }: HttpContextContract) {

        const { phone, password } = await request.validate(LoginUserValidator);
    
        try {
        const token = await auth.use('api').attempt(phone, password);
        
        return response.status(200).json({
            message: 'Login successful',
            status: 'success',
            data: {
            token
            }
        });
    
        }  catch (error)  {
            console.error(error)
            return response.status(400).json({
                message: 'Invalid credentials',
                status: 'error',                
                stack: error.stack,
            });
        }    
    }
    
       
    public async logout({ auth, response }: HttpContextContract) {
        await auth.logout()
        return response.status(200).json({
            message : "Logged out successfully !",
            status: 'success'
        })
    }
}

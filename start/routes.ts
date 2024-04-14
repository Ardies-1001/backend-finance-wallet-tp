/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  // Authentification
  Route.post('/auth/login', 'AuthController.login')
  Route.post('/auth/register', 'AuthController.register')
  Route.post('/auth/logout', 'AuthController.logout')

  // Recharge
  Route.resource( '/recharge', 'RechargesController').except(['create','edit'])
  
  // Dépense
  Route.resource( '/depense', 'DepensesController').except(['create','edit'])

  // // Commande
  // Route.resource( '/order', 'OrdersController').except(['create','edit'])


}).prefix('api')
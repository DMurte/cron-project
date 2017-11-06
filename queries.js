const async = require('es5-async-await/async');
const await = require('es5-async-await/await');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Model = require('./model');
const request= {};

request.mainQuery = async ( (data) =>  {
   return new Promise( (resolve, reject) => {

    const renting_types = await ( Model.renting_types.findAll() );


    const transactions = await ( Model.transactions.findAll({
                where:{
                    renting_type:{
                        [Op.gte]: 1,
                    }
                   
                  }
               }
            )
        );

    transactions.forEach( transaction => {

        const bricks =  Number(transaction.bricks);
        
            if (bricks) {

                if(transaction.renting_type*12>transaction.meses){


                            const user_transactions = await ( Model.transactions.findAll({
                                where:{
                                    user_id: transaction.user_id,
                                    renting_type:{
                                        [Op.gte]: 1,
                                    }
                                }
                            }
                        )
                    );
                    
                    let user_bricks = 0;

                    user_transactions.forEach( bricks => {

                        user_bricks += bricks.cantidad

                    })


            //let r = (bricks/2970)*renting_types[0].month_first_interval;
            let r = 0;

            if(user_bricks<16048){
                if(transaction.renting_type==1){
                    r = ((bricks/2970)*renting_types[0].month_first_interval);
                }else{
                    r = ((bricks/2970)*renting_types[1].month_first_interval);
                }
            }else{
                if(user_bricks<30012){
                    if(transaction.renting_type==1){
                        r = ((bricks/2970)*renting_types[0].month_second_interval);
                    }else{
                        r = ((bricks/2970)*renting_types[1].month_second_interval);
                    }
                }else{
                    if(user_bricks<45710){
                        if(transaction.renting_type==1){
                            r = ((bricks/2970)*renting_types[0].month_third_interval);
                        }else{
                            r = ((bricks/2970)*renting_types[1].month_third_interval);
                        }
                    }else{
                        if(transaction.renting_type==1){
                            r = ((bricks/2970)*renting_types[0].month_fourth_interval);
                        }else{
                            r = ((bricks/2970)*renting_types[1].month_fourth_interval);
                        }
                    }

                }
            }


            let p = Number( bricks +  r)/2970;
        
        // console.log(r,p)
            await( Model.transactions.update(
                    {
                            user_id : transaction.user_id,
                            status : 1,
                            bricks : (bricks + r) ,
                            type : 4 ,
                            cantidad: p,
                            origen : transaction.origen,
                            titulo : transaction.titulo,
                            renting_type: transaction.renting_type,
                            meses : transaction.meses + 1
                
                    },{
                            where:{
                                id : transaction.id
                            }
                        }
                    )
                );   


        await( Model.renting.create({
                                        user_id : transaction.user_id,
                                        valor : (bricks + r),
                                        ladrillos : p,
                                        incremento: r,
                                        descripcion : "Renting",
                                        titulo : "Renting Mensual",
                                        transaction_id: transaction.id,
                                        renting_type : transaction.renting_type
                                        }
                                    )
                                );   
            console.log(`Intereses del usuario ${transaction.user_id} han sido agregadas`);

                }


            }else{

                console.log("Transaccion no agregada");
                
            }

            
        
                
        })


     resolve('---TRANSACCIONES AGREGADAS---')
     return;
    

   });
    
});



module.exports = request;

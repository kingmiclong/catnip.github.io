

//This entire system may be rewritten depending on how much further 
//the scope develops






//The middleman between the chef and ingredients
//Tracks ingredient production and stockpiles
//Checks if there is enough ingredients to make a 
//Recipe
class InventoryData {

    constructor(){
        
        this.seasonbuff =[1.5,1,0,.5];
        this.apples = new IngredientData('Apples','fall');
        this.pumpkins = new IngredientData('Pumkins','winter');
        this.berry =  new IngredientData('Berry','spring');
        this.corn = new IngredientData('Corn','summer');
        

        this.inStock = [(this.berry),(this.corn),(this.pumpkins),(this.apples)];
        this.stockCount = [0,0,0,0];
        this.outgoing = [0,0,0,0];
        
    }
    sBuffCalc(seasonbuff){

        
     
         switch(getSeason()){
          
 
             case 'spring':
                 return seasonbuff=[1.5,1,0,.5];
                 
             case 'summer':
                 return seasonbuff=[.5,1.5,1,0];
             
             case 'winter': 
                 return seasonbuff=[0,.5,1.5,1];
             case 'fall':
                 return seasonbuff=[1.5,1,.5,0];
             default:
                 console.log('uhoh');
                 break;
 
         }
     }
     //updates every second incrementing the total amount of produce by the yield
    harvest(){
        eventEmitter.on('seasonCycle',()=>{switch(getSeason()){
          
 
            case 'spring':
                console.log('spring = no apple');
                let buff=[1.5,1,0,.5];
                this.seasonbuff.splice(0, this.seasonbuff.length, ...buff);
                break;
            case 'summer':
                console.log('summer = no pumpkin');
                 let buff1=[.5,1.5,1,0];
                 
                 this.seasonbuff.splice(0, this.seasonbuff.length, ...buff1);
                 break;
            case 'winter': 
            console.log('winter = no berry');
                 let buff2=[0,.5,1.5,1];
     
                this.seasonbuff.splice(0, this.seasonbuff.length, ...buff2);
                break;
            case 'fall':
                console.log('fall= no corn');
               let buff3=[.5,0,1,1.5];
                
                this.seasonbuff.splice(0, this.seasonbuff.length, ...buff3);
                break;
            default:
                console.log('uhoh');
                break;

        }
    });

     
   
    for(let  x = 0; x < 4; x++){
        this.stockCount[x] += this.inStock[x].crop(this.seasonbuff[x]);
        
        //if one ingredient is missing, dont remove any items that are used in the recipie
        
    }  
    }
    

       //chef asks for ingredients and if all are in 
       //stock subtract that much and let them cook
    orderedIng(){
        
        for (let x = 0 ; x <4;x++) {
            if (this.stockCount[x]<this.outgoing[x]){
                return false;
            }
            
        }

        for(let y = 0;y<4;y++){
            
            this.stockCount[y]-=this.outgoing[y];
           
        }
        
        return true;

    }

    //Chef request ingredient amount per second 
    //every time recipe changes or scales
    //outgoing amounts allow for 
   
   

    requestSet(ingredient,amount){
        switch(ingredient){
            case 'Berry':
                this.outgoing[0]=amount;
                return ;
                
            case 'Corn':
                this.outgoing[1]=amount;
                return ;
            case 'Apples': 
            this.outgoing[2]=amount;
                return ;
            case 'Pumpkins':
                this.outgoing[3]=amount;
                return ;
            default:
                console.log('uhoh2');
                return

        }
        
    }


   

    
    

}

class IngredientData {
    constructor(name,season){
        
        this.name = name;
        this.season =season;
        this.level = 0;
        this.yield = 1;
        
    }

    getName(){
        return this.name;
    }
    
    crop(passedbuff){
        return this.yield*passedbuff;
    }

    levelUp(){

    }

    yieldUp(){

    }

    
}

//holds ingredients needed
//holds amount of ingredients needed
//holds base selling price
//PLEASE INITIALIZE RECIPIES WITH THE INGREDIENTS, FOLLOWED BY
//THE NEEDED AMOUNTS 
// example
// Apples,pumpkins, 1 ,2;
class RecipeData{
    constructor(name,value,...recipelist ){
        this.name = name;
        this.reqIngred=[];
        this.reqamount=[];
        for(let x in recipelist){
            
            
            if(isNaN(recipelist[x])){
                this.reqIngred.push(recipelist[x]);
               
            
        }
        else{
            this.reqamount.push(recipelist[x]);
        }
    }
        this.isKnown= false;
        this.value = value;
    }

  
}





//takes in recipe and requests ingredients
//
class ChefData {
construcor(recipeinit){
    
    this.currentRecipe = recipeinit ;
    this.productionMult = 1;
    
}
    //set current recipe and tell the inventoryData what is 
    //needed
    //ALWAYS SET RECIPE BEFORE UPDATING
    setRecipe(RecipeDat,inven){
        this.currentRecipe = RecipeDat;
        let Recipelen = this.currentRecipe.reqIngred.length;
       
        if(RecipeDat.reqIngred[0]==='airsoup'){
            
        }
        for (let x = 0; x <Recipelen;x++ ){
            inven.requestSet(this.currentRecipe.reqIngred[x],this.currentRecipe.reqamount[x]);
            console.log("amount"+this.currentRecipe.reqIngred[x])

        }
    }

    cookStuff(inven,cashier){
        //if there is enough ingredients, make food and tell cashier
        //to make sale
      
       if( inven.orderedIng()){
        

           return cashier.makeSale(this.currentRecipe.value);
       }
       else {
        return 0;
       }
       
    }
    
   

    
    //Used by Catnip Collector to get the current 
    //returns 0 if nothing was made
    orderUp(){

    }

    


}
//Asks if something has been cooked and calculates the total
//catnip gained and in the bank
class CatnipCollector{
    constructor(){

    }

    makeSale(value){

        return value;

    }





}
//contains list of all the recipies and 
//a list of all recipies the player knows
class Grimoire{

}










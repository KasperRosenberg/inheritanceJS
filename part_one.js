//Kasper Rosenberg - karo5568

function myObject() {}
myObject.create = function(prototypeList) {
    var newObject = {};
    newObject.__proto__ = myObject.prototype;
    newObject.create = myObject.create;
    newObject.list = prototypeList; 
    
    newObject.addPrototype = function(parentPrototype){
        if((parentPrototype.list == null || !parentPrototype.list.includes(this)) && this != parentPrototype) {
            if(this.list == null){
                //this.lista är null - så skapa en lista
                this.list = [parentPrototype];       
            }else{
                //Det finns innehåll i this.lista - så lägg till i listan.
                this.list.push(parentPrototype);
            }
        }else{
            console.log("Error: That would result in Circular Inheritance");
        }
    }
    return newObject;
}

myObject.prototype.call = function(func, parameter) {
    //Finns func i this?
    if(this.hasOwnProperty(func)){
        return this.func(parameter);
    }
    //kolla om func finns 
    for(i = 0; i < this.list.length; i++){
        if(this.list[i].hasOwnProperty(func)){
            return this.list[i].func(parameter);
        }
        if(Array.isArray(this.list[i].list)){
            for(j = 0; j < this.list[i].list.length; j++){
                if(this.list[i].list[j].hasOwnProperty(func)){
                    return this.list[i].list[j].func(parameter);
                }
            }
        }  
    }
}

//Kasper Rosenberg - karo5568

function createClass(newClassName, superClassList){
    var classObject = {};
    classObject.name = newClassName;
    classObject.list = superClassList;
    classObject.addSuperClass = function(superClass){
        if((superClass.list == null || !superClass.list.includes(this)) && this != superClass) {
            if(this.list == null){
                //Kolla om listan är null och skapa en lista med superClassen i om den är det.
                this.list = [superClass];
            }else{
                //Om det redan finns en lista så lägg bara till superclassen till listan.
                this.list.push(superClass);
            }          
        }else{
            //Annars felmeddelandet pga circular inherritance (Kollas i första if satsen).
            console.log("Error: This inheritance is not allowed.");
        }
    }
    classObject.new = function(){
        var object = {};
        object.class = classObject;
        object.call = function(func, parameter){
            //Kolla om func finns i this
            if(this.class.hasOwnProperty(func)){
                return this.class.func(parameter);
            }
            //Kolla om func finns i något av objekten i listan
            for(i = 0; i < this.class.list.length; i++){
                if(this.class.list[i].hasOwnProperty(func)){
                    return this.class.list[i].func(parameter);
                }
                if(Array.isArray(this.class.list[i].list)){
                    for(j = 0; j < this.class.list[i].list.length; j++){
                        if(this.class.list[i].list[j].hasOwnProperty(func)){
                            return this.class.list[i].list[j].func(parameter);
                        }
                    }
                }  
            }
        }
        return object;
    }
    return classObject;
}



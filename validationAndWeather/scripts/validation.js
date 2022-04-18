function isIntegerInRange(str,min,max){

    if(typeof str == "string"){
        let num = Number(str);
        if(num >= min && num <= max){
            console.log("Number is in Range");
            return true;
        }
    }else{
        console.log("Number is not in Range");
        return false;
    }
}


function isFloatInRange(str,min,max){
    if(typeof str == "string"){
        let num = Number(str);
        if(num >= min && num <= max){
            console.log("Number is in Range");
            return true;
        }
    }else{
        console.log("Number is not in Range");
        return false;
    }
}

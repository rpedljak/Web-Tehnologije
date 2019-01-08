var Validacija=(function(){
    var konstruktor=function(divElementPoruke){

            var paragraf=document.createElement('p');
            divElementPoruke.appendChild(paragraf);

            var imeBool=true;
            var nazivBool=true;
            var godinaBool=true;
            var repoBool=true;
            var indexBool=true;
            var passwordBool=true;
            var urlBool=true;

        return{
            ime:function(inputElement){
                var ime=/^([A-Z][a-zA-Z]*[']?[A-Za-z]+([a-zA-Z]*[']?[A-Za-z]+)*[\s-]?){0,3}([A-Z][a-zA-Z]*[']?[A-Za-z]+([a-zA-Z]*[']?[A-Za-z]+)*){1}$/;
                var validno=ime.test(inputElement.value); 
                if(!validno) {
                    inputElement.style.backgroundColor="orangered";
                    imeBool=false;
                    paragraf.textContent="Sljedeća polja nisu validna:ime";
                    if(!nazivBool) paragraf.textContent+=",naziv";
                    if(!godinaBool) paragraf.textContent+=",godina";
                    if(!repoBool) paragraf.textContent+=",repozitorij";
                    if(!indexBool) paragraf.textContent+=",index";
                    if(!passwordBool) paragraf.textContent+=",password";
                    if(!urlBool) paragraf.textContent+=",url";
                    paragraf.textContent+="!";
                }
                else {
                    inputElement.style.backgroundColor="white";
                    imeBool=true;
                    paragraf.textContent="Sljedeća polja nisu validna:";
                    if(!nazivBool) paragraf.textContent+=",naziv";
                    if(!godinaBool) paragraf.textContent+=",godina";
                    if(!repoBool) paragraf.textContent+=",repozitorij";
                    if(!indexBool) paragraf.textContent+=",index";
                    if(!passwordBool) paragraf.textContent+=",password";
                    if(!urlBool) paragraf.textContent+=",url";
                    paragraf.textContent+="!";
                    var i=paragraf.textContent.indexOf(":");
                    if(paragraf.textContent.charAt(i+1)=="!") paragraf.textContent="";
                    else {
                        i++;
                        paragraf.textContent=paragraf.textContent.substring(0,i)+paragraf.textContent.substring(i+1,paragraf.textContent.length);
                    }
                }
            },
            godina:function(inputElement){
                var string=inputElement.value;
                var validno=false;
                if(string.length===9 && string[4]==='/') {
                    var godine=string.split("/");
                    var g1=parseInt(godine[0]);
                    var g2=parseInt(godine[1]);
                    if(g1>=2000 && g2>=2000 && g1<=2099 && g2<=2099 && g1===g2-1) {
                        validno=true;
                    }
                }
                else {
                    validno=false;
                }
                if(!validno) {
                    inputElement.style.backgroundColor="orangered";
                    godinaBool=false;
                    paragraf.textContent="Sljedeća polja nisu validna:godina";
                    if(!nazivBool) paragraf.textContent+=",naziv";
                    if(!imeBool) paragraf.textContent+=",ime";
                    if(!repoBool) paragraf.textContent+=",repozitorij";
                    if(!indexBool) paragraf.textContent+=",index";
                    if(!passwordBool) paragraf.textContent+=",password";
                    if(!urlBool) paragraf.textContent+=",url";
                    paragraf.textContent+="!";
                }
                else {
                    inputElement.style.backgroundColor="white";
                    godinaBool=true;
                    paragraf.textContent="Sljedeća polja nisu validna:";
                    if(!nazivBool) paragraf.textContent+=",naziv";
                    if(!imeBool) paragraf.textContent+=",ime";
                    if(!repoBool) paragraf.textContent+=",repozitorij";
                    if(!indexBool) paragraf.textContent+=",index";
                    if(!passwordBool) paragraf.textContent+=",password";
                    if(!urlBool) paragraf.textContent+=",url";
                    paragraf.textContent+="!";
                    var i=paragraf.textContent.indexOf(":");
                    if(paragraf.textContent.charAt(i+1)=="!") paragraf.textContent="";
                    else {
                        i++;
                        paragraf.textContent=paragraf.textContent.substring(0,i)+paragraf.textContent.substring(i+1,paragraf.textContent.length);
                    }
                }
            },
            repozitorij:function(inputElement,regex){
                var validno=regex.test(inputElement.value);
                if(!validno) {
                    inputElement.style.backgroundColor="orangered";
                    repoBool=false;
                    paragraf.textContent="Sljedeća polja nisu validna:repozitorij";
                    if(!nazivBool) paragraf.textContent+=",naziv";
                    if(!godinaBool) paragraf.textContent+=",godina";
                    if(!imeBool) paragraf.textContent+=",ime";
                    if(!indexBool) paragraf.textContent+=",index";
                    if(!passwordBool) paragraf.textContent+=",password";
                    if(!urlBool) paragraf.textContent+=",url";
                    paragraf.textContent+="!";
                }
                else {
                    inputElement.style.backgroundColor="white";
                    repoBool=true;
                    paragraf.textContent="Sljedeća polja nisu validna:";
                    if(!nazivBool) paragraf.textContent+=",naziv";
                    if(!godinaBool) paragraf.textContent+=",godina";
                    if(!imeBool) paragraf.textContent+=",ime";
                    if(!indexBool) paragraf.textContent+=",index";
                    if(!passwordBool) paragraf.textContent+=",password";
                    if(!urlBool) paragraf.textContent+=",url";
                    paragraf.textContent+="!";
                    var i=paragraf.textContent.indexOf(":");
                    if(paragraf.textContent.charAt(i+1)=="!") paragraf.textContent="";
                    else {
                        i++;
                        paragraf.textContent=paragraf.textContent.substring(0,i)+paragraf.textContent.substring(i+1,paragraf.textContent.length);
                    }
                }
            },
            index:function(inputElement){
                var indeks=/^((1[4-9])|20)[0-9]{3}$/;
                var validno=indeks.test(inputElement.value);
                if(!validno) {
                    inputElement.style.backgroundColor="orangered";
                    indexBool=false;
                    paragraf.textContent="Sljedeća polja nisu validna:index";
                    if(!nazivBool) paragraf.textContent+=",naziv";
                    if(!godinaBool) paragraf.textContent+=",godina";
                    if(!repoBool) paragraf.textContent+=",repozitorij";
                    if(!imeBool) paragraf.textContent+=",ime";
                    if(!passwordBool) paragraf.textContent+=",password";
                    if(!urlBool) paragraf.textContent+=",url";
                    paragraf.textContent+="!";
                }
                else {
                    inputElement.style.backgroundColor="white";
                    indexBool=true;
                    paragraf.textContent="Sljedeća polja nisu validna:";
                    if(!nazivBool) paragraf.textContent+=",naziv";
                    if(!godinaBool) paragraf.textContent+=",godina";
                    if(!repoBool) paragraf.textContent+=",repozitorij";
                    if(!imeBool) paragraf.textContent+=",ime";
                    if(!passwordBool) paragraf.textContent+=",password";
                    if(!urlBool) paragraf.textContent+=",url";
                    paragraf.textContent+="!";
                    var i=paragraf.textContent.indexOf(":");
                    if(paragraf.textContent.charAt(i+1)=="!") paragraf.textContent="";
                    else {
                        i++;
                        paragraf.textContent=paragraf.textContent.substring(0,i)+paragraf.textContent.substring(i+1,paragraf.textContent.length);
                    }
                }
            },
            naziv:function(inputElement){
                var naziv=/^([a-zA-Z]+[a-zA-Z0-9\/\\\-\"\'\!\?\:\;\,]+)+[a-z0-9]+$/;
                var validno=naziv.test(inputElement.value);
                if(!validno) {
                    inputElement.style.backgroundColor="orangered";
                    nazivBool=false;
                    paragraf.textContent="Sljedeća polja nisu validna:naziv";
                    if(!imeBool) paragraf.textContent+=",ime";
                    if(!godinaBool) paragraf.textContent+=",godina";
                    if(!repoBool) paragraf.textContent+=",repozitorij";
                    if(!indexBool) paragraf.textContent+=",index";
                    if(!passwordBool) paragraf.textContent+=",password";
                    if(!urlBool) paragraf.textContent+=",url";
                    paragraf.textContent+="!";
                }
                else {
                    inputElement.style.backgroundColor="white";
                    nazivBool=true;
                    paragraf.textContent="Sljedeća polja nisu validna:";
                    if(!imeBool) paragraf.textContent+=",ime";
                    if(!godinaBool) paragraf.textContent+=",godina";
                    if(!repoBool) paragraf.textContent+=",repozitorij";
                    if(!indexBool) paragraf.textContent+=",index";
                    if(!passwordBool) paragraf.textContent+=",password";
                    if(!urlBool) paragraf.textContent+=",url";
                    paragraf.textContent+="!";
                    var i=paragraf.textContent.indexOf(":");
                    if(paragraf.textContent.charAt(i+1)=="!") paragraf.textContent="";
                    else {
                        i++;
                        paragraf.textContent=paragraf.textContent.substring(0,i)+paragraf.textContent.substring(i+1,paragraf.textContent.length);
                    }
                }
            },
            password:function(inputElement){
                var pass=/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))[a-zA-Z0-9]{8,}$/
                var validno=pass.test(inputElement.value);
                if(!validno) {
                    inputElement.style.backgroundColor="orangered";
                    passwordBool=false;
                    paragraf.textContent="Sljedeća polja nisu validna:password";
                    if(!nazivBool) paragraf.textContent+=",naziv";
                    if(!godinaBool) paragraf.textContent+=",godina";
                    if(!repoBool) paragraf.textContent+=",repozitorij";
                    if(!indexBool) paragraf.textContent+=",index";
                    if(!imeBool) paragraf.textContent+=",ime";
                    if(!urlBool) paragraf.textContent+=",url";
                    paragraf.textContent+="!";
                }
                else {
                    inputElement.style.backgroundColor="white";
                    passwordBool=true;
                    paragraf.textContent="Sljedeća polja nisu validna:";
                    if(!nazivBool) paragraf.textContent+=",naziv";
                    if(!godinaBool) paragraf.textContent+=",godina";
                    if(!repoBool) paragraf.textContent+=",repozitorij";
                    if(!indexBool) paragraf.textContent+=",index";
                    if(!imeBool) paragraf.textContent+=",ime";
                    if(!urlBool) paragraf.textContent+=",url";
                    paragraf.textContent+="!";
                    var i=paragraf.textContent.indexOf(":");
                    if(paragraf.textContent.charAt(i+1)=="!") paragraf.textContent="";
                    else {
                        i++;
                        paragraf.textContent=paragraf.textContent.substring(0,i)+paragraf.textContent.substring(i+1,paragraf.textContent.length);
                    }
                }
            },
            url:function(inputElement){
                var url=/^(http|https|ftp|ssh)\:\/\/([a-z0-9]+([-]*[a-z0-9]+)*(\.[a-z0-9]+([-]*[a-z0-9]+)*)*)+(\/[a-z0-9]+([-]*[a-z0-9]+)*)*(\?([a-z0-9]+([-]*[a-z0-9]+)*\=[a-z0-9]+([-]*[a-z0-9]+)(\&[a-z0-9]+([-]*[a-z0-9]+)*\=[a-z0-9]+([-]*[a-z0-9]+)*)*)+)*$/
                var validno=url.test(inputElement.value);
                if(!validno) {
                    inputElement.style.backgroundColor="orangered";
                    urlBool=false;
                    paragraf.textContent="Sljedeća polja nisu validna:url";
                    if(!nazivBool) paragraf.textContent+=",naziv";
                    if(!godinaBool) paragraf.textContent+=",godina";
                    if(!repoBool) paragraf.textContent+=",repozitorij";
                    if(!indexBool) paragraf.textContent+=",index";
                    if(!passwordBool) paragraf.textContent+=",password";
                    if(!imeBool) paragraf.textContent+=",ime";
                    paragraf.textContent+="!";
                }
                else {
                    inputElement.style.backgroundColor="white";
                    urlBool=true;
                    paragraf.textContent="Sljedeća polja nisu validna:";
                    if(!nazivBool) paragraf.textContent+=",naziv";
                    if(!godinaBool) paragraf.textContent+=",godina";
                    if(!repoBool) paragraf.textContent+=",repozitorij";
                    if(!indexBool) paragraf.textContent+=",index";
                    if(!passwordBool) paragraf.textContent+=",password";
                    if(!imeBool) paragraf.textContent+=",ime";
                    paragraf.textContent+="!";
                    var i=paragraf.textContent.indexOf(":");
                    if(paragraf.textContent.charAt(i+1)=="!") paragraf.textContent="";
                    else {
                        i++;
                        paragraf.textContent=paragraf.textContent.substring(0,i)+paragraf.textContent.substring(i+1,paragraf.textContent.length);
                    }
                }
            }
        }
    }
    return konstruktor;
}());
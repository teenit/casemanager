function transliterateLink(key){
    var a = {"Ё":"YO","Є":"E","є":"e","Й":"I","Ц":"TS","У":"U","К":"K","Е":"E","Н":"N","Г":"G","Ш":"SH","Щ":"SCH","З":"Z","Х":"H","Ъ":"","ё":"yo","й":"i","ц":"ts","у":"u","к":"k","е":"e","н":"n","г":"g","ш":"sh","щ":"sch","з":"z","х":"h","ъ":"","Ф":"F","Ы":"I","В":"V","А":"a","П":"P","Р":"R","О":"O","Л":"L","Д":"D","Ж":"ZH","Э":"E","ф":"f","ы":"i","в":"v","а":"a","п":"p","р":"r","о":"o","л":"l","д":"d","ж":"zh","э":"e","Я":"Ya","Ч":"CH","С":"S","М":"M","И":"I","Т":"T","Ь":"i","Б":"B","Ю":"YU","я":"ya","ч":"ch","с":"s","м":"m","и":"i","т":"t","ь":"i","ъ":"i","Ъ":"i","'":"i","б":"b","ю":"yu"," ":"-","`":"-","~":"-","'":"-","’":"-",")":"-","(":"-"};
   
    return key.split('').map(function (char) { 
    return a[char] || char; 
  }).join("");
}

function transliterateString(key){
    var a = {"Ё":"YO","Є":"E","є":"e","Й":"I","Ц":"TS","У":"U","К":"K","Е":"E","Н":"N","Г":"G","Ш":"SH","Щ":"SCH","З":"Z","Х":"H","Ъ":"","ё":"yo","й":"i","ц":"ts","у":"u","к":"k","е":"e","н":"n","г":"g","ш":"sh","щ":"sch","з":"z","х":"h","ъ":"","Ф":"F","Ы":"I","В":"V","А":"a","П":"P","Р":"R","О":"O","Л":"L","Д":"D","Ж":"ZH","Э":"E","ф":"f","ы":"i","в":"v","а":"a","п":"p","р":"r","о":"o","л":"l","д":"d","ж":"zh","э":"e","Я":"Ya","Ч":"CH","С":"S","М":"M","И":"I","Т":"T","Ь":"i","Б":"B","Ю":"YU","я":"ya","ч":"ch","с":"s","м":"m","и":"i","т":"t","ь":"i","ъ":"i","Ъ":"i","'":"i","б":"b","ю":"yu","і":"i","І":"I"};
   
    return key.split('').map(function (char) { 
    return a[char] || char; 
  }).join("");
}

export function translateStringToLink(arg){
   return transliterateLink(arg)
}

export function translateString(arg){
    return transliterateString(arg)
 }

export function changeAps(arg){
    let a = arg.replaceAll("'", "’");
    return a;
}
export function changeApsBr(arg){
    let a = arg.replaceAll("'", "’").replaceAll(/\n/g, "<br />");
    return a;
}
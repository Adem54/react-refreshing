//type yazip yanina verdigmz isimlere alias dennyor yani type alias ismini veriyoruz yani stringOrNumber bir type alias tir mesela
//BAK type alias i baska type alias lara atayabiliyoruz harika bir durum bu...
//Iste bu reusability mantigini interface kullanarak yapamiyoruz
//interface PostId = stringOrNumber; hata aliriz.... 
//Interfaces leri biraz daha objects ler ve classler icin dusunmemiz lazim..biraz daha onlara hitap ediyor
//Types lari ise type alias lar ise her turlu typescript type i bir typealias a assign edebiliyoruz...
//Literal types
let myName;
//Dikkat equal kullanmiyoruz ve bu literal assignment deniyor yani
//myName = "John";//Burda typescrpt bunu kabul etmez...
let username;
//Yani diyorsunki sen username olarak bu alternatifleri kullanabilirsin...bunlar disinda kullanamazsin... 
//Bu ozellikle status ler oluyor ornegin PENDING-SAVED-FINISHED...SADECE BU STATUSLER KULLANILABILR ORNEGIN..
username = 'Adem';
let dataStatus = "FINISHED";
dataStatus = "PENDING";
//dataStatus = "ORDERED";//HATA VERIR ENGELLER BIZI BURDA HATA YAPMAMIZI BAK DIKKAT ET... 
//FUNCTIONS  
const add = (a, b) => {
    return a + b;
};
//return u yok, void olur...This is a sideeffect that would not have an explicit return, should be void type
const logMsg = (message) => {
    console.log(message);
};
logMsg("Hello");
logMsg(add(2, 4));
//logMsg(add('a',3));//burda hata verecek typescript...number type gondermen gerekiyor diye...
let substract = function (c, d) {
    return c - d;
};
let multiply = function (c, d) {
    return c * d;
};
let add2 = (a, b) => a + b;
let substract2 = (a, b) => a - b;
//ISTE HARIKA BESTPRACISE ORNEGI!!!..
logMsg(multiply(4, 5));
//Ama genel olarak functions ve diger basit type lar icin type aliases cok iyi 
//interface ler ise object, class lar icin dusunebiliriz...
//OPTIONAL PARAMETERS FOR OUR FUNCTIONS
//c is optional parameter, it means c can be either number or undefined...that's why it arises problem about c.
//Boyle durumlarda guvenlik testi yapmaliyiz yani if-kontrolu yapmaliyiz...coook onemlidir
const addAll = (a, b, c) => {
    if (typeof c !== 'undefined') {
        return a + b + c;
    }
    return a + b;
};
const sumAll = (a = 10, b, c = 2) => {
    return a + b + c;
};
logMsg(addAll(3, 4));
logMsg(addAll(3, 4, 7));
logMsg(sumAll(4, 5, 9));
logMsg(sumAll(undefined, 5)); //1.parametre ye eger bir sey atanmazsa o zaman a=10 atyaacak default oalrak ancak bizim oraya default olarak vermemiz gerekir ki 2.parametre nin atanmasi zorunlu cunku...parametrelerin yeri dogru olmali..biz kendiz undefined i vererek hey biz buraya birsey atamioruz sen ona gore gitte default degeri kullan deriz...
//sumAll(undefined,5); sumAll(undefined,5,undefined); bu ikisi auyni sonucu verir en sagdaki parametre icin eger ondan oncekiler dogru bri sekilde yazilmis ise en sagdaki defult value verilmis paramtreye hicbirsey yazmasak mehtod onu undefined aliglar zaten, ya da istersek kendimzi de undefined verebiliriz
//Rest parameters-ussage of rest operator 
//icinde kac tane item oplduigunu bile bilmeiyiz...
const total = (a, ...nums) => {
    return a + nums.reduce((prev, curr) => prev + curr);
};
logMsg(total(4, 5, 6, 7)); //dikkat edelim 1.verilen 4 a yi temsil eder gerisi-rest ise array i rest olarak kullandigi icin...direk o array icindeki itemlari kullanacaktir
//Burda biz istedgimz kadar sayi gonderebiliyoruz...dikkat edelim...rest parametresi sayseinde bize harika bir fleksibellik kazandirir..
//Bak dostum rest parameter dendiginde senin aklina verilen parametreleri array olarak toplayip da ona gore kullanmasi oolarak anlamalisin...ortada bir array yok, bu arrayi bize rest operatoru sayesinde diyorsunki sen, geri kalan itemlari al bir array haline getir ve biz fonksyon icinde ona gore kullanalim.....
//Rest daima ensonda olmali ve 1 tane olabilir
//Spread ise tam tersidir ortada bir array var ve sen bu array icindekileri paramereye ayri ayri parametre elemani olarak kullanmak istiyorsun...o zaman cok ise yarar ama dikkat rest de ise tam tersi senin bazi elemanlarin var ve ilerde de o elemnlar artabilir ve sen bu elemanlari fonks icinde bir array icinde kullanmak istiyorsun....ortada bir array yok normalde...
//Never type
const createError = (errMsg) => {
    throw new Error(errMsg);
};
//Bu sekilde explicitly throw error-error firlattgimzda never type return eder
//Bir de bir fonksiyon sonsuz dongu var ve birsey return etmiyorsa o da never type olarak doner
//Ama bu sinirsiz donguyu biz bir logic ekleyerek durdurursak ozaman return type i void olarak inferred edecektiir typescript...
const infinite = () => {
    let i = 1;
    while (true) {
        i++;
        if (i > 100)
            break;
    }
};
//Peki never type ne zaman kullanislidir?
const numberOrString = (value) => {
    if (typeof value === 'string')
        return 'string';
    if (typeof value === 'number')
        return 'number';
    return createError("This should never happen");
};
//Function lacks ending return statement and return type does not include 'undefined'.
//Bu hatayi  return createError("This should never happen"); ile cozebildik...dikkat edelim..
//Yani bunu yazmadan once  return createError("This should never happen")...bu hatayi aldik:Function lacks ending return statement and return type does not include 'undefined'...ama bu createError u kullanarak cozuluyor bu hata..yani never type donen bir method cagirdik ki o emtho icinde throw error yapiyor bildgimiiz gibi
//Biz ayri bir return girmedgimz zaman potansiyel undefined durumunu kendisi handle edemedi...ancak never type donene hata firlatma methodu ile cozuldu
//Custom typeguard 
const isNumber = (value) => {
    return typeof value === 'number'
        ? true : false;
};
const numberOrString2 = (value) => {
    if (typeof value === 'string')
        return 'string';
    if (isNumber(value))
        return 'number';
    return createError("This should never happen");
};
export {};

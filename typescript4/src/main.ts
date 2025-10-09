
type stringOrNumber = string | number;
type stringOrNumberArray = stringOrNumber[];
type Guitarist = 
{
  name?:string;
  active:boolean;
 // albums:(string | number)[]
  albums:stringOrNumberArray
}

//type Guitarist de = kullaniyoruz cunku bu bir objeyi temsil ediyor
//type alias i kullaninca ne uretiliyor, bu objectten biraz fazlasini uyguluyor
//yani bize dikkat edelim nasil bir imkani sunuyor reusability imkani sunuyor type ile birlikte...
//Bir type alias icerisinde baska typealias lari kullanarak harika reusability kullanaibliyoruz

type UserId = stringOrNumber;//artik id string ya da number atanabilir
//type yazip yanina verdigmz isimlere alias dennyor yani type alias ismini veriyoruz yani stringOrNumber bir type alias tir mesela
//BAK type alias i baska type alias lara atayabiliyoruz harika bir durum bu...

//Iste bu reusability mantigini interface kullanarak yapamiyoruz
//interface PostId = stringOrNumber; hata aliriz.... 

//Interfaces leri biraz daha objects ler ve classler icin dusunmemiz lazim..biraz daha onlara hitap ediyor
//Types lari ise type alias lar ise her turlu typescript type i bir typealias a assign edebiliyoruz...

//Literal types
let myName:'Adem';
//Dikkat equal kullanmiyoruz ve bu literal assignment deniyor yani
//myName = "John";//Burda typescrpt bunu kabul etmez...

let username:'Adem' | 'Zehra' | 'Zeynep';
//Yani diyorsunki sen username olarak bu alternatifleri kullanabilirsin...bunlar disinda kullanamazsin... 
//Bu ozellikle status ler oluyor ornegin PENDING-SAVED-FINISHED...SADECE BU STATUSLER KULLANILABILR ORNEGIN..
username = 'Adem';
//username = 'Mehmet';//Mehmet atayamazsin...
//const valu leri hatirlayalim, bir kere atandiktan sonra tekrar atanamaiyordu...burda da sadece bu degerler deniyor
//Kodumuzu cok temiz tutmamizi saglar 
type OrderStatus = "IDLE" | "PENDING" | "FINISHED";
let dataStatus:OrderStatus = "FINISHED";

dataStatus = "PENDING";
//dataStatus = "ORDERED";//HATA VERIR ENGELLER BIZI BURDA HATA YAPMAMIZI BAK DIKKAT ET... 

//FUNCTIONS  
const add = (a:number,b:number):number=>
{
  return a + b;
}

//return u yok, void olur...This is a sideeffect that would not have an explicit return, should be void type
const logMsg = (message:any):void =>
{
  console.log(message);
}

logMsg("Hello");
logMsg(add(2,4));
//logMsg(add('a',3));//burda hata verecek typescript...number type gondermen gerekiyor diye...

let substract = function(c:number,d:number):number
{
  return c - d;
}

//SIMDI DIKKAT EDELIM add,substract fonksyonlari ayni parametreleri kullaniyorlar ve ayni type i return ediyorlar 
//O zaman biz bu fonksyonun type ini olssturup bu fonks type ini hemm add, hemd e substract fonks da kullanabiliriz 

//Function signature..Bunu biz default value ile yapamiyoruz, type veya interface ile tanimladigmz funciton type inda biz, default value tanimlayamiyoruz burda...buna dikkat edelim..ondan dolayi eger default value tanimlayacaksak o zaman direk artik parametre icinde type lari vermeliyiz
type mathFunction = (c:number,d:number)=>number;

let multiply:mathFunction = function(c,d)
{
  return c * d;
}

let add2:mathFunction = (a,b)=>a+b; 
let substract2:mathFunction = (a,b)=>a-b;
//ISTE HARIKA BESTPRACISE ORNEGI!!!..
logMsg(multiply(4,5));
//logMsg(add2("3",6));//hata verir

//Bu tarz fonks type tanimlamasini interface ile de yapabiliriz..

interface mathFunction2 { (c:number,d:number):number;}
//Ama genel olarak functions ve diger basit type lar icin type aliases cok iyi 
//interface ler ise object, class lar icin dusunebiliriz...

//OPTIONAL PARAMETERS FOR OUR FUNCTIONS

//c is optional parameter, it means c can be either number or undefined...that's why it arises problem about c.
//Boyle durumlarda guvenlik testi yapmaliyiz yani if-kontrolu yapmaliyiz...coook onemlidir
const addAll = (a:number, b:number, c?:number):number => 
{
  if(typeof c !== 'undefined')
  {
     return a + b + c;
  }
  return a+b;
}

const sumAll = (a:number=10, b:number, c:number=2):number => 
{
  return a+b+c;
}

logMsg(addAll(3,4));
logMsg(addAll(3,4,7));
logMsg(sumAll(4,5,9));
logMsg(sumAll(undefined,5));//1.parametre ye eger bir sey atanmazsa o zaman a=10 atyaacak default oalrak ancak bizim oraya default olarak vermemiz gerekir ki 2.parametre nin atanmasi zorunlu cunku...parametrelerin yeri dogru olmali..biz kendiz undefined i vererek hey biz buraya birsey atamioruz sen ona gore gitte default degeri kullan deriz...
//sumAll(undefined,5); sumAll(undefined,5,undefined); bu ikisi auyni sonucu verir en sagdaki parametre icin eger ondan oncekiler dogru bri sekilde yazilmis ise en sagdaki defult value verilmis paramtreye hicbirsey yazmasak mehtod onu undefined aliglar zaten, ya da istersek kendimzi de undefined verebiliriz

//Rest parameters-ussage of rest operator 

//icinde kac tane item oplduigunu bile bilmeiyiz...
const total = (a:number,...nums:number[]):number => {
   return a + nums.reduce((prev,curr)=>prev+curr);
}

logMsg(total(4,5,6,7));//dikkat edelim 1.verilen 4 a yi temsil eder gerisi-rest ise array i rest olarak kullandigi icin...direk o array icindeki itemlari kullanacaktir
//Burda biz istedgimz kadar sayi gonderebiliyoruz...dikkat edelim...rest parametresi sayseinde bize harika bir fleksibellik kazandirir..
//Bak dostum rest parameter dendiginde senin aklina verilen parametreleri array olarak toplayip da ona gore kullanmasi oolarak anlamalisin...ortada bir array yok, bu arrayi bize rest operatoru sayesinde diyorsunki sen, geri kalan itemlari al bir array haline getir ve biz fonksyon icinde ona gore kullanalim.....
//Rest daima ensonda olmali ve 1 tane olabilir

//Spread ise tam tersidir ortada bir array var ve sen bu array icindekileri paramereye ayri ayri parametre elemani olarak kullanmak istiyorsun...o zaman cok ise yarar ama dikkat rest de ise tam tersi senin bazi elemanlarin var ve ilerde de o elemnlar artabilir ve sen bu elemanlari fonks icinde bir array icinde kullanmak istiyorsun....ortada bir array yok normalde...

//Never type
const createError = (errMsg:string):never=>{
  throw new Error(errMsg);
}
//Bu sekilde explicitly throw error-error firlattgimzda never type return eder
//Bir de bir fonksiyon sonsuz dongu var ve birsey return etmiyorsa o da never type olarak doner
//Ama bu sinirsiz donguyu biz bir logic ekleyerek durdurursak ozaman return type i void olarak inferred edecektiir typescript...

const infinite = ()=>{
  let i:number = 1;
  while(true)
  {
    i++;
    if(i>100)break;
  }
}

//Peki never type ne zaman kullanislidir?

const numberOrString = (value:number | string):string => 
{
  if(typeof value === 'string')return 'string';
  if(typeof value === 'number')return 'number';
  return createError("This should never happen");
}
//Function lacks ending return statement and return type does not include 'undefined'.
//Bu hatayi  return createError("This should never happen"); ile cozebildik...dikkat edelim..
//Yani bunu yazmadan once  return createError("This should never happen")...bu hatayi aldik:Function lacks ending return statement and return type does not include 'undefined'...ama bu createError u kullanarak cozuluyor bu hata..yani never type donen bir method cagirdik ki o emtho icinde throw error yapiyor bildgimiiz gibi
//Biz ayri bir return girmedgimz zaman potansiyel undefined durumunu kendisi handle edemedi...ancak never type donene hata firlatma methodu ile cozuldu

//Custom typeguard 
const isNumber = (value:any):boolean=>{
  return typeof value === 'number' 
          ? true : false;
}

const numberOrString2 = (value:number | string):string => 
{
  if(typeof value === 'string')return 'string';
  if(isNumber(value))return 'number';
  return createError("This should never happen");
}

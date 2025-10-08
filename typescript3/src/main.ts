//Arrays
let stringArr:Array<string> = ['one', 'hey', 'Adem'];//string[] -
//Artik bu string array a stirng disi deger atarsak typescript hatasi aliriz 
//stringArr[0]=42; hata aliriz typescriptten 
stringArr[0] = "two";
//stringArr.push(3);//hata aliriz...bu array a string ekleeyebilrsin

let guitars:Array<string|number> = ['Strat', 'Les Paul', 5110];//(string | number)[] 
guitars[0]=65;
guitars[2]="Strat";
guitars.unshift("newdata");//basa string ekler

//stringArr = guitars;//bunu atayamiyoruz..cunku sadece string kabul eden bir array a number da kabul eden array atamya typescript hata verecektir 
guitars = stringArr;//Ama bunu atayabiliriz...cunku guitars hem string hem de number type i array icinde alabilyordu

//guitars[1] = true; error...typescript kabul etmez hata verir
let mixedData:(string | number | boolean)[] = ['EVH',1984,true];//Array<string | number | boolean>

mixedData = guitars;//Totally ok 
//guitars = mixedData;//not ok...

//Biz bos bir array tanimlarsak typescript ona any type ini atar..biz birsey demedigmz icin
//typescript inferred any type
let test = [];

let bands:string[] = [];
bands.push("Van Halen"); 
//bands.push(true);//error..hata

//Tupple 
//Normalde typescript bizim array icindeki item larin hangi sirada olacaklarina karismaz...ama bizim ozel bir arraya ihtiyacimiz var ise array itemlarinin siralmasi ve indexlerinin valuelere gore spesifiklesecegi durumlar var ise o zaman iste tupple devreye giriyor

let myTupple : [string,number,boolean] = ['Adem', 42,true];
//Diyoruz ki 3 tane elemanimiz olacak 1.si string, 2.si number,3.su boolean olacak 
//myTupple = ["Hello", "Adem",false];//hata aliriz...cunu tupple a uymadi...
//Ama tupple de 0.index string, 1.index number, 2.index boolean olmasi gerekir ve 3.index i atayamazsin hata alirsin...ve type lari ayni tanimlandigi sirada vermek gerekir
//myTupple = ["hi",45,true,34];//hata aliriz
myTupple[0]="Zehra";//ok  but myTupple[1]="Zehra" not ok 1.index must be number

//Union type..da sira onemli degil sadece verilen type lari girmek zorundasin
let mixed = ['John',1, false,56];//(string | number |  boolean)[] - Array<string | number |  boolean>

mixed = myTupple;//Sorunsuz kabul eder cunku mixed myTupple imizi kapsiyor... 
//myTupple = mixed; hata aliriz...cunku myTupple mixed i karsilayamaz..

//Objects 
let myObj : object;//object type
myObj = [];
console.log(typeof myObj);//object..arraylerde bir objedir...javascriptte 
//Ve dikkat edelim..myObj reassignable cunku it is still object type in jscript
myObj = mixed;
myObj = bands;
myObj = {};
//Dikkat edelim...objtype oldugu  icin ve javsacriptte arraylerde bir obj oldugu icin..hem her turlu arrayi kabul ediyor cunku object type, hemde direk bos bir object atayabildik

const exampleObj = // bu type typescript inferred..kendisi cikarim yapar..verilen degerlerden{prop1:string, prop2:number}
{
  prop1:'Adem',
  prop2:true,
}

//exampleObj.prop2 = "Zehra";//hata verir cunku ne yapti prop2 yi boolean olarak tanimladi cunku
exampleObj.prop2 = false;
exampleObj.prop1 = "Zehra";//problem yok
//exampleObj.prop1=true;//hata aliriz..

//Annotation-annotetype
//myArr=string[]=[] bu sekilde yani bos array assign etmeden once belirtmek demektir 
//inference kullanmak yerine,yani direk degerleri bizim atamamiz ile typescriptin inferred-implicit olarak type lari cikarim yapmasi yerine... 

type Guitarist = {
  name:string;
  active:boolean;
  albums:(string | number)[];
}

let evh:Guitarist = {
  name:"Eddie",
  active:false,
  albums:[1984,5150,'OU812']
}
//Iste bu mantik kullanamaiz gereken ve daha ongurulebilr dir...dolayis ile biz bu sekilde kullanmaliyz
//Tanimlanan object propertyleridne eksikbirakirsak error gosterir...typescript...

let jp:Guitarist = {
  name:"Jimmy",
  active:true,
  albums:['I','II','IV']
}

let jp2 = {
  name:"Jimmy2",
  albums:['I','II','IV']
}


evh = jp;//diyebiliriz...no problem..
//Ama dikkat edelim orneklerdeki gibi yapamayiz...jp2 = jp; evh = jp2;

//
//jp.years = 1989;//Ekstra bir property de ekleyemeyiz proptoytping ile , type ini verdikten sonra

//Propertiesleri Optional nasil yapabilirz...


type Guitarist3 = {
  name:string,
  active?:boolean,
  albums:(string | number)[]
}
//Artik asagidaki her ikisi de kullanilabilir

let jp3:Guitarist3 = {
  name:"Jimmy",
  active:true,
  albums:['I','II','IV']
}

let jp4:Guitarist3 = {
  name:"Jimmy",
  albums:['I','II','IV']
}

const greetGuitarist2 = (guitarist:{name:string,active?:boolean,albums:(string | number)[]}):string =>
{
    return `Hello ${guitarist.name}`;
}


const greetGuitarist = (guitarist:Guitarist3):void=>
{
  console.log(`Hello guitarist: ${guitarist.name}`);
}


type Guitarist4 = {
  name:string,
  active?:boolean,
  albums:(string | number)[]
}
interface Guitarist2
{
  name?:string;
  active:boolean;
  albums:(string | number)[];
}

/*
You can use commas or semicolons between members in either a type object literal or an interface. Pick one style and be consistent.
A trailing comma/semicolon after the last member is allowed.

Interface ve type kullanma tercih meselesi..ama kendi projelerimize gore bir standart olusturabilirz 
Ornegin class kullanirken interface ile olsuturulabilir
*/

let jp5 = {
  name:"JOhnny",
  active:true, 
  albums:['V',1997]
} 

const greetGuitarist3 = (guitarist:Guitarist2):string=>
{
  //1.narrowing
  if(guitarist.name)
  {
     return (`Hello guitarist: ${guitarist.name.toUpperCase()}`);
  }
  return "hello";
  //2.use ? return (`Hello guitarist: ${guitarist.name?.toUpperCase()}`);
}
//Dikkat biz name i optional kullandik ve name (string | undefined) unions type..ve undefined olma durumunda bir undefined deger uzerinde fonks call edemezsiniz ondan dolayi hata aliriz ...solution:1 ya ? kullanalim name den sonra ve eger name var ise toUpperCase i cagir deriz..

greetGuitarist3(jp5);

//ENUMS 
//Unlike most Typescript features, Enums are not a type-level addition to Javascript but something added to the language and runtime

enum Grade {
  U,
  D,
  C,
  B,
  A,
};

//DEfault ta bu sekidle gelir...
console.log(Grade.U);//=>0
console.log(Grade[0]);//=>U
console.log(Grade.D);//=>1,
console.log(Grade.A);//=>4

//Ama biz kendimz de bu indexleri atayabiliriz 

enum Grade2 {
  U=1,
  D=2,
  C=3,
  B=4,
  A=5,
};

console.log(Grade2.U);//1
console.log(Grade2.D);//2
console.log(Grade2[2]);//D
console.log(Grade2.A);//5


enum Grade3 {
  U=5,
  D,
  C,
  B,
  A,
};

console.log(Grade3.U);//5
console.log(Grade3.D);//6
console.log(Grade3.A);//9
console.log(Grade3[9]);//A
/*
En temel fikir

TypeScript’te çoğu şey (type, interface) sadece derleme zamanı içindir ve JS çıktısında yok olur.

Enum ise farklıdır: normal enum yazınca runtime’da gerçek bir JS nesnesi üretilir. Yani çalışırken elde tutulur ve kullanılabilir.

Enum türleri

1-Sayısal enum (varsayılan)

Otomatik 0,1,2… değerleri alır.

Ters eşleme vardır: Direction[0] === "Up".
*/

enum Direction { Up, Down, Left, Right }
console.log(Direction.Up);  // 0
console.log(Direction[0]);  // "Up"

//2-String enum
//Her üyeye string atanır.Ters eşleme yok(Direction[0] BU YOK...).

enum Status { Pending = "PENDING", Done = "DONE" }
console.log(Status.Done);   // "DONE"
// Status["DONE"] => undefined..DIKKAT TERS ESLESME YOK...INDEX TEKI GIBI

//const enum
//Derlemede satır içine gömülür (inline). Runtime’da nesne oluşmaz.
//Küçük ve hızlı çıktı, ama Color[1] gibi erişim yok.

const enum Color { Red, Green, Blue }
const c = Color.Green; // JS'te yalnızca 1 olur 
console.log("cccc!: ",c);//1
/*
const enum için söylediğim “satıra gömme (inline)” şu demek:
TypeScript derleyicisi derleme zamanında Color.Green ifadesinin değerini (ör. 1) hesaplar ve kodun içine doğrudan 1 yazar.
Yani runtime’da herhangi bir “atanma” işlemi yapılmaz; ortada Color diye bir nesne bile yoktur. Sadece literal sayı kalır.

const enum (inline, runtime nesnesi yok)
const enum Color { Red, Green, Blue }
Red=0, Green=1, Blue=2
const c = Color.Green;   // TS -> JS: const c = 1;
console.log(c);          // 1
console.log(Color);   // ReferenceError (nesne yok)



Klasik enum (const olmayan):
Derleyici runtime’da var olan bir JS nesnesi üretir. Bu nesneye Direction.Up (0) ve ters eşleme için Direction[0] = "Up" gibi alanlar eklenir. Yani burada gerçekten çalışma anında var olan bir obje söz konusu.
Klasik enum (runtime nesnesi var)
enum Direction { Up, Down, Left, Right }

console.log(Direction.Up);  // 0
console.log(Direction[0]);  // "Up"  (ters eşleme!)
console.log(Direction);     // {0:"Up",1:"Down",...,Up:0,Down:1,...}


*/


//“Sadece tip” isteyenler için alternatif
//Runtime nesneye ihtiyacın yoksa string literal union kullan:

type Dir = "Up" | "Down" | "Left" | "Right";

//Hem tip güvenliği hem de runtime sabitler için:


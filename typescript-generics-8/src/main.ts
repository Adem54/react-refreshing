//GENERICS
//Type placeholder , veya type variable lar olusturabilme imkani sagliyor bize

const stringEcho = (arg:string):string =>
{
	return arg;
}
//Simdi bu fonksiyon sadece string ler icin calisiyor 
//Peki biz bu fonksyonu biraz daha genel, common hale gtirmek istersek ve type i da abstractlarstirsak da bu fonksyonu daha da genel hale getirelim

//Bu sekilde generic oldu ve artik istedimgz her tip ile kullanilablir hale geldi fonksiyon
//Genericler ozellikle utility fonksiyonlar olusturmak icin cok faydalidir 
const echo = <T>(arg:T):T =>arg;

const isObj = <T>(arg:T):boolean =>
{
	return (typeof arg === 'object' && !Array.isArray(arg) && arg !== null)
}

console.log(isObj(true));
console.log(isObj('John'));
console.log(isObj([1,2,3]));
console.log(isObj({name:'Adem'}));
console.log(isObj(null));


//Genericleri biz, fonksiyonumuz bazi logicleri yapmak zorunda oldugunda da kullanabiliriz..
const isTrue = <T>(arg:T): { arg:T, is:boolean} => 
{
	if(Array.isArray(arg) && !arg.length)
	{
		return { arg, is:false}
	}
	if(isObj(arg) && !Object.keys(arg as keyof T).length)
	{
		return { arg, is:false }
	}

	return {arg, is:!!arg}
}
//Burdaki onemli oolan ve anlasilmasi gereken nokta su, oyle bir sistem yazdikki ve T generic type verdik ki istedgiz her tipi T yerine koyduk ve tamamen problemsiz bir sekkilde calismis oldu...

console.log(isTrue(false));
console.log(isTrue(0));
console.log(isTrue(true));
console.log(isTrue(1));
console.log(isTrue('Dave'));
console.log(isTrue(''));
console.log(isTrue(null));
console.log(isTrue(undefined));
console.log(isTrue({}));//modified
console.log(isTrue({name:'Dave'}));
console.log(isTrue([1,2,3]));
console.log(isTrue(NaN));//modified
console.log(isTrue(-0));
/*

main.js:30 {arg: 0, is: false}
main.js:31 {arg: true, is: true}
main.js:32 {arg: 1, is: true}
main.js:33 {arg: 'Dave', is: true}
main.js:34 {arg: '', is: false}
main.js:35 {arg: null, is: false}
main.js:36 {arg: undefined, is: false}
main.js:37 {arg: {…}, is: false} empty object is false
main.js:38 {arg: {…}, is: true} object has properties is true..
main.js:39 {arg: Array(3), is: true} array is true...
main.js:40 {arg: NaN, is: false}
main.js:41 {arg: -0, is: false}
*/

/*
!!arg ile Boolean(arg) ayni seydir ayni isleri yaparlar...!!arg  , argi boolean bir deger cevirir sadece.. 

!!"hello"   // true
!!1         // true
!![]        // true (any object/array/function is truthy)
!!{}        // true
!!0         // false
!!""        // false
!!null      // false
!!undefined // false
!!NaN       // false

*/


interface BoolCheck<T>{
	value:T,
	is:boolean
}

const checkBoolValue = <T>(arg:T): BoolCheck<T> => 
{
	if(Array.isArray(arg) && !arg.length)
	{
		return { value:arg, is:false}
	}
	if(isObj(arg) && !Object.keys(arg as keyof T).length)
	{
		return { value:arg, is:false }
	}

	return {value:arg, is:!!arg}
}

//Simdi baska bir ornege bakalim!!!!

interface HasID {
	id:number 
}

//T extends HasID=>T is going to user HasID interface..Burda we are norrwing to the type..T nin alacagi tipi daraltiyoruz...parametrye verecegimz user in id propertysi olmak zorundadir
const processUser = <T extends HasID>(user:T):T=>
{
	//process the user with logic here.. 
	return user;
}

console.log(processUser({ id:1, name:"Adem"}));//Bu ok cunku HASID YI de kullaniypor iceriyor
//console.log(processUser({ myid:1, name:"Adem"}));//ama burda hata veriyor cunku HasID interface ini kullanmiyor...

//BU COK HARIKA BIR OZELLIKE DIYORUZ KI SEN BU INTERFACE I KULLANMALISIN VS DIYE KULLANCIIYI BIR STANDARTA ZORLUUYOR

//SIMDI DAHA FARKLI BIR ORNEGI DENEYELIM!!! 

//T is an objects that has an ID and this is going to be the keys of T that user object so here we're going to have an array of user objects
const getUsersProperty = <T extends HasID, K extends keyof T>(users:T[], key:K):T[K][] =>{
	return users.map(user=>user[key]);

}
//K extends keyof T we are building K as a key of the first type we pas in the key of T
/*
1) Temel kavramlar

T: generic (jenerik) tip parametresi. Fonksiyonun/typların dışarıdan alacağı tipin yer tutucusu.

extends HasID: T’nin kısıtı. “T, en azından HasID’deki alanlara sahip olmalı” demek.

K: ikinci generic tip parametresi; bir anahtar (key) tipini temsil eder.

keyof T: T tipinin tüm anahtarlarının birleşimi (union). Örn. T { id:number; name:string } ise keyof T "id" | "name" olur.

T[K]: Indexed Access Type. “T tipindeki bir nesnenin K anahtarındaki alanın tipi” demek. Örn. K "name" ise T[K] string olur.

Not: Bunlar derleme zamanı (compile-time) tip güvencesi sağlar; çalışma zamanında (runtime) otomatik kontrol yapmazlar.

2) HasID arayüzü
interface HasID {
  id: number;
}
Bu, “id alanı olan her şey” demek. TypeScript yapısal tip sistemi kullandığı için, id:number içerdiği sürece başka alanları olsa da kabul edilir.

3) processUser fonksiyonu

const processUser = <T extends HasID>(user: T): T => {
  // burada user.id'ye güvenle erişebilirsin
  return user;
};

T extends HasID: T en azından { id: number } içermeli.

Parametre: user: T

Dönüş: T (gelen tip neyse aynısını döndürür.)

type User = { id: number; name: string; };
const u: User = { id: 1, name: "Ada" };

const result = processUser(u); // result tip: User
// processUser({ name: "Ada" }) // ❌ Hata: id yok.

Neden faydalı?
Hem id alanına güvenebilirsin (user.id derleyici hatasızdır), hem de ekstra alanlar kaybolmaz (dönüş tipi hâlâ T).

4) getUsersProperty fonksiyonu

const getUsersProperty = <T extends HasID, K extends keyof T>(
  users: T[],
  key: K
): T[K][] => {
  return users.map(user => user[key]);
};


Adım adım:

T extends HasID: Dizideki her öğe en az id:number taşımalı.

keyof T: T’nin anahtarlarının birleşimi (ör. "id" | "name" | ...").

K extends keyof T: K, T’nin geçerli bir anahtarı olmalı. Böylece user[key] güvenli olur.

Dönüş tipi T[K][]: Verilen anahtarın tipinden oluşan dizi.
*/

type User = { id: number; name: string; active: boolean };

const users: User[] = [
  { id: 1, name: "Ada", active: true },
  { id: 2, name: "Linus", active: false },
];

// name'leri çek
const names = getUsersProperty(users, "name"); 
// names: string[]  -> ["Ada", "Linus"]

// id'leri çek
const ids = getUsersProperty(users, "id");     
// ids: number[]   -> [1, 2]

// active'leri çek
const actives = getUsersProperty(users, "active"); 
// actives: boolean[] -> [true, false]

// Geçersiz key:
//getUsersProperty(users, "email"); // ❌ derleme hatası: "email" keyof User değil

// Avantajlar:

// key sadece T’nin gerçek anahtarları olabilir (tip güvenliği).

// Dönüş tipini key belirler ("name" -> string[], "id" -> number[]).

// T esnek kalır: HasID’i taşıyan herhangi bir şekil çalışır.

/*

5) “Narrowing” vs “Constraint”

T extends HasID constraint (kısıt)’tır; “T, HasID’e uymalı” der. Bu runtime narrowing (çalışma zamanı daraltma) değildir; derleyici garantisidir.

Runtime narrowing yapmak istiyorsan, çalışırken kontrol eden kod/guard yazarsın (ör. if ("id" in user) { ... }). Ama burada buna gerek yok; TypeScript zaten id’nin varlığını derleme zamanında şart koşuyor.


6) Küçük püf noktaları

getUsersProperty içinde user[key] erişimi güvenli çünkü K extends keyof T kısıtı var.

T[K][] dönüş tipi sayesinde, fonksiyonun çıktısını kullanırken tiplerin otomatik uyumu olur (ör. names.map(n => n.toUpperCase()) sorunsuz).

T daha zengin bir tip olabilir; örn. User & { roles: string[] } gibi. Kısıt sadece id:number’ı garanti eder; fazlası serbesttir.
*/

/*
1) T extends HasID
Anlamı: T, HasID’e atanabilir olmalı (assignable). Yani T en az { id: number } alanını taşımalı.
Model: “yapısal olarak en az şu alanları içer.”

Örnek:
interface HasID { id: number }
type User = { id: number; name: string };

// geçer: User, HasID’e atanabilir
const f = <T extends HasID>(x: T) => x.id;
f<User>({ id: 1, name: "Ada" });
// f<{ name: string }>({ name: "Ada" }) // ❌ id yok

Burada extends, kalıtım (inheritance) anlamında değil; kısıt (constraint) olarak, “T şu tipe atanabilir olmalı” demek.

2) K extends keyof T

Anlamı: K, keyof T birleşim tipine atanabilir olmalı. keyof T -> T’nin tüm anahtarlarının (genelde string literal’ların) union’ıdır.

Model: “K, T’nin geçerli bir anahtarı (veya anahtarlar altkümesi) olmalı.”

type User = { id: number; name: string; active: boolean };
type Keys = keyof User; // "id" | "name" | "active"

const g = <T, K extends keyof T>(obj: T, key: K) => obj[key];

g<User, "name">({ id: 1, name: "Ada", active: true }, "name"); // ok
// g<User, "email">(..., "email") // ❌ "email" keyof User değil


Buradaki “extends” yine kısıt anlamında; ama kısıtın hedefi bu kez “bir anahtarlar birliği (union)” tipi.
Neden “farklı” hissediliyor?

İlkinde (T extends HasID) kısıt, nesne şekli (yapısal) üzerine: “en az bu alanlar.”

İkincisinde (K extends keyof T) kısıt, literal union üzerine: “bu union’ın alt kümesi ol.”

İkisi de aslında aynı mekanizma: “X extends Y” = “X, Y’ye atanabilir olmalı.”
Sadece “Y”nin doğası farklı:

HasID → bir nesne tipi (şekil).

keyof T → string literal union (anahtar isimleri kümesi).

Minik akıl kısayolu

T extends HasID → “T HasID şeklini kapsar (en az id:number).”

K extends keyof T → “K, T’nin anahtarlarından biri (veya bir alt kümesi).”

T[K] → “T’de K anahtarındaki alanın tipi.”


*/

const usersArray = [
  {
    "id": 1,
    "name": "Ayla Nilsen",
    "username": "ayla.nilsen",
    "address": {
      "street": "Sørenga Brygge",
      "suite": "Apt. 12B",
      "city": "Oslo",
      "zipcode": "0194",
      "geo": {
        "lat": "59.9032",
        "lng": "10.7557"
      }
    },
    "phone": "+47 400 12 345",
    "website": "aylanilsen.dev",
    "company": {
      "name": "Nordic Pixel AS",
      "catchPhrase": "Seamless cloud-native experiences",
      "bs": "deliver scalable microservices"
    }
  },
  {
    "id": 2,
    "name": "Jonas Berg",
    "username": "jberg",
    "address": {
      "street": "Torggata",
      "suite": "Suite 304",
      "city": "Trondheim",
      "zipcode": "7011",
      "geo": {
        "lat": "63.4305",
        "lng": "10.3951"
      }
    },
    "phone": "+47 922 88 110",
    "website": "jonasberg.io",
    "company": {
      "name": "FjordWorks",
      "catchPhrase": "AI-powered data pipelines",
      "bs": "optimize real-time analytics"
    }
  },
  {
    "id": 3,
    "name": "Maja Solheim",
    "username": "msolheim",
    "address": {
      "street": "Skagenkaien",
      "suite": "Floor 5",
      "city": "Stavanger",
      "zipcode": "4006",
      "geo": {
        "lat": "58.9690",
        "lng": "5.7331"
      }
    },
    "phone": "+47 913 55 789",
    "website": "majasolheim.net",
    "company": {
      "name": "Arctic Labs",
      "catchPhrase": "Next-gen edge computing",
      "bs": "harness low-latency workloads"
    }
  }
]
	


//ONCELIKLE 2.paramtrede sadece property isimlerini girebileciegimz soylenerek lsitenenmis oluyor bu cok iy...
console.log(getUsersProperty(usersArray,"username"))
console.log(getUsersProperty(usersArray,"address"));


class StateObject<T> {
	private data:T 

	constructor(value:T)
	{
		this.data = value;	
	}

	get state():T {
		return this.data;
	}

	set state(value:T) {
		this.data = value;
	}
}

const store = new StateObject("John");
console.log(store.state);

store.state = "Dave";
//store.state = 12; //Number is not assignable to the string
//value:unknown olarak geliyor..Biz parametreye value girene kadar inferred yapamiyor...
//YUkarda string verdkten sonra string bekliyor 
//Ama burda artik biz diyrouz ki string,number boolan olabilir ve osnrsinda 15 number iceren bir string gonderiyoruz hic sorun yasamadan
const store2 = new StateObject<(string | number | boolean)[]>([15]);
//Type kendi ihtiyacimiza gore spesifklestirerek kullaniyoruz
store2.state = ['Dave', 42, true];
console.log(store2.state);
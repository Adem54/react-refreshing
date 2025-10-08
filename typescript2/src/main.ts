let myName = 'Adem';//inferred to string...implicit.ly, string i kendisi atiyor, value uzerinden
let myName2:string = 'Zehra';//explicitly declared, not inferred...cunku biz type i atadik...
//ama kendimiz explicityl atamasak bile deger atadigmzda o type ini kendisi  bulur...

//Ancak iste myName e string bir deger atayinca typescirpt onun string oldugunu inferred-implicity anlar, iste ondan sonra gelip da myName e integer deger atarsak(myName = 5;) typescript compiletime da hata alacagiz...
//Bu sekilde string sonra int atamak jscriptte sorun degil di degilmi ama typescriptte sorun ama..ki typescritptin amaci da bu id zaten

let myName3:string;
myName3="Zeynep";
myName3="Erbas";
let meaningOfLife:number; 
let isLoading:boolean;
let album:any;//defeat typescript, typescriptti devredisi birakir, artik istedign tipi girersin 

meaningOfLife=42;//has to be number 
isLoading = true;//has to be boolean

album = "Hey";
album = 14;
album = true;
//Bu any type i olabildigince az kullanacaz, ama bazi durumlar var ki mecbur any kullanmamiz gerekebilir, ancak dedigmz gibi suistimal etmemek gerek,cunku typescript kullanim amacini ortadan kaldirmis oluyor

const sum = function(num1:number,num2:number):number
{
  return num1+num2;//Biz num1,num2 ye eger type vermese idik bile javascript burda + kullanildig icin concetanation yapacaktir kendisi...completely legal jscript operation..olurdu...
}

//Union type
let album2 : number | string;
album2 = 15;
album2 = "Hello";
//album3 = true;//not boolean

let postId:string | number;//api postId yi string veya number gonderebilirse ornegin.. 
let isActive:number | boolean | string;//sometimes 0 -false, 1 true..could be.. 

let re:RegExp = /\w+/g;//regular expression..which type..typescript inferred RegExp type
//typescript regexp icin spesifik bir type atar..


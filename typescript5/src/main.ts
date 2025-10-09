//Type assertions-Type casting 
//Bazen typescript senin datan la ilgili bir cikarim yapamaz...
//Mesela...
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;

type One = string;
type Two = string | number;//unnion type
type Three = 'hello';//literal type

let a: One = 'hello';
let b = a as Two;//less specific type
let c = a as Three;//more specific

let d = <One>'world'; 
let f:One = 'world'; 
let e = <string | number>'world';

let dd = <One>'world';   // (veya: 'world' as One)  → *type assertion*
let ff: One = 'world';   // → *type annotation*
//No, not in TSX. Angle-bracket type assertions like let d = <One>'world' conflict with JSX syntax, so in React (.tsx files) you should use as assertions instead:

// ✅ in .tsx
let ddd = 'world' as One;
//In TSX, anything starting with <...> is parsed as JSX (e.g., <div>...</div> or <Component />). The angle-bracket assertion form is therefore disabled. TypeScript’s rule of thumb

//.ts files: you may use either <Type>expr or expr as Type.
//.tsx files (React): use as; angle-bracket assertions are not allowed.
//Don’t confuse with JSX/generics
//<Fragment>...</Fragment> or <Component<T> /> are JSX, not assertions.

//Assertion
const addOrConcat = (a:number, b:number, c:'add' | 'concat'):number | string=>{
  if(c === 'add') return a+b;
  return '' + a + b;
}

//method union type donuyor..ama benim myVal im string donuyor..Ve biz burda assertion yani diyuorzki biz biliyoruz...bu string donecek...as string yaparak..BUNUNLA COK KARSILASACAGIZ... 
let myVal : string = addOrConcat(2,2,'concat') as string;
//explicityl olark biz typescriptte bizim assertion imizi yani kararligimzi belirtiyrouz tamam bu string donecek

let myNum:number = addOrConcat(2,4,'add') as number;

//BE CAREFUL! TS SEES NO PROBLEM - BUT a string is returned
let myVal2 : number = addOrConcat(2,2,'concat') as number;
//Biz typescripte assertionimizi gosterince o isi bize birakiyor ve bize guveniyor ama biz gidip de string donecek bir fonksyonu as number bu number donecek bana guven diyorsun o da guveniyor ee ne oldu simdi patladi..iste dikkat

//UNKNOWN..
//10 as string; //Bunda hata veriyor...integer i string olarak dondurmeye..ama sen bunu bilincli yapiyorsan o zaman sana diyor ki ilk once bunu unknown expression inia cevir
//unknown type any gibi ama any gibi heryede kullanamazsin..ama bizim burdaki use -case de kullanabilirsin
(10 as unknown) as string;//two assertions in a row..double-casting or force-casting diye de geciyor 
//BOYLE SEYLERI MUMKUN OLDUGUNCA YAPMAYALIM CUNKU BUNLAR TYPESCRIPT KURALLARINI CIGNEMIS OLUYOR

//THE DOM... 
const img = document.getElementById('img') ;//HTMLElement | null..Burda verilen id oldugu icin her turlu farkli element olabilir
const img2 = document.querySelector('img') ;//(HTMLImageElement | null)...Ama burda biz direk img elementi oldunu bilerek seciyoruz...
const img3 = document.querySelector('#img');// Element | null ..Burda da yine id veriyoruz her hangi bir elment olabilir diye inferred yapiyor typescript burda
//Typescript jscript document i ile ilgili birsey bilmiyor, ama ya bunu (HTMLElement | null), ya da (HTMLImageElement | null) inferred ediyor yani typescrpit nkendisi boyle bir cikarim yapabiliyor
//Ayrica burda null da gelebilir

//img2.src = ""//typescript thinks img2 can HTMLImageElement or null, null meeans this image is not existing in document
//Iste bu hatayi almamak icin biz assertion yani deriz ki as HTMLImageElement iste o zaman hata cozulur..typescript hata vermez artik
const img4 = document.querySelector('img') as HTMLImageElement ;
img4.src = '*****';//burya img url i atayabilirz.

const img5 = document.querySelector('#img') as HTMLElement;
//img5.src = "";//Simdi burda da html elementi diyorsun...dolayisi ile src proprtysi her html elementinde yok zaten
//Yani html elemnti oldugunu biliyor ama specific oolaran ne oldugunu bilmyor <p></p>,<span></span> <div></div> <section></section> <img></img>
//O zaman biz asagidaki gibi cozeriz madem buna src atiyorsun img elementi oldugunu dusunyorsun o zaman dersinki bu HTMLImageElement i olacak.. 

const img6 = document.querySelector('#img') as HTMLImageElement;
img6.src = "";

//NON-NULL OPERATOTURU..ILE BU NULL DEGIL BEN BUNU BILIUORUM..DIYEBILYORUZ.. TAMAM BU NULL OLMAYACAK DIYROUZ...
const img7 = document.querySelector('#img')!;
img7.id= "id";

//DIKKAT TYPESCRIPT KENDISI INFERRED YAPARAK BUNUN HTMLIMAGELEMENT OLCAGINI BILIYOR VE SEN SADEDCE TYPESCRIPTTE DIYORSUNKI BURDA NOT-NULL BU NULLL OLAMAZ
const img8 = document.querySelector('img')!;
img8.src = "";

//Angel bracket ile de tanimlayabiliriz type i 
const img9 = <HTMLImageElement>document.querySelector('#img');
//Sadece bu yomtemin tsx reactta calismayacagini bil

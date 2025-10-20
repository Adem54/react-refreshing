//Index signature
//Object olusturdugmz zaman, ama objectin key lerini bilmiyorsak
//objectin key-value lerini de shape-sekillendirebliiriz
//Dinamik olarak bir objeye erismeye calilirsa, typescript index-singature talep ediyor..
/*
interface TransactionObj {
  Pizza:number, 
  Books:number,
  Job:number
}

const todaysTransaction:TransactionObj = {
  Pizza:-10,
  Books:-5,
  Job:50
}

//Bazen biz bir obje icin interface olustururken obje key-value leri ile ilgili tam bilemeyebiliriz..
//Iste boyle durumlarda index-signature cok kullanisli, ayrica bu propetieslere dyamically erisilmeye calisildiginda da


//Burda sorun yok
console.log(todaysTransaction.Pizza);
console.log(todaysTransaction['Pizza']);

//Dynamically access
let prop:string = 'Pizza';
//console.log(todaysTransaction[prop]);
/*
Typescript bu hatayi verir..
Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'TransactionObj'.
  No index signature with a parameter of type 'string' was found on type 'TransactionObj'.ts(7053)
  Cunku biz index-signature olusturmadik ve biz buna dinamik olarak erismeye calistik
*//*

const todaysNet = (transactions:TransactionObj):number => {
  let total = 0;
  for(const transaction in transactions)
  {
    total += transactions[transaction];//Bu jscript icin sorun olmuyor ama typescriptt burda index-signature talep eder ve bu sekilde dinamik olarak erismeyi sakincali bulur
  }
  return total;
}

console.log(todaysNet(todaysTransaction));
*/

//SIMDI INDEX-SIGNATURE I OLUSTURALIM 
//ONce biz olsuturulacak obje nin key-value lerin bilmedigmizi dusunelim


interface TransactionObj2 {
 readonly[index:string]:number//index signature, it declares that all of the keys will be string and all of the values will be numbers..
 //We could use also union types for values
 //[index:string]:number | string | boolean
 //Keys genellikle string olacak, baska seylerde olabilir ama boolean olamaz o kesin..boolean girmeye claisrsak burda, typescript asagidaki gibi hata verir
 //An index signature parameter type must be 'string', 'number', 'symbol', or a template literal type.ts(1268)
}


const todaysTransaction2:TransactionObj2 = 
{
  Pizza:-10,
  Books:-5,
  Job:50
}


const todaysNet2 = (transactions:TransactionObj2):number => {
  let total = 0;
  if(typeof transactions !== 'undefined')
  {
    for(const transaction in transactions)
    {
      //Oncelikle eger ortada bir obj yoksa onun propertysini de cagiramazsin...
      total += transactions[transaction] ?? 0;//Bu jscript icin sorun olmuyor ama typescriptt burda index-signature talep eder ve bu sekilde dinamik olarak erismeyi sakincali bulur
    }
    return total;
  
  }else{
    return 0;
  }
}


const todaysNet3 = (transactions: TransactionObj2): number => {
  let total = 0;
  for (const k in transactions) {
    total += transactions[k] ?? 0;//COK ONEMLI HATA COZME TEKNIGI
  }
  return total; // always returns
};

let prop2:string = 'Pizza';
console.log(todaysTransaction2[prop2]);

todaysNet2(todaysTransaction2);

//Index signature type only permits reading, Cunku readonly yaptik biz onu...bu sekilde de koruyabliyoruz..girilen bir object proeprtiesi...
//todaysTransaction2.Pizza = 59;
//todaysTransaction2.Job = 66;
console.log("todaysTransaction2: ",todaysTransaction2);//DIKKAT BU TYPESCRIPTTEKI READONLY SADECE TYPESCRIPTTARAFINDA TYPE HATASI VERIR BIZE..AMA JAVSCRIPTTE BU SET ISLEMLERI YAPILYOR..GECERLIDIRI CONSOLE.LOOG DA GOREBILRIZI BUNU BILELIM BU ONEMLI...VE TEHLIKELIDIR BILMEZSEK....

todaysTransaction2['Adem'];//eger boyle bir string yok ise undefined doner ama typescript e biz index-signature eklyerek sadece type lar i ile ilgili bilgiler verdik dolayisi ile typescript key in ne olacagini bilemedig icin burda zaten hata vermez..Typescript suna bakar key-string mi, value number mi

//index-signature e ek olarak interface de yeni propertieslerde ekleyebiliriz

interface TransactionObj3 {
  readonly [index:string]:number,
  Pizza:number, 
  Books:number,
  Job:number
}
//Dikket edelim burda 3 tane key requireed oluyor,kullanilmak zroudna sonra eger bir obje olustururken bu interface i kullanacaksan 3 zorunludan sonra ekleyeceklerin de string property ve number value olmalidir diyor

const todaysTransaction3:TransactionObj3 = 
{
  Pizza:-10,
  Books:-5,
  Job:50,
  //Zehra:"Erbas", bu yazilamaz..cunkju value string, number olmali idi
  Adem:54,
}

interface Student {
  name:string,//; de yazilaiblir
  GPA:number,
  classes?:number[]
}

const student: Student =  {
  name:'Dobug',
  GPA:3.5,
  classes:[100,200]
}
//This is strict interface.. Yani bu interface i kullanan studen ekstra baska bir property ekleyemez...belirtilenler disinda ..yani sadece prototype yontemi ile degil=>student.test, direk studen objesinini icerisine de eklenemez...
//console.log(student.test);HATA ALIRIZ

//ANCAK BIR DE SOYLE DENEYELIM 

interface Student2 {
  readonly [key:string]:number | string | number[] | string[] | undefined;
  name:string,//; de yazilaiblir
  GPA:number,
  classes?:number[]
}

const student2: Student2 =  {
  name:'Dobug',
  GPA:3.5,
  classes:[100,200],
  teachers:["Alina","Andy"]
}

//student2.test = "Test";

//Bu durumda direk olarka student2 iceriisne ekleyebiliyoruz ama, student2 ye prototyping ile ekleyemiyoruz...yine=>student2.test = "Test";

//BIRDE DAHA FARKLI DENEYEREK HEM DIREK EKLEEME, HEM DE PROTOTYPING ILE EKLEMEYE BAKALIM


interface Student3 {
  [key:string]:number | string | number[] | string[] | undefined;//undefined da ekledik cunku classes optional oldugu iicn undefined da olabilir
  name:string,//; de yazilaiblir
  GPA:number,
  classes?:number[]
}

const student3: Student3 =  {
  name:'Dobug',
  GPA:3.5,
  classes:[100,200],
  teachers:["Alina","Andy"]
}

student3.test = "Test";
//SIMDI HIC OLMAYAN BIR PROPERTIES ATAMASI YAPABILIYOR BIZ IINTERFACE E READONLY OLMAYAN BIR [key:string]:string | number | number[]...ekledigmiz zaman...ki bu biraz riskli cunku biz zatn typescript kullanarak, objelerimizin ongoruleblir datlarimizi ongurulebilir ypamak istiyoruz...ONDNA DOLAYI DIKKAT LI DUSUNEREK HANGISI ISIMIZE YARIIYOR ISE ONU KULLANALIM...

//EVET SIMDI GORDGUMZ GIBI, HEM DIREK OBJE ICERISINE HEM DE,PROTOTYPING ILE EKLEYEBILIYORUZ...
console.log("*************************")

for (const key in student3)
{
    console.log(`${key}: ${student3[key]}`);
}
/*
Eger biz student3 un interface i olan Student3 te index-signature kullanmaz isek typescript bize su hatayi verecek for-in object iterate i icerisinde...
Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Student3'.
  No index signature with a parameter of type 'string' was found on type 'Student3'
Yani burayi kullanmazsak eger:interface Student3 {
  [key:string]:number | string | number[] | string[] | undefined;
BU HATANIN NE OLDUGUNU BILELIM VE ONA GORE KARSIMZIA COK CIKACAK...

  Ama tekrarlayalim bu sadece typescript hatasi olarak karsimza gelir jscriptte herhangi bir hata vermez...
*/

//PEKI  O ZAMAN INDEX-SIGNUTE OLMADAN OLUSTURDUGMZ BIR INTERFACE I KULLANAN OBJEMIZI NASIL ITERA EDECEGIZ O ZAMAN!!!

interface Student4 {
  name:string,//; de yazilaiblir
  GPA:number,
  classes?:number[]
}

const student4: Student4 =  {
  name:'Dobug',
  GPA:3.5,
  classes:[100,200]
}
console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")

//keyof assertion kullanarak..Burda keyof union-type string-spesifik literal olustuyor
//Union type of name,GPA ve classes
for (const key in student4)
{
    console.log(`${key}: ${student4[key as keyof Student4]}`);
}

console.log("#####################")
Object.keys(student4).map((key:string)=>
{
  console.log(student4[key as keyof typeof student4])
})
//Objenin ne olacagini bilmedgimizi farzedelim..
//Objemiz var ama tam type in bilmiyrouz mesela
//Burda biz diyoruz ki biz student4 un type ini bilmiuoruz...
//Dynamically accesint the property values and i want to say key and keyof, but now imagine we don't know what the student object what the type of it is the interface. We just have an object and we don't know excatly the type
//So now we could say typeof and list the object itself, notice it is lowercase student4 not the uppercase student4 interface, now typescript is good with that too.Because we are saying we don't know what the type of is, so we're just retrieving the type of by referencing the object itself and this also works when i save we'll se the difference in

//SIMDI ACIKLAYALIM-keyof typeof student4 ne demek?

//typeof student4 ifadesi, değişkenin tipini alır (runtime değerini değil). Yani:

const student5 = { name: "Dobug", GPA: 3.5, classes: [100, 200] };
type T = typeof student5;          // { name: string; GPA: number; classes: number[] }
type K = keyof typeof student5;    // "name" | "GPA" | "classes"

/*
Burada interface Student5’ü bilmek zorunda değilsin(tabi student5 in Student5 interfaci kullaniyorsa..varsyimindan); elindeki nesneden tip türetiyorsun. Bu, “objenin kesin interface’ini bilmiyorum; eldeki objeden çıkarım yap” senaryosu için kullanışlı.

Dikkat: typeof Student5 yanlıştır (interface bir “değer” değildir; typeof yalnızca değerler üzerinde çalışır).
*/

//Neden key as keyof Student4 yazıyoruz?
//for (const key in student4) ve Object.keys(student4) çalışma zamanında string döndürür; TypeScript bunları geniş bir string olarak görür, "name" | "GPA" | "classes" diye daraltmaz.
//Bu yüzden student4[key] ifadesi tür açısından güvensiz görünür. Güvenli hale getirmek için assertion yapıyoruz:

for (const key in student4) 
{
  console.log(student4[key as keyof Student4]); // key'i daraltıyoruz
}
//Alternatif (daha “tipli”) bir yol:
for (const key of Object.keys(student4) as Array<keyof Student4>) 
{
  console.log(student4[key]);
}

//Neden iki farklı yaklaşım var?
//Eğer nesnenin tipini zaten interface ile açıkça belirlediysen: keyof Student4
//Eğer nesnenin interface’ini bilmiyorsan ama elinde bir örnek nesne varsa: keyof typeof student4

//Küçük ama önemli noktalar
//Object.keys → string[] döndürür; literal birlik (union) kaybolur. Bu yüzden as Array<keyof T> ile daraltmak sık görülür.
//classes? opsiyoneldir; noUncheckedIndexedAccess açıksa student4[key] tipi number | number[] | undefined olabilir. Guard veya ?? kullan:




interface Student6 {
  name: string;
  GPA: number;
  classes?: number[];
}

const student6: Student6 = { name: "Dobug", GPA: 3.5, classes: [100, 200] };

for (const key of Object.keys(student6) as Array<keyof Student6>) {
  const val = student6[key];
  console.log(`${key}:`, val);
}

Object.keys(student6).forEach((key) => {
  const v = student6[key as keyof typeof student6];
  console.log(v);
});

//keyof Student4 ⇒ "name" | "GPA" | "classes".
//typeof student4 ⇒ elindeki değişkenin tipini çıkarır; keyof typeof student4 ⇒ yine aynı union.
//keyof typeof student4=> keyof Student4 ile aynidir zaten
//for…in / Object.keys → string üretir; bu yüzden as keyof … ile daraltmak gerekir.

//Bir fonksihyon olusturuyoruz..VE gordugumz gibi hata almiyoruz
//SUNU IYI BILELIM...keyof Student=>name | GPA | classes i literal string olarak getirir ve bunlardan baskasi gelememis olur..HARIKA BESTPRACTISE...
const logStudentKey = (student4:Student4, key:keyof Student):void=>
{
    console.log(`Student ${key}: is  ${student4[key]} !!!!!!!!!!!`)
}

logStudentKey(student4,'GPA');
logStudentKey(student4,'name');
logStudentKey(student4,'classes');

console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");

interface Incomes {
  //[key:'salary'| 'bonus' | 'sidehustle']:number
  [key:string]:number
}

type Streams = 'salary' | 'bonus' | 'sidehustle';

//We use the utility type ,with ange brackets
//This syntax is smaller and it allows us to use string literals here as the different types that are expected and that comes into play when if I comment this out for example and come back to our interface up above..ve biz key: karsindaki string yerijne literal strings kullanmaya calistik...'salary' | 'bonus' | 'sidehustle' ama typescript bunu problem yapiyor...bu sekidle direk literal types yazamaszin key e type olarak diyor..  [key:'salary'| 'bonus' | 'sidehustle']:number..error..
//So if we want to provide literal type here we can with the utility type record..o zaman type Incomes2 = Record<Streams, number> i kullaniriz...
type Incomes2 = Record<Streams, number>


/*
!!type Incomes2 = Record<Streams, number> NE DEMEKTIR?
type Incomes2 = Record<Streams, number> demek, anahtarları tam olarak 'salary' | 'bonus' | 'sidehustle' olan ve her birinin değeri number olan bir nesne tipi oluştur demektir. Record<K,V> TypeScript’in yerleşik utility type’ıdır: “K anahtarlarının her biri için V değeri” anlamına gelir.

!!Neden index signature ile yapamadın?
Şu yazım geçersiz:
interface Incomes {
  [key: 'salary' | 'bonus' | 'sidehustle']: number // ❌ olmaz
}
!!Index signature’da parametre tipi sadece string | number | symbol | template literal type olabilir;spesifik string literal union burada kullanılamaz.

!!Aynı şeyi doğru şekilde ifade etmenin 2 yolu var:

!!1) Record (kısa yol)
type Streams = 'salary' | 'bonus' | 'sidehustle';
type Incomes2 = Record<Streams, number>;

!!2)2) Mapped type (uzun ama açık yol)
type Incomes2 = { [K in Streams]: number };

!!Bu ikisi eşdeğerdir.

&&Record nedir?

Şablon: Record<K, V>

K: anahtarların kümesi (genelde string literal union).

V: her anahtarın değeri.

type Flags = Record<'isAdmin' | 'isActive', boolean>; { isAdmin: boolean; isActive: boolean }

!!Incomes2 nasıl kullanılır?

type Streams = 'salary' | 'bonus' | 'sidehustle';
type Incomes2 = Record<Streams, number>;

const incomes: Incomes2 = {
  salary: 5000,
  bonus: 800,
  sidehustle: 1200,
};

// Doğru erişim:
incomes.salary;        // number
incomes['bonus'];      // number

// Hatalar:
incomes.rent = 1000;   // ❌ 'rent' geçersiz anahtar


!Fark: interface Incomes { [key: string]: number } dersen her türlü string anahtara izin verirsin.
!Record<Streams, number> ise sadece o üç anahtara izin verir (ve hepsi zorunludur).....BU FARK COOK ONEMLIDIR

interface yerine type kullanılabilir mi?
Evet. Record<...> bir type alias üretir; çoğu durumda interface ile aynı amaçla kullanılır. Hatta istersen interface de Record’u genişletebilir:

interface HasIncomes extends Record<Streams, number> {
  owner: string;
}

Ne zaman hangisi?

Anahtar kümesi sabitse ve sadece onları istiyorsan → Record<Streams, V> / mapped type.

Her türlü key’e izin verip değer tipini sabit tutmak istiyorsan → index signature:
interface Incomes { [key: string]: number }.

Özet:
Record<Streams, number> = “salary/bonus/sidehustle zorunlu key’ler, değerleri number.”
Index signature = “her string key’e number değeri.”
*/


//!!HARIKA BESTPRACTISE

type Streams2 = 'salary' | 'bonus' | 'sidehustle';

type Incomes3 = Record<Streams2, number | string>
//Bu su demektir....biz bir obje olsuturacagiz bu objenin key leri Streams2 deki literal stringlerden biri olmalidir ancak, her bir key salary,bonus,sidehustle in type i string ya da number olabilir...demektir
//Bu hemm avaantaj birazda eksiklik,dezavantaj gibi..drawback...

const monthlyIncomes:Incomes3 = {
  salary: 500,
  bonus: 100,
  sidehustle: 250
}

for(const revenue in monthlyIncomes)
{
  //keyof Assertion ile...cozuyorduk hatirlayalim
  //console.log(monthlyIncomes[revenue as keyof Incomes3]);
  //console.log(monthlyIncomes[revenue as keyof typeof monthlyIncomes]);
  // console.log(monthlyIncomes[revenue as Streams2]);
   console.log(monthlyIncomes[revenue as Streams2]);
   //console.log(monthlyIncomes[revenue]);//BURDA TYPESCRIPT ERROR VERIYOR DIREK KULLANIMDA..
}

//!!HATIRLAYALIM...INDEX-SIGNATURE KULLAMDIGIIZDA ASAGIDAKI GIBI, SORUN YASAMIYORDUK...DIREK OLARAK FOR-IN ICERIISNDE DINAMIK KEY-VALUE KULLANIMDA

interface Incomes4 {
  //[key:'salary'| 'bonus' | 'sidehustle']:number
  [key:string]:number
}

const monthlyIncomes2:Incomes4 = {
  salary: 500,
  bonus: 100,
  sidehustle: 250
}

for(const revenue in monthlyIncomes2)
{
   console.log(monthlyIncomes2[revenue]);
}
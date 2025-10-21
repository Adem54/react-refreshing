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
*/ /*

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
const todaysTransaction2 = {
    Pizza: -10,
    Books: -5,
    Job: 50
};
const todaysNet2 = (transactions) => {
    var _a;
    let total = 0;
    if (typeof transactions !== 'undefined') {
        for (const transaction in transactions) {
            //Oncelikle eger ortada bir obj yoksa onun propertysini de cagiramazsin...
            total += (_a = transactions[transaction]) !== null && _a !== void 0 ? _a : 0; //Bu jscript icin sorun olmuyor ama typescriptt burda index-signature talep eder ve bu sekilde dinamik olarak erismeyi sakincali bulur
        }
        return total;
    }
    else {
        return 0;
    }
};
const todaysNet3 = (transactions) => {
    var _a;
    let total = 0;
    for (const k in transactions) {
        total += (_a = transactions[k]) !== null && _a !== void 0 ? _a : 0; //COK ONEMLI HATA COZME TEKNIGI
    }
    return total; // always returns
};
let prop2 = 'Pizza';
console.log(todaysTransaction2[prop2]);
todaysNet2(todaysTransaction2);
//Index signature type only permits reading, Cunku readonly yaptik biz onu...bu sekilde de koruyabliyoruz..girilen bir object proeprtiesi...
//todaysTransaction2.Pizza = 59;
//todaysTransaction2.Job = 66;
console.log("todaysTransaction2: ", todaysTransaction2); //DIKKAT BU TYPESCRIPTTEKI READONLY SADECE TYPESCRIPTTARAFINDA TYPE HATASI VERIR BIZE..AMA JAVSCRIPTTE BU SET ISLEMLERI YAPILYOR..GECERLIDIRI CONSOLE.LOOG DA GOREBILRIZI BUNU BILELIM BU ONEMLI...VE TEHLIKELIDIR BILMEZSEK....
todaysTransaction2['Adem']; //eger boyle bir string yok ise undefined doner ama typescript e biz index-signature eklyerek sadece type lar i ile ilgili bilgiler verdik dolayisi ile typescript key in ne olacagini bilemedig icin burda zaten hata vermez..Typescript suna bakar key-string mi, value number mi
//Dikket edelim burda 3 tane key requireed oluyor,kullanilmak zroudna sonra eger bir obje olustururken bu interface i kullanacaksan 3 zorunludan sonra ekleyeceklerin de string property ve number value olmalidir diyor
const todaysTransaction3 = {
    Pizza: -10,
    Books: -5,
    Job: 50,
    //Zehra:"Erbas", bu yazilamaz..cunkju value string, number olmali idi
    Adem: 54,
};
const student = {
    name: 'Dobug',
    GPA: 3.5,
    classes: [100, 200]
};
const student2 = {
    name: 'Dobug',
    GPA: 3.5,
    classes: [100, 200],
    teachers: ["Alina", "Andy"]
};
const student3 = {
    name: 'Dobug',
    GPA: 3.5,
    classes: [100, 200],
    teachers: ["Alina", "Andy"]
};
student3.test = "Test";
//SIMDI HIC OLMAYAN BIR PROPERTIES ATAMASI YAPABILIYOR BIZ IINTERFACE E READONLY OLMAYAN BIR [key:string]:string | number | number[]...ekledigmiz zaman...ki bu biraz riskli cunku biz zatn typescript kullanarak, objelerimizin ongoruleblir datlarimizi ongurulebilir ypamak istiyoruz...ONDNA DOLAYI DIKKAT LI DUSUNEREK HANGISI ISIMIZE YARIIYOR ISE ONU KULLANALIM...
//EVET SIMDI GORDGUMZ GIBI, HEM DIREK OBJE ICERISINE HEM DE,PROTOTYPING ILE EKLEYEBILIYORUZ...
console.log("*************************");
for (const key in student3) {
    console.log(`${key}: ${student3[key]}`);
}
const student4 = {
    name: 'Dobug',
    GPA: 3.5,
    classes: [100, 200]
};
console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
//keyof assertion kullanarak..Burda keyof union-type string-spesifik literal olustuyor
//Union type of name,GPA ve classes
for (const key in student4) {
    console.log(`${key}: ${student4[key]}`);
}
console.log("#####################");
Object.keys(student4).map((key) => {
    console.log(student4[key]);
});
//Objenin ne olacagini bilmedgimizi farzedelim..
//Objemiz var ama tam type in bilmiyrouz mesela
//Burda biz diyoruz ki biz student4 un type ini bilmiuoruz...
//Dynamically accesint the property values and i want to say key and keyof, but now imagine we don't know what the student object what the type of it is the interface. We just have an object and we don't know excatly the type
//So now we could say typeof and list the object itself, notice it is lowercase student4 not the uppercase student4 interface, now typescript is good with that too.Because we are saying we don't know what the type of is, so we're just retrieving the type of by referencing the object itself and this also works when i save we'll se the difference in
//SIMDI ACIKLAYALIM-keyof typeof student4 ne demek?
//typeof student4 ifadesi, değişkenin tipini alır (runtime değerini değil). Yani:
const student5 = { name: "Dobug", GPA: 3.5, classes: [100, 200] };
/*
Burada interface Student5’ü bilmek zorunda değilsin(tabi student5 in Student5 interfaci kullaniyorsa..varsyimindan); elindeki nesneden tip türetiyorsun. Bu, “objenin kesin interface’ini bilmiyorum; eldeki objeden çıkarım yap” senaryosu için kullanışlı.

Dikkat: typeof Student5 yanlıştır (interface bir “değer” değildir; typeof yalnızca değerler üzerinde çalışır).
*/
//Neden key as keyof Student4 yazıyoruz?
//for (const key in student4) ve Object.keys(student4) çalışma zamanında string döndürür; TypeScript bunları geniş bir string olarak görür, "name" | "GPA" | "classes" diye daraltmaz.
//Bu yüzden student4[key] ifadesi tür açısından güvensiz görünür. Güvenli hale getirmek için assertion yapıyoruz:
for (const key in student4) {
    console.log(student4[key]); // key'i daraltıyoruz
}
//Alternatif (daha “tipli”) bir yol:
for (const key of Object.keys(student4)) {
    console.log(student4[key]);
}
const student6 = { name: "Dobug", GPA: 3.5, classes: [100, 200] };
for (const key of Object.keys(student6)) {
    const val = student6[key];
    console.log(`${key}:`, val);
}
Object.keys(student6).forEach((key) => {
    const v = student6[key];
    console.log(v);
});
//keyof Student4 ⇒ "name" | "GPA" | "classes".
//typeof student4 ⇒ elindeki değişkenin tipini çıkarır; keyof typeof student4 ⇒ yine aynı union.
//keyof typeof student4=> keyof Student4 ile aynidir zaten
//for…in / Object.keys → string üretir; bu yüzden as keyof … ile daraltmak gerekir.
//Bir fonksihyon olusturuyoruz..VE gordugumz gibi hata almiyoruz
//SUNU IYI BILELIM...keyof Student=>name | GPA | classes i literal string olarak getirir ve bunlardan baskasi gelememis olur..HARIKA BESTPRACTISE...
const logStudentKey = (student4, key) => {
    console.log(`Student ${key}: is  ${student4[key]} !!!!!!!!!!!`);
};
logStudentKey(student4, 'GPA');
logStudentKey(student4, 'name');
logStudentKey(student4, 'classes');
console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
//Bu su demektir....biz bir obje olsuturacagiz bu objenin key leri Streams2 deki literal stringlerden biri olmalidir ancak, her bir key salary,bonus,sidehustle in type i string ya da number olabilir...demektir
//Bu hemm avaantaj birazda eksiklik,dezavantaj gibi..drawback...
const monthlyIncomes = {
    salary: 500,
    bonus: 100,
    sidehustle: 250
};
for (const revenue in monthlyIncomes) {
    //keyof Assertion ile...cozuyorduk hatirlayalim
    //console.log(monthlyIncomes[revenue as keyof Incomes3]);
    //console.log(monthlyIncomes[revenue as keyof typeof monthlyIncomes]);
    // console.log(monthlyIncomes[revenue as Streams2]);
    console.log(monthlyIncomes[revenue]);
    //console.log(monthlyIncomes[revenue]);//BURDA TYPESCRIPT ERROR VERIYOR DIREK KULLANIMDA..
}
const monthlyIncomes2 = {
    salary: 500,
    bonus: 100,
    sidehustle: 250
};
for (const revenue in monthlyIncomes2) {
    console.log(monthlyIncomes2[revenue]);
}
export {};

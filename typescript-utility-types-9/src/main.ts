//Utility types 
//Utility types arfe helpful for common type transformations

//Partial
interface Assignment {
  studentId:string,
  title:string,
  grade:number,
  verified?:boolean
}

//Sadece update edecegimz kismi almak istiuyoruz...hepsini degil..Sadece tum propertieslere degil bu type icindeki bazi propertieslere ihtiyacimz var..
const updateAssignment = (assign:Assignment, propsToUpdate:Partial<Assignment>):Assignment=>
{
  //propsToUpdate kullanarak override ediyoruz...Assignment icindeki sadece spesifik property value lerini
  return {...assign, ...propsToUpdate}
}

const assignment1:Assignment = {
  studentId:"compsci1234",
  title:"Final Project",
  grade:0
}

console.log(updateAssignment(assignment1, {title:"MyFinal Project", grade:95}))
const assignChanged = updateAssignment(assignment1, {title:"MyFinal Project", grade:95});

//Required and Readonly 
//Required<Assignment> this requires all of the properties even we set optional like verified?:boolean
//Biz kendimiz optional olarak atasak bile artik required oldular hepsi
const recordAssignment = (assign: Required<Assignment>):Assignment =>
{
   return assign;
}

//Burdas override edemeyiz, Assignment iceriisnde degisiklik yapamayiz, sadece okuruz...ve ekleriz
const assignVerified:(Readonly<Assignment>) =
{
  ...assignChanged, verified:true
}

//Bunu yapamayiz...readonly yaptigmiiz icin
//assignVerified.grade = 56

//recordAssignment(assignChanged);//Hata mesaji gosterir,Cunku assignChanged icerisinde bazi propertiler eksik...ama recordAssignment parametresindeki parametrede required assignemnt old icin tum propertiesler olmak zorunda...

//Ama biz bir obje icinde assignChanged ve eksik olan verified propertiesini birlestirerek bir obje olusturup onu paramtreye verirsek o zaman sorun ortadan kalkacaktir
recordAssignment({...assignChanged, verified:true});

//Most popular usage utility type is Record 
//key-value string olacak diyuoruz..
const hexColorMap:Record<string, string> = {
  red:"FF0000",
  green:"00FF00",
  blue:"0000FF",
}

//string literal type da olusturabilirz
type Students = "Sara" | "Kelly";//Union type string literals
type LetterGrades = "A" | "B" | "C" | "D" | "U";

const finalGrades: Record<Students,LetterGrades> = {
  Sara:"B",
  Kelly:"U",//ama dikkat edelim baska bir key kullanamyiz, key lere de A,B,C,D,U dan baska value atayamayiz
  //Kaja:"A" Error
  //Kelly:"S" Error
}

//Bunu interface ile de yapabiliriz 

interface Grades {
  assign1:number,
  assign2:number
}

const gradeData:Record<Students,Grades> = {
    Sara: {assign1:85, assign2:92},
    Kelly: {assign1:74, assign2:69}
}

//Pick and Omit 
//Dikkat edelim biz Assignment type i icerisinden properti seciuyuoruz cunku assignResult a ihtiyacimz var sadece...
type AssignResult = Pick<Assignment, "studentId" | "grade">;

const score:AssignResult = {
  studentId:"k123",
  grade:85
}
//Herhangi bir sorun yasamadik... 

//Omitte Pick in tam tersi ..yani proerptiesleri veriyouz ve Omit ile verince verilen propertiesler disindakileri alabilelim demis oluuyroz
type AssignPreview = Omit<Assignment, "grade" | "verified">;

const preview : AssignPreview = {
  studentId: "k123",
  title:"Final Project"
} //sorun cikmadan aliyrz

//Pick ve Omit e biz interface ile olsturduguzm type i atadik dikkat edelim..hem type, hem interface verebilyrouz Omit ve Pick de...

//Exclude and Extract ta biz intrface veremiyoruz..type ile kullaniriz
//They are not going to work with interface, they are going to work with string literal Union types 

type adjustedGrade = Exclude<LetterGrades,"U">;//diyoruz ki LetterGrades daki literal types lar icinden U YU exclude et, U YU CIKAR VE GERISINI KULLANABILEYIM BEN.... 
//type LetterGrades = "A" | "B" | "C" | "D" | "U"; YANI SADECE "A" | "B" | "C" | "D"  
type highGrades = Extract<LetterGrades, "A" | "B">;//Burda da LetterGrades icinde "A" | "B" yi cikar al diyoruz dolauyisi ile sadece A | B olur burda da 

//NoneNullable 

type AllPossibleGrades = "Dave" | "John" | null | undefined 
type NamesOnly = NonNullable<AllPossibleGrades>//Burda da null | undefined i cikarir cunku bunlar nullable dir..

//ReturnType 
type newAssign = { title:string, points:number};

const createNewAssing = ( title:string, points:number):newAssign => 
{
  return { title, points }
}
//problem su ki eger biz bu fonksuyonu degistirirsek o zaman type i da degisitjrmemiz gerekir

//newAssign i kullanmiyoruz burda
const createNewAssing2 = ( title:string, points:number) => 
{
  return { title, points }
}
type newAssign2 = ReturnType<typeof createNewAssing2>;
//Biz newAssign2 return eden bir fonksyonu i degistirirsek eger, surekli olarak bizim return typeimizi update edecektir..newAssign2 olarak retunr type verirsek tabi..return type i da otomatik olarak update oluyor

const tsAssign:newAssign2 = createNewAssing2("Utility Types", 100);
console.log(tsAssign);

//RETURN TYPES....
// 1) Başlangıç
let createNewAssing3 = (title: string, points: number) => {
  return { title, points };
};

type NewAssign3 = ReturnType<typeof createNewAssing3>; // { title: string; points: number }
type NewAssign2Manual = { title: string; points: number }; // elde yazdığın eşdeğer tip

// 2) Fonksiyonu değiştiriyorsun (ör. yeni alan ekledin)
createNewAssing3 = (title: string, points: number) => {
  return { title, points, passed: points >= 50 };
};

// Artık:
type NewAssign2 = ReturnType<typeof createNewAssing3>; 
// -> { title: string; points: number; passed: boolean }  ✅ otomatik güncellendi

// Ama NewAssign2Manual aynı kaldı:
// -> { title: string; points: number }                   ❌ ESKİ (uyuşmazlık riski)

//OK ANLASILDI...RETURNTYPE KULLANARAK TYPE I BIR FONKSYONUN DONUS TIPINE BAGLAYARAK O FONKSIYONA BAGLI DINAMIK TYPE YAPYORZ, O FONKSIYONUN DONUS TIPI DEGISIRSE BIZIM RETURNTYPE ILE ATADIMGZ O FONKIYSOHN DONUS TIPI DE OTOMATIK DEGISIIYOR...OKKKK...
//

//Parameters
type AssignParams = Parameters<typeof createNewAssing2>

//tuples kullanmak faydali olabilir..
const assignArgs:AssignParams = ["Generics", 100];

const tsAssign2 : newAssign2 = createNewAssing2(...assignArgs);

console.log(tsAssign2);

//2) Parameters<F>
//“Bu fonksiyonun parametre tiplerini bir tuple olarak ver.”
type AssignParams2 = Parameters<typeof createNewAssing3>;
// AssignParams -> [title: string, points: number]
//Bu sayede argümanları tek paket (tuple) olarak tutup kullanabilirsin:
const assignArgs2: AssignParams = ["Generics", 100];
const tsAssign3: NewAssign2 = createNewAssing2(...assignArgs2);
//Ne kazandırır? Fonksiyon imzasını değiştirirsen (ör. üçüncü parametre eklersen) AssignParams2 otomatik güncellenir; tuple da ona göre uyar.

//Neden typeof kullanıyoruz?
//ReturnType ve Parameters bir tip ister. createNewAssing2 ise değertir (fonksiyon nesnesi).
//typeof createNewAssing2 yazarak “bu değerin tipi”ni elde ediyoruz; yardımcı tiplere bunu veriyoruz.

/*
Kısacası:

ReturnType<F> = fonksiyonun dönüş tipi (otomatik takip).

Parameters<F> = fonksiyonun argüman tuple’ı (otomatik takip).
İmzan değiştiğinde, bu tipler kendini günceller; manuel senkron tutma derdini bitirir.
*/

//Awaited Utility types -HELPS US WITH THE RETURNTYPE OF A PROMISE
interface User  {
  id:number,
  name:string,
  username:string,
  email:string
}

//return type Promise and it is going to have an array of users
const fetchUsers=async ():Promise<User[]> => {
  const data = await fetch('https://jsonplaceholder.typicode.com/users')
  .then(res=>{
    return res.json()
  }).catch(err=> {
    if(err instanceof Error)console.log(err.message);
  })

  return data;
}


type FetchUsersReturnType1 = ReturnType<typeof fetchUsers>;
//type FetchUsersReturnType1 = Promise<User[]>

type FetchUsersReturnType2 = Awaited<ReturnType<typeof fetchUsers>>;
//Awaited ile sardigmizda artik type FetchUsersReturnType2 = User[] oluyor

fetchUsers().then(users=>console.log(users))
/*
Neden lazım?

Gerçekte çok işine yarayan birkaç durum:

Genel yardımcı (generic) wrapper yazarken
Bir async fonksiyonu saran (cache, retry, log vs.) bir helper düşün:

ReturnType<F>: Fonksiyonun döndürdüğü tip → Promise<User[]>.

Awaited<T>: Bir Promise (veya thenable) ise içini açar → User[].

Birlikte: Awaited<ReturnType<typeof fn>> = await fn() yaptığında elindeki gerçek tip.
Bu, generic wrapper’larda, React/loader/query desenlerinde ve karmaşık promise kombinasyonlarında tip güvenliğini çok kolaylaştırır.
*/


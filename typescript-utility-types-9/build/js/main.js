//Utility types 
//Utility types arfe helpful for common type transformations
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//Sadece update edecegimz kismi almak istiuyoruz...hepsini degil..Sadece tum propertieslere degil bu type icindeki bazi propertieslere ihtiyacimz var..
const updateAssignment = (assign, propsToUpdate) => {
    //propsToUpdate kullanarak override ediyoruz...Assignment icindeki sadece spesifik property value lerini
    return Object.assign(Object.assign({}, assign), propsToUpdate);
};
const assignment1 = {
    studentId: "compsci1234",
    title: "Final Project",
    grade: 0
};
console.log(updateAssignment(assignment1, { title: "MyFinal Project", grade: 95 }));
const assignChanged = updateAssignment(assignment1, { title: "MyFinal Project", grade: 95 });
//Required and Readonly 
//Required<Assignment> this requires all of the properties even we set optional like verified?:boolean
//Biz kendimiz optional olarak atasak bile artik required oldular hepsi
const recordAssignment = (assign) => {
    return assign;
};
//Burdas override edemeyiz, Assignment iceriisnde degisiklik yapamayiz, sadece okuruz...ve ekleriz
const assignVerified = Object.assign(Object.assign({}, assignChanged), { verified: true });
//Bunu yapamayiz...readonly yaptigmiiz icin
//assignVerified.grade = 56
//recordAssignment(assignChanged);//Hata mesaji gosterir,Cunku assignChanged icerisinde bazi propertiler eksik...ama recordAssignment parametresindeki parametrede required assignemnt old icin tum propertiesler olmak zorunda...
//Ama biz bir obje icinde assignChanged ve eksik olan verified propertiesini birlestirerek bir obje olusturup onu paramtreye verirsek o zaman sorun ortadan kalkacaktir
recordAssignment(Object.assign(Object.assign({}, assignChanged), { verified: true }));
//Most popular usage utility type is Record 
//key-value string olacak diyuoruz..
const hexColorMap = {
    red: "FF0000",
    green: "00FF00",
    blue: "0000FF",
};
const finalGrades = {
    Sara: "B",
    Kelly: "U", //ama dikkat edelim baska bir key kullanamyiz, key lere de A,B,C,D,U dan baska value atayamayiz
    //Kaja:"A" Error
    //Kelly:"S" Error
};
const gradeData = {
    Sara: { assign1: 85, assign2: 92 },
    Kelly: { assign1: 74, assign2: 69 }
};
const score = {
    studentId: "k123",
    grade: 85
};
const preview = {
    studentId: "k123",
    title: "Final Project"
}; //sorun cikmadan aliyrz
const createNewAssing = (title, points) => {
    return { title, points };
};
//problem su ki eger biz bu fonksuyonu degistirirsek o zaman type i da degisitjrmemiz gerekir
//newAssign i kullanmiyoruz burda
const createNewAssing2 = (title, points) => {
    return { title, points };
};
//Biz newAssign2 return eden bir fonksyonu i degistirirsek eger, surekli olarak bizim return typeimizi update edecektir..newAssign2 olarak retunr type verirsek tabi..return type i da otomatik olarak update oluyor
const tsAssign = createNewAssing2("Utility Types", 100);
console.log(tsAssign);
//RETURN TYPES....
// 1) Başlangıç
let createNewAssing3 = (title, points) => {
    return { title, points };
};
// 2) Fonksiyonu değiştiriyorsun (ör. yeni alan ekledin)
createNewAssing3 = (title, points) => {
    return { title, points, passed: points >= 50 };
};
//tuples kullanmak faydali olabilir..
const assignArgs = ["Generics", 100];
const tsAssign2 = createNewAssing2(...assignArgs);
console.log(tsAssign2);
// AssignParams -> [title: string, points: number]
//Bu sayede argümanları tek paket (tuple) olarak tutup kullanabilirsin:
const assignArgs2 = ["Generics", 100];
const tsAssign3 = createNewAssing2(...assignArgs2);
//return type Promise and it is going to have an array of users
const fetchUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => {
        return res.json();
    }).catch(err => {
        if (err instanceof Error)
            console.log(err.message);
    });
    return data;
});
//Awaited ile sardigmizda artik type FetchUsersReturnType2 = User[] oluyor
fetchUsers().then(users => console.log(users));
export {};
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

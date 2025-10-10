//properties and methdos called members in class
class Coder {
    //name:string="";//Eger initial deger atarsak sorun olmaz..ama atamazsak o zaman constructor icinde kullnamamiz gerekihyor cunku orda disardasn deger atanacagini taahhut ediyoruz..
    /*
    Property 'name' has no initializer and is not definitely assigned in the constructor.ts(2564)
    constructor da tanimlamadan degiskeni gelip de direk tanimlayamazsin
    */
    constructor(name) {
        this.name = name;
    }
}
/*
Bu hata strictPropertyInitialization kuralından geliyor. TypeScript, sınıf alanlarının tüm oluşturma yollarında (constructor dâhil) kesin olarak atanmış olmasını ister.
*/
//hem alanı ilan eder hem atar..bu yeni kullanim...
class Coder1 {
    constructor(name) {
        this.name = name;
    }
}
class Coder2 {
}
class Coder3 {
}
//strictPropertyInitialization kurali aktif edildiginden dolayi, TypeScript, sınıf alanlarının tüm oluşturma yollarında (constructor dâhil) kesin olarak atanmış olmasını ister.
class MyCoder {
    constructor(name, music, age, lang) {
        this.name = name;
        this.music = music;
        this.age = age;
        this.lang = lang;
    }
}
//yerine asagidaki gibi de yapabilyoruz
class MyCoder2 {
    constructor(name, music, age, lang) {
        this.name = name;
        this.music = music;
        this.age = age;
        this.lang = lang;
        this.name = name;
        this.music = music;
        this.age = age;
        this.lang = lang;
    }
}
/*
1) “Constructor parametre özelliği” (parameter property) nedir?

Constructor’daki bir parametreyi public | private | protected | readonly ile işaretlersen, TypeScript otomatik olarak o isimde bir sınıf alanı tanımlar ve parametre değerini ona atar.
Bu nedenle içeride tekrar this.name = name yazmana gerek yok.
*/
class MyCoder3 {
    constructor(name, music, age, lang = "Typescript" //optional..protected ile diyoruz ki, lang a hem bu icinde bulundug class tarafindan erisilebilir hem de derived-classes, yani inherit edilen class lardan da erisilebilir
    ) {
        this.name = name;
        this.music = music;
        this.age = age;
        this.lang = lang;
    }
    getAge() {
        console.log(`Hey, my age is ${this.age}`);
    }
}
class WebDev extends MyCoder3 {
    constructor(computer, name, music, age) {
        super(name, music, age); //Her zaman icin ilk once super tanimlanmalidir
        this.computer = computer;
        this.computer = computer; //
    }
    getLang() {
        return `i write ${this.lang}`;
    }
    getAge() {
        //return `MY age is ${this.age}`;//Iste burdan da erisemiyoruz age e, cunku private...burasi subclass ici
    }
}
const Sara = new WebDev('Mac', 'Sara', 'Lofi', 25);
console.log(Sara.getLang()); //Burda lang a biz WebDev icinden erisebildik...
console.log(Sara.name);
//console.log(Sara.age);//it is private it can be accessed just by itself..baseclass
//console.log(Sara.lang);//protected, you can not acces from outside, just inside of the subclasses and base class
//lang a gidip de WebDev subclass i icinden erisebiliriz
//console.log(Sara.music);//music was public...no problem to acces from outside
// Aşağıdakinin kısaltmasıdır:
class MyCoder3_Long {
    constructor(name, music, age, lang) {
        this.name = name;
        this.music = music;
        this.age = age;
        this.lang = lang;
    }
}
const coder = new MyCoder3("Adem", "Pop", 38);
class SeniorCoder extends MyCoder3 {
    upgradeLang(newLang, age) {
        //  protected alan: alt sınıftan değiştirilebilir
        this.lang = newLang;
        // this.age = age;//age private burda yapamiyrsun...
    }
}
const s = new SeniorCoder("Ada", "jazz", 30);
//s.name = "";//atama yapamazsin readonly
console.log(s.name); //ama sadece okuyabilirsin
s.music = "slow"; //public ve disardan erisilebilr ve degistirilebilir 
class Guitarist {
    // parametre özelliği: alanları otomatik tanımlar + atar
    // name: string;
    // instrument: string;
    play(action) {
        return `${this.name} the ${action} ${this.instrument}`;
    }
    constructor(name, instrument) {
        this.name = name;
        this.instrument = instrument;
    }
}
const Page = new Guitarist("Jimmy", "guitar");
console.log(Page.play('strums'));
/*
implements = sınıfın, verilen arayüzün (interface) “kamuya açık şekline” uyacağına dair derleyiciye verdiğin söz. Runtime’da hiçbir şey değişmez; sadece derleme zamanı kontrolüdür (JS çıktısında iz bırakmaz).
Guitarist, en az Musician’daki üyeleri public olarak sağlamak zorundadır.
Ekstra alan/metot ekleyebilirsin; sorun olmaz.
Uymuyorsa derleme hatası alırsın:
class Bad implements Musician {
  constructor(private name: string, public instrument: string) {}
  //         ^^^^^^^ ERROR: interface'teki 'name' public olmalı

  play(action: string) { return ""; }
}
implements ne DEĞİLDİR?
Kalıtım (miras) değildir. extends kod/devranış alır; implements sadece şekil (imza) kontrolüdür.
Runtime kontrol değildir. Çalışırken instanceof Musician gibi bir şey yapamazsın; interface JS’te yoktur.

Neden faydalı?

Tür sözleşmesi: Bu sınıftan üretilen nesnelerle Musician bekleyen fonksiyonlar güvenle çalışır.

Erken hata: Eksik/yanlış imza hemen yakalanır.

k notlar

Sınıf birden çok interface’i implement edebilir:
class Multi implements A, B, C { ... }

implements hem interface hem de object-tipli type alias için çalışır (union olamaz).

Interface, instance tarafını temsil eder. Static/constructor tarafını denetlemek istersen ayrı bir tip yazıp sınıfın kendisine uygularsın:

Özet: Interface tip tanımıdır; implements ise “bu sınıfın örnekleri o tipe uyacak” garantisidir. JS’e hiçbir ek yük bindirmez, ama tasarım hatalarını derleme anında yakalar.

*/
//Static members of a class with typescript
class Peeps {
    static getCount() {
        return Peeps.count;
        //Dikkat this yerine class ismi kullaniliyor
    }
    constructor(name) {
        this.name = name;
        this.name = name;
        this.id = ++Peeps.count; //soluna + yazdigmz icin hemn bu satirda increate gerceklesecek, ama ++ sagda olsa idi o zaman bir alt satirdan itibaren Peeps.count artacakti..doloayisi ile ilk id ++ lari soluna yazdimgz zaman 1 olur, sagina yazdigmzda ise 0 olurdu 
        console.log("count:", Peeps.count);
        //Her yeni instance olustugunda count 1 artar...
    }
}
//Static members
//count doesn't apply to any instantiation of the class, it applies to the class directly itself
//Yani count i biz class icinde takip edecegiz, class tan olusan objeler veya instance ler uzerinden degil...
//This bu class a ait o anda olusturulmus olan instance veya obje yi temsil eder ancak, Peeps class ismini verirse o direk class in kendisini temsil eder ondan dolayi, biz getCount icerisinde this.count yerine Peeps.count dedik
Peeps.count = 0;
//Bu sayede biz, bizim class imiz uzerinden olusturulmus olan instanceleri sayabiliriz...harika bir ozellik bu
let peep1 = new Peeps("Adem");
console.log(peep1.id); //1
let peep2 = new Peeps("Zehra");
console.log(peep2.id); //2
let peep3 = new Peeps("Zeynep");
console.log(peep3.id); //3
let peep4 = new Peeps("Mehmet");
console.log(peep4.id); //4
//GETTER AND SETTERS 
class Bands {
    constructor() {
        this.dataState = [];
    }
    //Bu sadece readonly dir..ve get
    //(getter) Bands.data: string[] typescript bu sekilde tnaimliyor..mouse ile uzerine gittimgzde
    get data() {
        return this.dataState;
    }
    //Setters can not return a value, empty retunr is ok but not return a value-mouse ile uzerine gittimgzde
    //(setter) Bands.data: string[] typescript bu sekilde tanimliyor setter i ondan dolai
    set data(value) {
        //Array ise ve icindeki her bir element strin ise o zaman set yap
        if (Array.isArray(value) && value.every(el => typeof el === 'string')) {
            this.dataState = this.dataState = value;
            return;
        }
        else {
            throw new Error('Param is not an array of strings');
        }
    }
}
const MyBands = new Bands();
MyBands.data = ['Neil Young', 'Led Zep']; //setter
console.log(MyBands.data); //getter...
MyBands.data = [...MyBands.data, 'ZZ Top'];
console.log(MyBands.data); //getter...
//MyBands.data = 'Van Halen';//string i atamaya calisinca typescript hata verecek
MyBands.data = ['Van Halen', 6]; //Yine typescript hata verecek
export {};
//Uncaught Error: Param is not an array of strings at set data (main.js:200:19)

let username = 'Adem';
console.log(username);

let a:number =12;
let b:string = '6';
let c:number = 5;

console.log(a / Number(b));
//cunku stringi number a cevirir.. type coercion...
//con enteresan bir sekilde sonuc 2 geliyor
console.log(c * Number(b));
//Tabi bircok compile hatasi alacagiz...typescript bunlari dogru bulmaz ama jscriptte boyle bir yapi var.... 
//Ki zaten amacimz da bizim javscriptte bir compile time ekleyerek compile time hatlarini gormek...ama kod calismaya calisir

/*
typescript bu kodu jscripte soyle cevirir:
var username = 'Adem';
console.log(username);
Cunku tum browserlarda competible..olsun tum browserlarda calissin diye
Hem ts hem de js acikken username in alti cizili warning aliyoruz main.ts de:Cannot redeclare block-scoped variable 'username'.Cunku her iki dosyada acik ve bizim let ile tanimladigmz username bir de .js de var ile tanimlanmis..main.js i kapatirsak hata kaybolacaktir

Sorunun asil nedeni

TypeScript dil servisi aynı “proje kapsamı” içinde duran tüm .ts ve .js dosyalarını birlikte analiz eder.
Sen hem main.ts’te global alanda let username = ... diyorsun, hem de derlenmiş main.js (global) içinde aynı isim tekrar tanımlanmış oluyor (genelde var username = ...). Bu iki global tanım çakıştığı için VS Code/TS şu uyarıyı verir:

Cannot redeclare block-scoped variable 'username'.

Not: Dosyayı “açık/kapalı” tutman sorunu kökten çözmez; asıl mesele aynı kapsamta iki global tanımın bulunmasıdır.

Neden var oldu?

tsc’nin target değeri ES5/ES3 ise, TS derleyicisi let’i geniş tarayıcı uyumluluğu için var’a çevirir.
"target": "ES2015" (veya daha yeni) yaparsan let korunur.

TS string değerini değiştirmez (Zehra → Adem gibi bir dönüşüm olmaz). Bu sadece örnek metin karışıklığıdır.

Kalıcı çözümler (birini veya birkaçını uygulayabilirsin)
1) Derlenmiş JS’i ayrı klasöre koy ve projeden hariç tut (önerilen)

Klasör yapısı:
src/main.ts  ->  dist/main.js

tsconfig.json örneği:

{
  "compilerOptions": {
    "target": "ES2018",
    "module": "ESNext",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "allowJs": false,
    "checkJs": false
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}

npx tsc


2) Dosyayı modül haline getir (global yerine module scope)

Globalde değil de modül kapsamı içinde olursan çakışma riski düşer:

En üste boş bir export ekle:

export {};
let username = 'Zehra';
Bu dosyayı “module” yapar; username artık global değil, modül içinde kalır.

Alternatif: type="module" ile ESM kullanıyor ve her dosyayı modül gibi kurguluyorsan da global kirliliği engellersin.

*/
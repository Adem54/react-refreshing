
import { useState, useEffect, useCallback, type MouseEvent, type KeyboardEvent, useMemo, useRef } from 'react';
import './App.css'

//React hooks

interface User {
  id:number,
  username:string,
} 

function App() 
{
 // const[user,setUser] = useState<User[] | null>({} as User[]/*{} as Array<User> */);
  //Bu sekilde de hizli bir type atamasi yapabiliriz ama bunu mumkun oldugunca boyle yapmak yerine ayri bir ayri bir sekilde type ini tanimalyarak yapmamiz daha iyi olabilir
  const[users,setUsers] = useState<User[] | null>(null);
  const [count,setCount]  = useState<number>(0);
  
  useEffect(()=>{
    console.log("mounting");
    console.log("Users: ",users);
    //strict mode da, mount, unmount and remount..so we will see the console.log twice
    return ()=>console.log("unmounting");
    //cleanup func, and with this we will see the cnsole.log once. 
    //cleanup func component ekrandan kaldirildiginda calisir
  },[users])//dependency array..
  //array icersine ornegin user i koyarsak user degisir degismez, useEffect tetiklenecektir
  //Bu useEffect, component ilk yüklendiğinde "mounting" yazar, component ekrandan kaldırılırken "unmounting" yazar. React Strict Mode açıkken geliştirme ortamında mount–unmount–yeniden mount simüle edildiği için, mounting log’unu iki kez görürsün, cleanup fonksiyonundan gelen unmounting log’unu ise bir kez görürsün.

  //const addTwo = useCallback((e:any):void => setCount(prev=>prev+1),[])
  const addTwo = useCallback((e:MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>):void => setCount(prev=>prev+1),[])
//Kullanici mouse a tiklayarak veya entera basarak tetkikleyebilir ve MouseEvent,KeyboardEvent bunlar reacttan geliyor
//e paramtresi react 18 den sonra implicityly olarak any verildig icin alti cizili gelir  yine de

//useMemo reacttan gelir ve bunu cok pahali calculation lar icin kullaniriz, yani calculate islemi belli bir sure alan islemler icin ozellikle
type fibFunc = (n:number)=>number;

const fib:fibFunc = (n)=>{
  if(n<2)return n;
  return fib(n-1) + fib(n-2)
}//This is expensive calc

const myNum:number = 38;

const result = useMemo<number>(()=>fib(myNum),[myNum]);
//This is depend on myNum ,so it means,when myNum change useMemo is being triggered..and recalculate the result
/*
Bu component her render olduğunda React şuna bakar:
myNum değişti mi?
✅ Değiştiyse → fib(myNum) yeniden hesaplanır, result güncellenir.
❌ Değişmediyse → Eski hesaplanmış result cache’ten kullanılır, fib tekrar çağrılmaz

useMemo → hesaplanmış sonucu saklar
useCallback → fonksiyon referansını saklar
*/
/*
Hook’lar sadece React function component’lerin veya custom hook’ların en üst seviyesinde çağrılabilir.
Normal fonksiyonların içinde (ör: fib, helper function, if, for, map içinde) useState, useEffect, useMemo, useCallback KULLANAMAZSIN.
*/

const inputRef = useRef<HTMLInputElement>(null);//nonnull guard da yapabiliriz..null! gibi
//if(!inputRef.current) ile kullanaiblirz
//Veya optionalChain ile de yapbiriz
console.log(inputRef?.current);//Burda inputRef objesi null olabilme durumundan dolayi typescrpt sikayet eder bu sikayeti optionalchain ile halledebilriz
console.log(inputRef?.current?.value);//input elementinin valuesidir burasi
//Simdi useRef attributunde ref={inputRef} bulunan input jsx elemenitnin referansini alir asagidaki bu compnent icinde bulunan input
//Ayrica inputRef.current.value sini degisitirmek componenti rerender etmeyecektir, cunku bu input elementi ne ekleyecegimz onclick veya oninput 
/*
Neden console.da input jsx elementi birden fazla kez gelior cunku:React 18’de StrictMode şunu yapar:
Component’i bilerek iki kere render eder (sadece dev ortamda)
İlk render → normal
İkinci render → side-effect var mı test amaçlı
Böylece:
console.log’lar 2 kere görünür
useEffect mount/unmount simüle edilir
*/
  return (
    <div className="App">
      <h1>{count}</h1>
      <h2>{result}</h2>
      <button onClick={addTwo}>Add</button>
      <input ref={inputRef}/>
    </div>
  )
}
export default App

//onclick iceriisndeki ()=>setCount(prev=>prev+1) bu fonksion her seferinden yeniden uretiliyor
//Bu fonksihyonu al isimlendir ve  usecallback icerisine sarilirsa then it will be memoized and that can be handy
/*
usecallback ve ()=>setCount(prev=>prev+1)
Önemli ayrım: “Render” vs “Tıklama”

Her render’da → () => setCount(prev => prev + 1) YENİ bir fonksiyon oluşur.
Her tıklamada → O anda onClick’e bağlı olan fonksiyon çalıştırılır, ama tıklama sırasında “yeni fonksiyon üretilmez”.

Yani:
✅ Yeniden üretilme = her render
✅ Çalıştırılma = her tıklama
“Her seferinde yeniden üretiliyor” derken kast edilen:
➡️ Component her yeniden render olduğunda, bu arrow function yeniden oluşturuluyor.

Neden yeniden oluşturuluyor?
Çünkü React’te render fonksiyonu (component) her çalıştığında:
return (
  <button onClick={() => setCount(prev => prev + 1)}>Add</button>
)
içindeki her şey yeniden oluşturulur:
JSX tekrar oluşturulur
Inline fonksiyonlar (() => ...) tekrar oluşturulur
Yani bu fonksiyon, normal bir değişken gibi her render’da “yeniden tanımlanmış” olur.
JavaScript bunu şöyle görür gibi düşünebilirsin:
function App() {
  // render başlar...
  const handleClick = () => setCount(prev => prev + 1); // her render'da yeni
  return <button onClick={handleClick}>Add</button>;
}
Peki ne tetikleyince render oluyor?

Şunlar olunca component yeniden render olur:

setCount(...) çağrılınca
Parent component yeniden render olunca
Props değişince
Bazı context/state değişikliklerinde
Her böyle durumda:
➡️ App component’i yeniden çalışır
➡️ JSX tekrar üretilir
➡️ () => setCount(prev => prev + 1) fonksiyonunun yeni bir kopyası oluşur.
useCallback ne yapıyor burada?
Şu şekilde yazarsan:
const handleClick = useCallback(() => {
  setCount(prev => prev + 1);
}, []); // veya uygun dependency
return (
  <button onClick={handleClick}>Add</button>
);
Bu sefer:

handleClick fonksiyonunun referansı render’lar arasında aynı kalır

Yani React her seferinde yeni bir fonksiyon objesi oluşturmaz

Bu niye önemli olabilir?
Bu fonksiyonu child componentlere prop olarak geçiyorsan ve onlar React.memo kullanıyorsa,
her render’da yeni fonksiyon → prop değişti → child yeniden render olur.
useCallback ile bu değişimi engelleyip gereksiz render’ları azaltabilirsin.
Senin örneğinde:
Buton doğrudan aynı component içinde
Çok basit bir uygulama
➡️ Performans farkı hissedilmez, useCallback şart değil.

*/



  /*
  Cleanup in useEffect:return ()=>console.log("unmounting");
Bu kısım bir cleanup (temizlik) fonksiyonu.
Component ekrandan kaldırıldığında (unmount) çalışır.
Yani component yok edilirken console.log("unmounting"); yazdırır.

  useEffect bir side-effect (yan etki) yönetimi hook’udur.
Yani:
Icerisinde bulundugu compnent icerisindeki bazi useState vs lerin degismesine gore dinamik olarak tetikenir vs yani dirk disardaki degiskenleri etiklemek vs icin

API çağrısı yapmak
localStorage okumk
event listener eklemek
component mount olduğunda bir şey çalıştırmak
gibi işleri yapmak için kullanılır.
useEffect bir değer döndürmez, o yüzden TypeScript açısından genelde özel bir type belirtmene gerek yoktur.
(TypeScript sadece bir şey return ediyorsan devreye girer.)
Ayrıca useLayoutEffect de aynı yapıdadır → bu yüzden TypeScript açısından yine ekstra bir şey yapmana gerek yoktur.

Bu açıklamanın dediği kısaca şu:

“useEffect bir değer döndürmediği için TypeScript’te özel bir type belirtmene gerek yok. Hem useEffect hem de useLayoutEffect side-effect çalıştırır ve component mount olduğunda çalışırlar.”
  */
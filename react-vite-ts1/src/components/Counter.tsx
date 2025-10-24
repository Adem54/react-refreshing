import { useState, type ReactEventHandler } from "react";

const Counter = () => {
	const [count,setCount] = useState<number>(1);
	//Bazen null da olabilmesini istyebiliriz...boyle durumlar icin union type kullaniriz:const [count,setCount] = useState<number | null>(null); Bu arada zaten biz direk olarak value ye 1 atayinca o inferred olacak yani zatenn type i nummber oldugunun cikariminda bulunacak typescript kendisi...

const handleIncrease = (e:React.ChangeEvent<HTMLButtonElement>)=>
{
	//e.currentTarget button u temsil ediyor
	//console.log("event-target: ",e.target.name)
	console.log("event-target: ",e.currentTarget.name)
	//e.target yerine e.currentTarget kullanmak daha güvenli; TypeScript name gibi buton özelliklerini doğru tanır.
	//e.target: O tıklamada ilk hedef olan gerçek DOM düğümüdür (çoğu zaman en içteki çocuk).
	//e.currentTarget: O an çalışmakta olan listener’ın bağlı olduğu elemandır (handler’ı nereye yazdıysan orası).
	/*
	e.target’ın tipi EventTarget (çok genel) olduğu için .name, .value, .checked gibi özellikleri yok sayılır.
	e.currentTarget ise generic ile doğru tür (ör. HTMLButtonElement) olarak gelir; bu yüzden e.currentTarget.name TypeScript’te doğrudan çalışır.
	e.target: EventTarget (çok genel) → .name bilinmez
		e.currentTarget: HTMLButtonElement → .name var
		*/
	setCount(prev=>prev+1);
}

const handleDecrease = ()=>
{
	setCount(prev=>prev-1);
}

  return (
	 <div>
		    
		<button name="test!!" onClick={(e)=>handleIncrease(e)}>Increase</button>
		<button onClick={()=>setCount(count+1)}>Increase2</button>
		<button onClick={handleDecrease}>Decrease</button>
		<button onClick={()=>setCount(count-1)}>Decrease2</button>
		<br />
		<h2>{count}</h2>
	 </div>
  )
}

export default Counter
/*
Tek bir tıklama var ve bu tıklamanın hedefi (target) yalnızca en içte tıklanan düğümdür (ör. <svg>).
Sonra olay, fazlara göre yolculuk eder ve parent’ların dinleyicileri de çalışabilir. Yani bir olay → bir target, ama birden çok dinleyici tetiklenebilir.

event.target: Hep ilk hedef (örn. <svg>).

event.currentTarget: O an çalışan dinleyicinin bağlı olduğu eleman (örn. <button>’daki handler çalışırken currentTarget === button).

Neden target ile currentTarget farklı?

target hep aynı kalır: en içte tıklanan düğüm.

Olay parent’lara doğru giderken her parent’taki dinleyici çalıştığında, currentTarget o parent olur. Bu yüzden buton özelliklerini (ör. name) güvenle okumak için currentTarget kullanırız.

Sıralamayı/akışı nasıl etkileriz?
a) Capturing mi, Bubbling mi dinleyelim?

Native DOM: addEventListener('click', handler, { capture: true }) ile capturing fazında dinlersin.

React:

Bubbling (varsayılan): onClick={...}

Capturing: onClickCapture={...}

Capturing handler’lar bubble handler’lardan önce çalışır.

b) Yayılımı durdurmak

event.stopPropagation(): Olayın daha ileri yayılmasını durdurur (o fazda bir üst/alt elemana geçmez).

event.stopImmediatePropagation() (native): Aynı elemana bağlı diğer dinleyicilerin de çalışmasını engeller.

React’ta e.stopPropagation() SyntheticEvent üzerinden çalışır; çoğu senaryoda yeterlidir. Nadir durumlarda native’e inmen gerekirse: e.nativeEvent.stopImmediatePropagation().

c) Varsayılan davranışı engellemek

event.preventDefault(): Varsayılan aksiyonu iptal eder (örn. <a> linkinin sayfa değiştirmesi).
*/
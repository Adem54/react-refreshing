import { useState, useReducer } from "react"

type State = {
  count: number;
};

type Action = 
	{ type: "increment" }
  | { type: "decrement" }
  | { type: "reset"; payload?: number }; // opsiyonel payload

  //Aslinda mantik basit acctiona a gore state nasil degisecek..actionlarimiz type i olmasi laziim ki biz swtich-case icersidne action imizin type ina gore hangi opearsyonu uygylayacaigmzi bilirz
  //Sonra state,dispatch useRedicer ile ve useReducer parametreye counterReducer ve devaminda

  function counterReducer(state: State, action: Action): State 
  {
		switch (action.type) 
		{
			case "increment":
				return { count: state.count + 1 };
			case "decrement":
				return { count: state.count - 1 };
			case "reset":
				return { count: action.payload ?? 0 };
			default:
				return state; // TS için default
	}
}

function Counter2() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  /*
 useReducer React’in bir hook’u.
Ona 2 şey veriyorsun:
counterReducer → “state nasıl güncellenecek?” mantığını anlatan fonksiyon
{ count: 0 } → başlangıç state’i
Dönüş değeri:
state → o anki state nesnesi (ilk başta { count: 0 })
dispatch → state’i değiştirmek için çağırdığın fonksiyon
Yani:
useState sana [value, setValue] veriyordu
useReducer sana [state, dispatch] veriyor 

Sağ taraf (useReducer(...)) önce çalışır
Sonuç (örneğin [{ count: 0 }, function dispatch(){...}]) gelir
Sol tarafta [state, dispatch] ile isim verirsin

Yani state:
useReducer’a parametre olarak verdiğin bir şey değil
useReducer’dan geri dönen şeyin adı

PEKI DISPATCHH NASIL CALISIR:
state parametresini → React veriyor (şu anki state)
action parametresini → sen dispatch(...) ile veriyorsun
counterReducer’ı doğrudan sen çağırmıyorsun, React senin yerine çağırıyor

“Sen bana reducer fonksiyonu ver, ben de her dispatch’te
reducer(currentState, action) çağıracağım.”

  */

  return (
    <div>
      <h1>{state.count}</h1>
      <button onClick={() => dispatch({ type: "decrement" })}>-1</button>
      <button onClick={() => dispatch({ type: "increment" })}>+1</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
}

export default Counter2

/*
useReducer NEDİR, NEYİN ALTERNATİFİ?
useReducer, karmaşık veya birbirine bağlı state’leri yönetmek için useState’e bir alternatif hook’tur.
Mantık olarak Redux’in küçük, component içi versiyonu gibi düşünebilirsin.

useState genelde şunlar için süper:
Basit sayılar (count),
Birkaç alanlı, çok karışık olmayan stateler,
Formun tek alanı vs.
Ama state:
Birden fazla alan içeriyorsa (ör: { count, loading, error })
Alanlar birbiriyle ilişkiliyse
Bir sürü setState çağrısı ile oradan oraya gidiyorsan
işte burada useReducer daha okunabilir ve güvenli hale getirir.

Ayrıca:

Tüm state değişikliklerini tek bir yerde (reducer) toplarsın
Hangi action ne yapıyor → çok net olur
Test etmesi kolaydır
Debug etmesi kolaydır
*/

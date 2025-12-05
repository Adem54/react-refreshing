import { useReducer, useState, type ChangeEvent, type ReactNode } from "react"

/*
This syntax is not allowed when 'erasableSyntaxOnly' is enabled.ts(1294..hatayi ALIYORUM VE REDUCER_ACTION_TYPE ATLTI CIZIILI GELIYOR
bu hata yeni TypeScript ayarlarıyla alakalı 👍
Sorun senin yazdığın kodda değil, projendeki TypeScript derleyici ayarında.
Çünkü projenin tsconfig.json içinde (veya kullandığın tool’un default ayarında) "erasableSyntaxOnly": true (veya benzeri) açılmış.
“Sadece derlemede tamamen silinebilen (sadece type olan) TypeScript özelliklerini kullanabilirsin.
Runtime’da JS kodu üreten özellikler yasak.”
enum ve const enum runtime’da gerçek JS kodu üreten yapılar.
Bu yüzden erasableSyntaxOnly açıkken enum kullanmak yasak → TS1294 hatası. 
TypeScript
*/
const initState = { count:0, text:''};
const enum REDUCER_ACTION_TYPE {
	INCREMENT,//bunu INCREMENT:'INCREMENT' SEKLINDE YAPMAYI DA TERCIH EDENLER VAR
	DECREMENT,
	NEW_INPUT,
}

//burasi, type direk olarak event func a paramtre olarak verilecek alandir...yani type degeri zaten verilmelidir ama onun disinda ornegin input icinde o anda girilen value o input jsx-elementinin icerisinde event araciligi ile verilecegi icin burda payload olmalidir ki o currentValue degerini bu payloada atayalim ve bu payload a atadigz zaman bu deger, i biz zaten reducer fonks da text e atamistik...state in text i girilen degeri almis olacak...

type ReducerAction = {
	type:REDUCER_ACTION_TYPE,
	payload?:string,//increment, decrementte payload olmasina gerek yok ondan dolayi optional yapariz
}

const reducer = (state:typeof initState, action:ReducerAction ):(typeof initState)=>
{
	switch (action.type) {
		case REDUCER_ACTION_TYPE.INCREMENT:
			return {...state, count:state.count+1};

		case REDUCER_ACTION_TYPE.DECREMENT:
			return {...state, count:state.count-1};

		case REDUCER_ACTION_TYPE.NEW_INPUT:
			return {...state, text:action.payload ?? ''};
			//Burda optionalchain yaptimgiz icin undefined olma durumu da var ondan dolayi sorun cikarir...
			//Bu sorunu text:action.payload text:action.payload ?? '' bu sekilde cozriz..
		default:
			return state;
			//throw new Error();
	}
}

type ChildrenType = {
	children:(num:number)=>ReactNode
}

const Counter = ({children}:ChildrenType) => 
{
	//const [count,setCount] = useState<number>(1);
	const [state,dispatch] = useReducer(reducer,initState);

	const increment = ()=>dispatch({type:REDUCER_ACTION_TYPE.INCREMENT})
	const decrement = ()=>dispatch({type:REDUCER_ACTION_TYPE.DECREMENT})

	//
	const handleTextInput = (e:ChangeEvent<HTMLInputElement>)=>
	{
		//currentTarget kullanilmasi daha dogrudur her ne kadar target da kullanilabliyor olsada...currentTarget her zaman event func in kullanildigi elemnti isaret eder, target ise en 
		//CurrentTarget:This is the element that the event handler function is bound to.
		dispatch({type:REDUCER_ACTION_TYPE.NEW_INPUT, payload:e.currentTarget.value})
	}
  return (
	 <>
	 <h1>{children(state.count)}</h1>
	 <h2>{state.text}</h2>
	 <div>
		<button onClick={increment}>+1</button>
		<button onClick={decrement}>-1</button>
		<input onChange={handleTextInput}/>
	 </div>
		
	 </>
  )
}

export default Counter

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

/*

function App() {
  const handleClick = (event) => {
    console.log('Target:', event.target.tagName);
    console.log('Current Target:', event.currentTarget.tagName);
  };

  return (
    <div onClick={handleClick} style={{ padding: '20px', border: '1px solid black' }}>
      {/* Event handler is attached here (the currentTarget) }
      <p>
        Click the **<button>Button</button>** inside.
      </p>
    </div>
  );
}


If you click the <p> text "Click the Button inside.":
event.target is <p>.
event.currentTarget is <div>.
If you click the <button> "Button":
event.target is <button>.
event.currentTarget is <div>. 

In both cases, the handler attached to the <div> is triggered due to event bubbling, but the target property accurately reflects the exact element the user clicked. 
*/

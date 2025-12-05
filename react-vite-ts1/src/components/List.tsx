import { type ReactNode } from 'react';
//typescript de type ile kullanirzi ama javscriptte direk ReactNode diye kullaniriz... 
//ReactNode u biz ne icin kullaniyorduk, children in type ni vermek icin hatirlayalim
//    "verbatimModuleSyntax": true, oldugundan dolayi sadece type olarak kabul ediyor typesciptten gelen seyleri cunku runtimeda kullanilmiyor bu bir typescript ayaridir false yaparsak hata vermeden basina type yazmasak da ReactNode yi kabul edecektir
//Birde biz artik React tanimlamasi yerine ReactNode kullaniyoruz react18 den sonra unutmaylim

interface ListProps<T> {
	items:T[],
	render:(item:T)=>ReactNode//Bu herhangi bir react elementi donebilmesini sagladi..yani <div></div> gibi...paramtreye de array icindeki item i verdik ki react elemnti icinde o item i yazacak nerde yazacak, o propsu gonderidgi yerde cok farkli bir yaklasaim ilk defa gordum...COK IYI IMIS...
}
//BUNU BILELIM BU ONEMLI!<T> yazinca hata aliyourz ama  <T extends {}> yazinca veya <T,> yazinca hata ortadan kalkiyor cunku:TSX dosyasında (.tsx) ok işaretli generic fonksiyon şu şekilde yazılınca const List = <T>({ items, render }: ListProps<T>) => { ... }..TypeScript derleyicisi baştaki <T>’yi JSX etiketi sanıp parse ediyor. Bu da dosyanın geri kalanında zincirleme hatalara yol açıyor. <T extends {}> veya <T,> yazınca, derleyici bunun generic parametre olduğunu anlıyor ve hatalar kayboluyor.

const List = <T,>({items,render}:ListProps<T>) => {
  return (
		<ul>
			{items.map((item,index)=>(
				<li key={index}>
					{render(item)}</li>
			)) }
		</ul>
  )
}

export default List

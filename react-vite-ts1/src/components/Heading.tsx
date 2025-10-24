import type { ReactElement } from "react"

//rafce yazarak otomatik bir react fonks olusturabiliriz react-extesion snippet i sayesinde..
type HeadingProps = { title:string }

//Dikkat edelim return type i ReactElement yapiyoruz cunku asagida sadece bir react element return ediyor...
//Ama normalde tyepscript burayi JSX.Element tipi ile dondurur...inferred yapar kendisi ve biz eger boyle direk bir react elementi donersek ReactElemnt veririz yoksa birsey vermemize gerek yok typscript JSX.Element olarak tipi inferred ediyor..
const Heading = ({title}:HeadingProps):ReactElement => 
{
  return (
	 <h1>
		{title}
	 </h1>
  )
}

export default Heading

import { type ReactNode } from 'react'

//import React, { type ReactNode } from 'react' yerine import { type ReactNode } from 'react' olarak kullanilyor artik 
//React a gerek yok, children reactnode olarak davranacak
type SectionProps = {
	title?:string,
	children:ReactNode
}
//children i react18 de bu sekilde yazmamiza gerek kalmazdi ama react19 ile beraber artik children i da type ini ReactNode olarak belirmtemiz gerekiyor
//Ayrica react19 ile beraber const Section:React.FC<{title:string}>  bu sekilde bir type da vermiyoruz..
//title a default atama yaptik cunku, title typescript icerisinde optional olarak verildi
const Section = ({ children, title="My Subheading"}:SectionProps) => 
{
	  return (
				<>
					<section>{title}</section>
					<p>{children}</p>
				</>
  			)
		}

export default Section
//Section.defaultProps="Subheading defaultprops";
//Eskiden boyle default value atamasi yapardik, bu react 18.2 ile beraber deprecited oldu...artik kullanilmiyor onun yerine artik direk yukarda default value atamasi yaptik..
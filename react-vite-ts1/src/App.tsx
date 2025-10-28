import { useState } from "react";
import Counter from "./components/Counter"
import Heading from "./components/Heading"
import Section from "./components/Section"
import List from "./components/List";

//Count is {count} kismi <Counter></Counter> in children alanidir
//Her zaman dikkat  <Counter icinde gonderdigmz props karsi tarafta alinana kadar yani Counter icinde gidip te bu props u entegre edene kadar burda hata mesaji gosterir..
function App() {
  const [count, setCount] = useState<number>(0);
  return <>
  <Heading title={"HELLO"}/>
    {/*Simdi bruaya dikkat..Section icinden gelecek olan children props icinde kullanildigi icin <Section/> boyle olamaz ayni html tagi i gibi acilip kapanacak ve araya da bir children alacak sekilde olmasi gerekkiyor yani su sekilde..<Section></Section> ve bu section lar arasina herhangi birsey girene kadar da Section lar hata verecek alti cizilecektir... */}
   
    <Section title={"myTitle"}>This is my section</Section>
  <Counter setCount={setCount} count={count}>My Count is {count}</Counter>

  <List items={["Coffee", "Tacos", "Code"]} render={(item:string)=><span className="gold">{item}</span>} />
   
  </>
  
}

export default App


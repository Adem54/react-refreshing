import Counter from "./components/Counter"
import Heading from "./components/Heading"
import Section from "./components/Section"

function App() {

  return <>
  <Heading title={"HELLO"}/>
    {/*Simdi bruaya dikkat..Section icinden gelecek olan children props icinde kullanildigi icin <Section/> boyle olamaz ayni html tagi i gibi acilip kapanacak ve araya da bir children alacak sekilde olmasi gerekkiyor yani su sekilde..<Section></Section> ve bu section lar arasina herhangi birsey girene kadar da Section lar hata verecek alti cizilecektir... */}
   
    <Section title={"myTitle"}>This is my section</Section>
  <Counter/>
  </>
  
}

export default App


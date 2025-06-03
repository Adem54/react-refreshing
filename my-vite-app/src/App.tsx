
import {  useState } from 'react';
import './App.css'
import Users from './components/Users';



export interface ProductType 
{
  id:number;
  title:string;
  description:string;
  isExist:boolean;
}

let cities:string[] = ["Skien","Porsgrunn","Larvik"];
const products:Array<ProductType> = 
[
  {id:1,title:"PC1", description:"Very nice PC1", isExist:true},
  {id:2,title:"PC2", description:"Very nice PC2", isExist:true},
  {id:3,title:"PC3", description:"Very nice PC3", isExist:true},
  {id:4,title:"PC4", description:"Very nice PC4", isExist:true},
  {id:5,title:"PC5", description:"Very nice PC5", isExist:true}
]


const App:React.FC = ()=>
{
  const [myProducts, setMyProducts] = useState<ProductType[]>(products);

  return (
    <>
     <h2>Hello React!</h2>
   
      <Users  products = {myProducts} />
    
    </>
  )
}

export default App

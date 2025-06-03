import React from 'react'
import type { ProductType } from '../App';
import User from './User';

interface UsersProp 
{

}
const Users:React.FC<any> = (props:any) => 
{
    console.log("props: ", props);
    let { products } = props;
  return (
    <div>
       <ul>
        {products.length &&  products.map((product:ProductType, index:number)=>
          {
            return   <User key={product.id} {...product}/>

          }
        )}
       </ul>
    </div>
  )
}

export default Users

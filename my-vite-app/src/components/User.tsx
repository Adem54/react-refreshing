
import React from 'react'
import type { ProductType } from '../App';



// const User:React.FC<ProductType> = ({id, title, description, isExist}) => {
const User = ({id, title, description, isExist}:ProductType) => {
  return (
    <div>
        <li key={id}>{title} {description}</li>
    </div>
  )
}

export default User

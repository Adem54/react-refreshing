import React from 'react'


type PropsType = {
    id:number;
    title:string;
    description:string;
    isExist:boolean;
}

const MyUser:React.FC<PropsType> = ({id,title,description,isExist}) => {
  return (
    <div>
      <h2>{title}</h2>
    </div>
  )
}

export default MyUser

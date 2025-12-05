import Counter from './Counter'
import Counter2 from './Counter2'
import LoginForm from './LoginForm'

function App() {
  return (
    <>
    <Counter>{(num:number)=><>Current Count:{num}</>}</Counter>
     {/*Dikkat edelim...direk childrendaki reactnode(yani jsx elementi return eden bir methodu children props olarak gonderiyrouz) */}
     {/* <Counter2/> */}
     <LoginForm/>
    </>
  )
}

export default App

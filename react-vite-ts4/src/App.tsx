import React from "react";
import Header from "./components/layout/Header";
import CounterDisplay from "./components/counter/CounterDisplay";
import CounterControls from "./components/counter/CounterControls";
import { ThemeProvider } from "./context/ThemeContext";
import { CounterProvider } from "./context/CounterContext";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <CounterProvider>
        <div style={{ padding: "1rem" }}>
          <Header />
          <CounterDisplay />
          <CounterControls />
        </div>
      </CounterProvider>
    </ThemeProvider>
  );
};



export default App

/*
useContext NEDİR, NE İŞE YARAR?
Kısaca:
useContext, prop drilling (her seviyeye props geçmek) yapmadan,
veriyi component ağacının yukarısından aşağıya kolayca paylaşmak için kullanılır.
Örneğin:

tema (dark/light)
auth bilgisi (user, token)
dil ayarı (locale)
global ayarlar
sepet durumu vb.

User bilgisini UserMenu’ye taşımak için her komponentten props geçirmek gerekir.
useContext ile:
En üstte “UserContext” verirsin
Ağaçtaki istediğin component useContext ile direkt çeker.
*/
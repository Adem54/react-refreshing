import React, { createContext, useContext, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Context oluşturuluyor
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider komponenti
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  const value: ThemeContextType = { theme, toggleTheme };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
  //Bu ThemeProvider in children i pozisyonunda kullanilan tum compnentler useContext paramtresine createContext func return valuesini girerek, artikThemeContext i kullanabilirler...direk olarak...
};

// Custom hook
export const useTheme = (): ThemeContextType => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
};

/*
Dosya: ThemeContext.tsx
Provider: ThemeProvider
Hook: useTheme
*/

/*
1.“Bizim context’i kullanacağımız yerde bir kere ThemeProvider ile sarmamız gerekiyor, öyle mi?”
Evet.
useContext(ThemeContext) (veya useTheme()) kullanan her component, mutlaka o componentin yukarısında bir yerde:
<ThemeProvider>
  {/* buranın içindeki her şey useTheme kullanabilir }
</ThemeProvider>
ile sarilmis olmali

Örneğin:
// App.tsx
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/layout/Header";

const App = () => {
  return (
    <ThemeProvider>
      <Header /> {/* burada useTheme kullanmak serbest }
    </ThemeProvider>
  );
};

Header bileşeninin içinde useTheme() çağırabilmen, tamamen ThemeProvider’ın onu sarmasına bağlı.
Eğer ThemeProvider’ın DIŞINDA bir komponentte useTheme() çağırırsan → bizim yazdığımız şu hata çalışır:
if (!ctx) {
  throw new Error("useTheme must be used within a ThemeProvider");
}

useTheme tam olarak ne yapıyor? Neden böyle yazıyoruz?
Bu bir component değil, bir custom hook.

İç mantık:

useContext(ThemeContext) → context’in value’sunu alır.
Bu value, ThemeProvider içinde verdiğimiz value:
const value: ThemeContextType = { theme, toggleTheme };
<ThemeContext.Provider value={value}>

Eğer component ThemeProvider dışında ise, useContext(ThemeContext) undefined döner.
Biz de bu yüzden:
if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
diyerek güvenceye alıyoruz.
useTheme() = “ThemeContext içindeki theme ve toggleTheme’i bana ver” demek.

Aynı yerde 2 farklı context kullanmam gerekirse ne olur?

Diyelim ki:

ThemeContext (tema: light/dark)

CounterContext (global sayac)

İkisini de aynı komponent ağacında kullanmak istiyorsun.

const App = () => {
  return (
    <ThemeProvider>
      <CounterProvider>
        <Header />
        <CounterDisplay />
        <CounterControls />
      </CounterProvider>
    </ThemeProvider>
  );
};

Burada:

Header, CounterDisplay, CounterControls:

ThemeProvider içinde → useTheme kullanabilirler

CounterProvider içinde → useCounter kullanabilirler

Yani bu 3 componentte de hem useTheme() hem useCounter() çağırabilirsin.

🔹 Peki sıralama önemli mi?

Genel kural:

Context’ler birbirinden bağımsız ise:

ThemeProvider dışta, CounterProvider içte olsa da olur

Tam tersi de olur:
<CounterProvider>
  <ThemeProvider>
    <AppContents />
  </ThemeProvider>
</CounterProvider>

Yani sıralamanın işlevsel bir farkı yok.

Ama:

Eğer bir provider, diğer context’i kendi içinde kullanıyorsa (örneğin ThemeProvider içinde useCounter çağırıyorsan)

O zaman: CounterProvider daha dışta olmalı ki ThemeProvider onu kullanabilsin.

Genel pratik:

App seviyesinde:

en genel/global olanlar en dışa:

ör: <AuthProvider> → tüm app için

onun içine <ThemeProvider>

onun içine <CounterProvider>

Ama senin örneğinde Theme ve Counter bağımsız → sıralama fark etmez.

Kafaya kazınsın diye mini özet

ThemeProvider → context için “kapsayan alan” yaratır.

useTheme() → context’ten theme + toggleTheme almanın kolay yolu.

Context kullanmak istediğin component:

mutlaka ilgili Provider’ın içinde olmalı.

Bir component içinde:

const { theme, toggleTheme } = useTheme();


deyip, onclick, style, vs. istediğin yerde kullanırsın.

Aynı yerde 2–3 context kullanabilirsin:

<ThemeProvider>
  <CounterProvider>
    <SomeComponent /> {/* burada hem useTheme hem useCounter olur }
  </CounterProvider>
</ThemeProvider>


İstersen bir sonraki adımda:

Küçük bir component içinde aynı anda hem useTheme hem useCounter kullanalım,

Hem de bu component bir butonla hem theme’yi, hem count’u değiştirsin.
*/
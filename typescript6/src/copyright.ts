// const year = document.getElementById("year");
// const thisYear = new Date().getFullYear();
// year.setAttribute("datetime", thisYear);
// year.textContent = thisYear;

//my-solution-1

// const year = document.getElementById("year") as HTMLElement;
// const thisYear = new Date().getFullYear();

// year.setAttribute("datetime", thisYear.toString());
// year.textContent = thisYear.toString();

//my-solutino-2
// let year:HTMLElement | null;
// year = document.getElementById("year");
// let thisYear:string = new Date().getFullYear().toString();
// (year as HTMLElement).setAttribute("datetime", thisYear);
// (year as HTMLElement).textContent = thisYear;

//my-solutino-3
// const year = document.getElementById("year")!;
// const thisYear:string = new Date().getFullYear().toString();
// year.setAttribute("datetime", thisYear);
// year.textContent = thisYear;

//1st variation
// let year:HTMLElement | null;
// year = document.getElementById("year");
// let thisYear:string = new Date().getFullYear().toString();
// //Typeguard ile de yapabiliriz..
// if(year)
// {
// 	year.setAttribute("datetime", thisYear);
// 	year.textContent = thisYear;
// }
//Tips-TUYO:Boyle durumlarda ilk olarka git ve typescript hangi type olarka inferred ediyor ona bakilabilir...

//2.Variation
// const year = document.getElementById("year") as HTMLElement;
// const thisYear:string = new Date().getFullYear().toString();
// //Artik HTMLElement oldugunu soyledgimz icin if kontrolune gerek yok
// year.setAttribute("datetime", thisYear);
// year.textContent = thisYear;




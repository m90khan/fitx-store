import { createGlobalStyle } from 'styled-components';
const GlobalStyle = createGlobalStyle`

 
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}
:root {
  --blue: #FB2E86;
  --indigo: #6610f2;
  --purple: #6f42c1;
  --pink: #e83e8c;
  --red: #dc3545;
  --orange: #fd7e14;
  --yellow: #ffc107;
  --green: #28a745;
  --teal: #20c997;
  --cyan: #17a2b8;
  --white: #fff;
  --gray: #6c757d;
  --gray-dark: #343a40;
  --primary: #FB2E86 !important;
  --secondary: #6c757d;
  --success: #28a745;
  --info: #17a2b8;
  --warning: #ffc107;
  --danger: #dc3545;
  --light: #f8f9fa;
  --dark: #343a40;}

html {
  
  /* --red: #FB2E86; */
  --violet: #7E33E0;
  --blue: #2F1AC4;
  --text: #151875;
  --success:#19D16F;
  --white: #fff;
    --black: #101010;
    --grey: #3A3A3A;
    --gray: var(--grey);
    --lightGrey: #e1e1e1;
    --lightGray: var(--lightGrey);
    --offWhite: #ededed;
    --maxWidth: 1000px;
    --bs: 0 12px 24px 0 rgba(0,0,0,0.09);
  box-sizing: border-box;
  scroll-behavior: smooth;
  font-family: 'Poppins', sans-serif;

  font-size: 62.5%;  
 
  
  &::-webkit-scrollbar {
    width: 1rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color:  var(--red)
  }

  &::-webkit-scrollbar-track {
    background:  var(--black)
  }
 }
body{
      overflow-x: hidden; 
     -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; 
  padding: 0;
    margin: 0;
    font-size: 1.5rem;
    font-family: 'Poppins',-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}
button{
  font-family: 'Poppins',-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}
a {
  text-decoration: none;
  color: steelblue;  
}
 
ul,
li {
  margin: 0;
  padding: 0;
}
 

p {
  margin: 1rem 0;
}

 
::selection {
  background-color: var(--red) ;
  color: white;
}
 

 
`;

export default GlobalStyle;

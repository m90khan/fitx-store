import { createGlobalStyle } from 'styled-components';
const GlobalStyle = createGlobalStyle`

 
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  --red: #FB2E86;
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
.btn {
  display: inline-block;
  background: red;
  color: #fff;
  padding: 1rem 2rem;
  cursor: pointer;
  border: 0;
  border-radius: .5rem;
}

.btn:hover {
  opacity: 0.9;
}

.btn-secondary {
  font: inherit;
  font-size: 1.4rem;
  background: #000;
  color: #fff !important;
  border: 0;
  border-radius: .5rem;
  padding: .5rem 1.5rem;
  margin: 0 2rem;
  cursor: pointer;
}

.btn-secondary:hover {
  opacity: 0.8;
}

.btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-icon svg {
  margin-right: .5rem;
}
 


 
`;

export default GlobalStyle;

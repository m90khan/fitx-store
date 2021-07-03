import { createGlobalStyle } from 'styled-components';
const GlobalStyle = createGlobalStyle`

@tailwind base;
@tailwind components;
@tailwind utilities;

.carousel .thumb {
    border: none !important
}
 
`;

export default GlobalStyle;

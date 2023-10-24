import { createGlobalStyle } from 'styled-components';
import GameBoy from '../assets/fonts/GameBoy.ttf';
import Pretendard from '../assets/fonts/Pretendard-Regular.ttf';
import PretendardBold from '../assets/fonts/Pretendard-SemiBold.ttf';
import Tendata from '../assets/fonts/Tenada.ttf';

const GlobalStyle = createGlobalStyle`
    @font-face {
      font-family: 'GameBoy';
      src: url(${GameBoy}) format('truetype');
      font-display: 'auto';
      };
    @font-face {
      font-family: 'Pretendard';
      src: url(${Pretendard}) format('truetype');
      font-display: 'auto';
      };
      @font-face {
      font-family: 'PretendardBold';
      src: url(${PretendardBold}) format('truetype');
      font-display: 'auto';
      };
    @font-face {
      font-family: 'Tenada';
      src: url(${Tendata}) format('truetype');
      font-display: 'auto';
      };
  
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
`;

export default GlobalStyle;

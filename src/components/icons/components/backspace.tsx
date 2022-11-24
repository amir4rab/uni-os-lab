import Icon from '../icon';
import { PassableProps } from '../icon/icon';

const BackspaceIcon = ( props: PassableProps ) => (
  <Icon { ...props } >
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <title>Backspace</title>
      <path 
        d="M403.13 96H156.87a44.9 44.9 0 00-33.68 15.27 15.88 15.88 0 00-1.91 2.7L32 247.75a16 16 0 000 16.5l89.15 133.57a16.24 16.24 0 002 2.88 44.89 44.89 0 0033.7 15.3h246.28A44.92 44.92 0 00448 371.13V140.87A44.92 44.92 0 00403.13 96zM348 311a16 16 0 11-22.63 22.62L271.67 280 218 333.65A16 16 0 01195.35 311L249 257.33l-53.69-53.69A16 16 0 01218 181l53.69 53.7 53.67-53.7A16 16 0 01348 203.64l-53.7 53.69z"
      />
    </svg>
  </Icon>
);

export default BackspaceIcon;
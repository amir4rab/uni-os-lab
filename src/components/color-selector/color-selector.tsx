import classes from './color-selector.module.scss';

interface Props {
  colors: {
    name: string,
    hexCode: string,
    selected: boolean
  }[];
  onSelect: (hexCode: string) => void;
}

const ColorSelector = ({ colors, onSelect }: Props) => {
  return ( 
    <div className={classes.colorSelector}>
      { 
        colors.map(({hexCode, name, selected}) => (
          <button 
            onClick={() => onSelect(hexCode)}
            className={classes.item} 
            data-selected={selected}
            style={`background-color: #${hexCode};`}
          >
            {name}
          </button>
        ))
      }
    </div>
  )
};

export default ColorSelector;
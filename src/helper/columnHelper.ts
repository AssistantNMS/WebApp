interface IColumnMultiplierHelper {
  multiplier: number;
  base: number;
  xl: number;
  lg: number;
  md: number;
  sm: number;
  xs: number;
}

export const columnMultiplierHelper = (props: IColumnMultiplierHelper) => {
  let colString = `col-${props.multiplier * props.base} `;
  colString += `col-xl-${props.multiplier * props.xl} `;
  colString += `col-lg-${props.multiplier * props.lg} `;
  colString += `col-md-${props.multiplier * props.md} `;
  colString += `col-sm-${props.multiplier * props.sm} `;
  colString += `col-xs-${props.multiplier * props.xs} `;
  return colString;
};

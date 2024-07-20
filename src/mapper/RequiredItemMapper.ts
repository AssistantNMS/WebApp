import { RequiredItem } from '../contracts/RequiredItem';
import { Processor } from '../contracts/Processor';

export const mapProcessorToRequiredItems = (nutrientProcs: Array<Processor>): Array<RequiredItem> => {
  if (nutrientProcs == null || nutrientProcs.length < 1) return Array<RequiredItem>();
  return nutrientProcs.map((nutP: Processor) => {
    const rewItem: RequiredItem = {
      Id: nutP.Output.Id,
      Quantity: 0,
    };
    return rewItem;
  });
};

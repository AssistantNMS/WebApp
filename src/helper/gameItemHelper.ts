import { GameItemService } from '../services/json/GameItemService';
import { lowercaseAllButCapitaliseFirstChar } from './stringHelper';

export const getCurrencyName = async (gameItemService: GameItemService, itemId: string, fallback: string): Promise<string> => {
  const gameItemResult = await gameItemService.getItemDetails(itemId);
  if (gameItemResult.isSuccess === false) return fallback;

  const name = gameItemResult.value?.Name ?? fallback;
  return lowercaseAllButCapitaliseFirstChar(name);
};

import * as React from 'react';
import { useEffect, useState } from 'react';
import { IDependencyInjection, withServices } from '../../../integration/dependencyInjection';
import { GameItemService } from '../../../services/json/GameItemService';
import { ImageContainer } from '../tile/imageContainer';

interface IWithDepInj {
  gameItemService: GameItemService;
}
interface IWithoutDepInj {
  id: string;
}

interface IProps extends IWithDepInj, IWithoutDepInj {}

const GameItemImageUnconnected: React.FC<IProps> = (props: IProps) => {
  const [icon, setIcon] = useState<string>('loader.svg');

  useEffect(() => {
    fetchData(props.id);
  }, []);

  const fetchData = async (itemId: string) => {
    const itemDetails = await props.gameItemService.getItemDetails(itemId);
    setIcon(itemDetails.value.Icon);
  };

  return <ImageContainer Name={icon} Icon={icon} />;
};

export const GameItemImage = withServices<IWithoutDepInj, IWithDepInj>(GameItemImageUnconnected, (services: IDependencyInjection) => ({
  gameItemService: services.gameItemService,
}));


import * as React from 'react';
import { Processor } from '../../../contracts/Processor';

import { ProcessorItemListTile } from './processorItemListTile';

export const RefinerItemListTile = (props: Processor): JSX.Element => <ProcessorItemListTile {...props}
    singleItemImage="refiner.png"
    doubleItemImage="refinerMedium.png"
    tripleItemImage="refinerLarge.png"
/>;
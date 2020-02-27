
import * as React from 'react';
import { Processor } from '../../../contracts/Processor';

import { ProcessorItemListTile } from './processorItemListTile';

export const NutrientProcessorListTile = (props: Processor): JSX.Element => <ProcessorItemListTile {...props}
    singleItemImage="nutrientProcessor.png"
    doubleItemImage="nutrientProcessor.png"
    tripleItemImage="nutrientProcessor.png"
/>;
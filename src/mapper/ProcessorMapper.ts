import { Processor } from '../contracts/Processor';
import { ProcessorBase } from '../contracts/ProcessorBase';
import { ProcessorDetails } from '../contracts/ProcessorDetails';

export const mapProcessorItems = (baseItems: Array<ProcessorBase>, detailItems: Array<ProcessorDetails>): Array<Processor> => {
    const result = Array<Processor>();
    for (const base of baseItems) {
        for (const detail of detailItems) {
            if (result.length > 400) return result;
            if (base.Id === detail.Id) {
                result.push({
                    Id: base.Id,
                    Time: detail.Time,
                    Operation: detail.Operation,
                    Inputs: base.Inputs,
                    Output: base.Output,
                });
            }
        }
    }
    return result;
};

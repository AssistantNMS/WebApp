import { ResultWithValue } from '../../contracts/results/ResultWithValue';
import { BaseJsonService } from './BaseJsonService';
import { anyObject } from '../../helper/typescriptHacks';
import { Recharge } from '../../contracts/recharge/recharge';

export class RechargeByService extends BaseJsonService {
    async getAllRechargeItems(): Promise<ResultWithValue<Array<Recharge>>> {
        const result = await this.getAsset<Array<Recharge>>(`json/Recharge.json`);
        if (!result.isSuccess) return { isSuccess: false, value: [], errorMessage: result.errorMessage };

        return result;
    }

    async getRechargeById(itemId: string): Promise<ResultWithValue<Recharge>> {
        let result: any = {};

        if (!itemId) return { isSuccess: false, value: result, errorMessage: 'itemId specified is invallid' };

        const getAllResult = await this.getAllRechargeItems();
        if (!getAllResult.isSuccess) return { isSuccess: false, value: result, errorMessage: getAllResult.errorMessage };

        const rechargeItem = getAllResult.value.filter((rech => rech.Id === itemId));
        console.log(itemId, rechargeItem);
        if (rechargeItem.length < 1) {
            return {
                isSuccess: false,
                value: anyObject,
                errorMessage: 'recharge item not found',
            };
        }

        return {
            isSuccess: true,
            value: rechargeItem[0],
            errorMessage: ''
        }
    }

    async getRechargeByChargeById(itemId: string): Promise<ResultWithValue<Array<Recharge>>> {
        if (!itemId) return { isSuccess: false, value: [], errorMessage: 'itemId specified is invallid' };

        const getAllResult = await this.getAllRechargeItems();
        if (!getAllResult.isSuccess) return { isSuccess: false, value: [], errorMessage: getAllResult.errorMessage };

        const chargeByItems = getAllResult.value.filter((rech => rech.ChargeBy.findIndex(ch => ch.Id === itemId) >= 0));
        if (chargeByItems.length < 1) {
            return {
                isSuccess: false,
                value: [],
                errorMessage: 'recharge item not found',
            };
        }

        return {
            isSuccess: true,
            value: chargeByItems,
            errorMessage: ''
        }
    }
}

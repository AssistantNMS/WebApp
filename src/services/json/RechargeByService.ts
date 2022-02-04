import { Recharge } from '../../contracts/recharge/recharge';
import { ResultWithValue } from '../../contracts/results/ResultWithValue';
import { getHashForObject } from '../../helper/hashHelper';
import { anyObject } from '../../helper/typescriptHacks';
import { BaseJsonService } from './BaseJsonService';

export class RechargeByService extends BaseJsonService {

    private _hashLookup: any;

    constructor() {
        super();
        this._hashLookup = anyObject;
    }

    async _getOrAdd<T>(promise: () => Promise<T>, argsArray: Array<any>) {
        const hash = getHashForObject(argsArray);

        if (this._hashLookup != null && this._hashLookup[hash] != null) {
            return this._hashLookup[hash];
        }

        const jsonResult = await promise();
        this._hashLookup[hash] = jsonResult;
        return jsonResult;
    }

    async getAllRechargeItems(): Promise<ResultWithValue<Array<Recharge>>> {
        return this._getOrAdd(() => this._getAllRechargeItems(), ['_getListfromJson']);
    }
    async _getAllRechargeItems(): Promise<ResultWithValue<Array<Recharge>>> {
        const result = await this.getAsset<Array<Recharge>>(`data/Recharge.json`);
        if (!result.isSuccess) return { isSuccess: false, value: [], errorMessage: result.errorMessage };

        return result;
    }

    async getRechargeById(itemId: string): Promise<ResultWithValue<Recharge>> {
        return this._getOrAdd(() => this._getRechargeById(itemId), ['_getRechargeById', itemId]);
    }
    async _getRechargeById(itemId: string): Promise<ResultWithValue<Recharge>> {
        let result: any = {};

        if (!itemId) return { isSuccess: false, value: result, errorMessage: 'itemId specified is invallid' };

        const getAllResult = await this.getAllRechargeItems();
        if (!getAllResult.isSuccess) return { isSuccess: false, value: result, errorMessage: getAllResult.errorMessage };

        const rechargeItem = getAllResult.value.filter((rech => rech.Id === itemId));
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
        return this._getOrAdd(() => this._getRechargeByChargeById(itemId), ['_getRechargeByChargeById', itemId]);
    }
    async _getRechargeByChargeById(itemId: string): Promise<ResultWithValue<Array<Recharge>>> {
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

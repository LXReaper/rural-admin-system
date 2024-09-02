/* eslint-disable */
import type { BaseResponse_long_ } from "../models/BaseResponse_long_";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class CheckInsControllerService {
  /**
   * addCheckIns
   * @param useId useId
   * @returns BaseResponse_long_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static addCheckInsUsingPost(
    useId?: number
  ): CancelablePromise<BaseResponse_long_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/user/checkIn/add",
      query: {
        useId: useId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}

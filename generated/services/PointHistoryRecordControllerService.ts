import { PointRecordTypeCountRequest } from "../models/PointRecordTypeCountRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import { BaseResponse_PointRecordTypeCount_ } from "../models/BaseResponse_PointRecordTypeCount_";
import { request as __request } from "../core/request";
import { OpenAPI } from "../core/OpenAPI";
import { BaseResponse_List_PointRecordTypeCount_ } from "../models/BaseResponse_List_PointRecordTypeCount_";

export class PointHistoryRecordControllerService {
  /**
   * 得到积分变动时各种类型积分的计数
   * @param pointRecordTypeCountRequest
   * @returns BaseResponse_PointRecordTypeCount_ OK
   * @throws ApiError
   */
  public static getPointRecordTypeCount(
    pointRecordTypeCountRequest: PointRecordTypeCountRequest
  ): CancelablePromise<BaseResponse_PointRecordTypeCount_> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/point/history/record/get/pointRecord/type/count",
      body: pointRecordTypeCountRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
  /**
   * 查询今天的积分变动信息
   * @returns BaseResponse_List_PointRecordTypeCount_ OK
   * @throws ApiError
   */
  public static getPointDayRecordTypeCountList(): CancelablePromise<BaseResponse_List_PointRecordTypeCount_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/point/history/record/get/pointRecord/dayCount/list",
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
  /**
   * 查询本周的积分变动信息
   * @returns BaseResponse_List_PointRecordTypeCount_ OK
   * @throws ApiError
   */
  public static getPointWeekRecordTypeCountList(): CancelablePromise<BaseResponse_List_PointRecordTypeCount_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/point/history/record/get/pointRecord/weekCount/list",
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
  /**
   * 查询本月的积分变动信息
   * @returns BaseResponse_List_PointRecordTypeCount_ OK
   * @throws ApiError
   */
  public static getPointMonthRecordTypeCountList(): CancelablePromise<BaseResponse_List_PointRecordTypeCount_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/point/history/record/get/pointRecord/monthCount/list",
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
  /**
   * 得到积分变动时各种类型积分的计数
   * @returns BaseResponse_List_PointRecordTypeCount_ OK
   * @throws ApiError
   */
  public static getPointYearRecordTypeCountList(): CancelablePromise<BaseResponse_List_PointRecordTypeCount_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/point/history/record/get/pointRecord/yearCount/list",
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}

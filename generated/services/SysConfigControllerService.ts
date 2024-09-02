import { BaseResponse_CheckInConfigVO_ } from "../models/BaseResponse_CheckInConfigVO_";
import { OpenAPI } from "../core/OpenAPI";
import { CancelablePromise } from "../core/CancelablePromise";
import { request as __request } from "../core/request";
import { BaseResponse_AIConfig_ } from "../models/BaseResponse_AIConfig_";
import { BaseResponse_boolean_ } from "../models/BaseResponse_boolean_";
import { CheckInConfigUpdateRequest } from "../models/CheckInConfigUpdateRequest";
import { AIConfigUpdateRequest } from "../models/AIConfigUpdateRequest";
import { ProtocolUpdateRequest } from "../models/ProtocolUpdateRequest";
import { BaseResponse_ProtocolVO_ } from "../models/BaseResponse_ProtocolVO_";

export class SysConfigControllerService {
  /**
   * 获取签到配置信息
   * @returns BaseResponse_CheckInConfigVO_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static getCheckInConfigUsingGet(): CancelablePromise<
    BaseResponse_CheckInConfigVO_ | any
  > {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/management/sys/config/get/config/checkIn",
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 获取AI配置信息
   * @returns BaseResponse_AIConfig_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static getAIConfigUsingGet(): CancelablePromise<
    BaseResponse_AIConfig_ | any
  > {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/management/sys/config/get/config/ai",
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 根据类型获取协议信息
   * @returns BaseResponse_ProtocolVO_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static getProtocolByTypeUsingGet(
    type?: string
  ): CancelablePromise<BaseResponse_ProtocolVO_ | any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/management/sys/config/get/protocol/type",
      query: {
        type: type,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 更新签到配置
   * @param checkInConfigUpdateRequest
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static updateCheckInConfigUsingPost(
    checkInConfigUpdateRequest: CheckInConfigUpdateRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/management/sys/config/update/checkIn/config",
      body: checkInConfigUpdateRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 更新AI配置
   * @param aiConfigUpdateRequest
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static updateAIConfigUsingPost(
    aiConfigUpdateRequest: AIConfigUpdateRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/management/sys/config/update/AI/config",
      body: aiConfigUpdateRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 更新协议信息
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   * @param protocolUpdateRequest
   */
  public static updateProtocolUsingPost(
    protocolUpdateRequest: ProtocolUpdateRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/management/sys/config/update/protocol",
      body: protocolUpdateRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}

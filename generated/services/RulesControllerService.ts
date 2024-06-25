/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from "../models/BaseResponse_boolean_";
import type { BaseResponse_long_ } from "../models/BaseResponse_long_";
import type { BaseResponse_Page_Rules_ } from "../models/BaseResponse_Page_Rules_";
import type { BaseResponse_Rules_ } from "../models/BaseResponse_Rules_";
import type { DeleteRequest } from "../models/DeleteRequest";
import type { RulesAddRequest } from "../models/RulesAddRequest";
import type { RulesQueryRequest } from "../models/RulesQueryRequest";
import type { RulesUpdateRequest } from "../models/RulesUpdateRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class RulesControllerService {
  /**
   * 添加规则
   * @param rulesAddRequest rulesAddRequest
   * @returns BaseResponse_long_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static rulesAddUsingPost(
    rulesAddRequest: RulesAddRequest
  ): CancelablePromise<BaseResponse_long_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/rules/add",
      body: rulesAddRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 删除规则
   * @param deleteRequest deleteRequest
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static deleteRulesUsingPost(
    deleteRequest: DeleteRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/rules/delete",
      body: deleteRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * getRulesById
   * @param ruleId RuleId
   * @returns BaseResponse_Rules_ OK
   * @throws ApiError
   */
  public static getRulesByIdUsingGet(
    ruleId?: number
  ): CancelablePromise<BaseResponse_Rules_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/rules/get",
      query: {
        RuleId: ruleId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * listRulesByPage
   * @param rulesQueryRequest rulesQueryRequest
   * @returns BaseResponse_Page_Rules_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static listRulesByPageUsingPost(
    rulesQueryRequest: RulesQueryRequest
  ): CancelablePromise<BaseResponse_Page_Rules_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/rules/list/page",
      body: rulesQueryRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 更新规则
   * @param rulesUpdateRequest rulesUpdateRequest
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static updateRulesUsingPost(
    rulesUpdateRequest: RulesUpdateRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/rules/update",
      body: rulesUpdateRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}

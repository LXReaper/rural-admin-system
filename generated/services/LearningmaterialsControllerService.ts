/* eslint-disable */
import type { BaseResponse_boolean_ } from "../models/BaseResponse_boolean_";
import type { BaseResponse_Learningmaterials_ } from "../models/BaseResponse_Learningmaterials_";
import type { BaseResponse_LearningmaterialsVO_ } from "../models/BaseResponse_LearningmaterialsVO_";
import type { BaseResponse_long_ } from "../models/BaseResponse_long_";
import type { BaseResponse_Page_Learningmaterials_ } from "../models/BaseResponse_Page_Learningmaterials_";
import type { BaseResponse_Page_LearningmaterialsVO_ } from "../models/BaseResponse_Page_LearningmaterialsVO_";
import type { DeleteRequest } from "../models/DeleteRequest";
import type { LearningmaterialsAddRequest } from "../models/LearningmaterialsAddRequest";
import type { LearningmaterialsQueryRequest } from "../models/LearningmaterialsQueryRequest";
import type { LearningmaterialsUpdateRequest } from "../models/LearningmaterialsUpdateRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class LearningmaterialsControllerService {
  /**
   * addLearningmaterials
   * @param learningmaterialsAddRequest learningmaterialsAddRequest
   * @returns BaseResponse_long_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static addLearningmaterialsUsingPost(
    learningmaterialsAddRequest: LearningmaterialsAddRequest
  ): CancelablePromise<BaseResponse_long_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/learningmaterials/add",
      body: learningmaterialsAddRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * deleteLearningmaterials
   * @param deleteRequest deleteRequest
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static deleteLearningmaterialsUsingPost(
    deleteRequest: DeleteRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/learningmaterials/delete",
      body: deleteRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * getLearningmaterialsById
   * @param learningmaterialsId learningmaterialsId
   * @returns BaseResponse_Learningmaterials_ OK
   * @throws ApiError
   */
  public static getLearningmaterialsByIdUsingGet(
    learningmaterialsId?: number
  ): CancelablePromise<BaseResponse_Learningmaterials_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/learningmaterials/get",
      query: {
        learningmaterialsId: learningmaterialsId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * getLearningmaterialsVO
   * @param learningmaterialsId learningmaterialsId
   * @returns BaseResponse_LearningmaterialsVO_ OK
   * @throws ApiError
   */
  public static getLearningmaterialsVoUsingGet(
    learningmaterialsId?: number
  ): CancelablePromise<BaseResponse_LearningmaterialsVO_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/learningmaterials/get/vo",
      query: {
        learningmaterialsId: learningmaterialsId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * listLearningmaterialsByPage
   * @param learningmaterialsQueryRequest learningmaterialsQueryRequest
   * @returns BaseResponse_Page_Learningmaterials_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static listLearningmaterialsByPageUsingPost(
    learningmaterialsQueryRequest: LearningmaterialsQueryRequest
  ): CancelablePromise<BaseResponse_Page_Learningmaterials_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/learningmaterials/list/page",
      body: learningmaterialsQueryRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * listLearningmaterialsVOByPage
   * @param learningmaterialsQueryRequest learningmaterialsQueryRequest
   * @returns BaseResponse_Page_LearningmaterialsVO_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static listLearningmaterialsVoByPageUsingPost(
    learningmaterialsQueryRequest: LearningmaterialsQueryRequest
  ): CancelablePromise<BaseResponse_Page_LearningmaterialsVO_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/learningmaterials/list/page/vo",
      body: learningmaterialsQueryRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * updateLearningmaterials
   * @param learningmaterialsUpdateRequest learningmaterialsUpdateRequest
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static updateLearningmaterialsUsingPost(
    learningmaterialsUpdateRequest: LearningmaterialsUpdateRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/learningmaterials/update",
      body: learningmaterialsUpdateRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}

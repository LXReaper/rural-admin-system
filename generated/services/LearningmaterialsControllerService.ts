/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from "../models/BaseResponse_boolean_";
import type { BaseResponse_LearningMaterialsVO_ } from "../models/BaseResponse_LearningmaterialsVO_";
import type { BaseResponse_long_ } from "../models/BaseResponse_long_";
import type { BaseResponse_Page_LearningMaterialsVO_ } from "../models/BaseResponse_Page_LearningmaterialsVO_";
import type { DeleteRequest } from "../models/DeleteRequest";
import type { LearningMaterialsAddRequest } from "../models/LearningmaterialsAddRequest";
import type { LearningMaterialsQueryRequest } from "../models/LearningmaterialsQueryRequest";
import type { LearningMaterialsUpdateRequest } from "../models/LearningmaterialsUpdateRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
import { BaseResponse_Page_LearningMaterials_ } from "../models/BaseResponse_Page_Learningmaterials_";
import { BaseResponse_LearningMaterials_ } from "../models/BaseResponse_Learningmaterials_";

export class LearningMaterialsControllerService {
  /**
   * 添加学习资料
   * @returns BaseResponse_long_ OK
   * @returns any Created
   * @throws ApiError
   * @param learningMaterialsAddRequest
   */
  public static addLearningMaterialsUsingPost(
    learningMaterialsAddRequest: LearningMaterialsAddRequest
  ): CancelablePromise<BaseResponse_long_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/task/study/learningMaterials/add",
      body: learningMaterialsAddRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 删除学习资料
   * @param deleteRequest deleteRequest
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static deleteLearningMaterialsUsingPost(
    deleteRequest: DeleteRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/task/study/learningMaterials/delete",
      body: deleteRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 根据id获取学习资料
   * @param learningMaterialsId learningMaterialsId
   * @returns BaseResponse_LearningMaterials_ OK
   * @throws ApiError
   */
  public static getLearningMaterialsByIdUsingGet(
    learningMaterialsId?: number
  ): CancelablePromise<BaseResponse_LearningMaterials_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/task/study/learningMaterials/get",
      query: {
        learningMaterialsId: learningMaterialsId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * getLearningMaterialsVO
   * @param learningMaterialsId learningMaterialsId
   * @returns BaseResponse_LearningMaterialsVO_ OK
   * @throws ApiError
   */
  public static getLearningMaterialsVoUsingGet(
    learningMaterialsId?: number
  ): CancelablePromise<BaseResponse_LearningMaterialsVO_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/task/study/learningMaterials/get/vo",
      query: {
        learningMaterialsId: learningMaterialsId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 分页获取资料列表
   * @param learningmaterialsQueryRequest learningmaterialsQueryRequest
   * @returns BaseResponse_Page_LearningMaterials_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static listLearningMaterialsByPageUsingPost(
    learningmaterialsQueryRequest: LearningMaterialsQueryRequest
  ): CancelablePromise<BaseResponse_Page_LearningMaterials_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/task/study/learningMaterials/list/page",
      body: learningmaterialsQueryRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * listLearningMaterialsVOByPage
   * @param learningmaterialsQueryRequest learningmaterialsQueryRequest
   * @returns BaseResponse_Page_LearningMaterialsVO_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static listLearningMaterialsVoByPageUsingPost(
    learningmaterialsQueryRequest: LearningMaterialsQueryRequest
  ): CancelablePromise<BaseResponse_Page_LearningMaterialsVO_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/task/study/learningMaterials/list/page/vo",
      body: learningmaterialsQueryRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 更新学习资料
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   * @param learningMaterialsUpdateRequest
   */
  public static updateLearningMaterialsUsingPost(
    learningMaterialsUpdateRequest: LearningMaterialsUpdateRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/task/study/learningMaterials/update",
      body: learningMaterialsUpdateRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}

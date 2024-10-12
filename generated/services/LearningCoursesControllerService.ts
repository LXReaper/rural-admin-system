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

export class LearningCoursesControllerService {
  /**
   * 根据用户id和资料id获取
   * @returns BaseResponse_long_ OK
   * @returns any Created
   * @throws ApiError
   * @param userId
   */
  public static getLearningCoursesByUserIdUsingGet(
    userId?: number
  ): CancelablePromise<BaseResponse_long_ | any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/task/study/learningCourses/get",
      query: {
        userId: userId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}

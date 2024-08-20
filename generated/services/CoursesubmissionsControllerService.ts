/* eslint-disable */
import type { BaseResponse_boolean_ } from "../models/BaseResponse_boolean_";
import type { BaseResponse_Coursesubmissions_ } from "../models/BaseResponse_Coursesubmissions_";
import type { BaseResponse_long_ } from "../models/BaseResponse_long_";
import type { BaseResponse_Page_Coursesubmissions_ } from "../models/BaseResponse_Page_Coursesubmissions_";
import type { CoursesubmissionsAddRequest } from "../models/CoursesubmissionsAddRequest";
import type { CoursesubmissionsQueryRequest } from "../models/CoursesubmissionsQueryRequest";
import type { CoursesubmissionsUpdateRequest } from "../models/CoursesubmissionsUpdateRequest";
import type { DeleteRequest } from "../models/DeleteRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class CoursesubmissionsControllerService {
  /**
   * addCoursesubmission
   * @param coursesubmissionsAddRequest coursesubmissionsAddRequest
   * @returns BaseResponse_long_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static addCoursesubmissionUsingPost(
    coursesubmissionsAddRequest: CoursesubmissionsAddRequest
  ): CancelablePromise<BaseResponse_long_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/study/courseSubmissions/add",
      body: coursesubmissionsAddRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * deleteCoursesubmission
   * @param deleteRequest deleteRequest
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static deleteCoursesubmissionUsingPost(
    deleteRequest: DeleteRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/study/courseSubmissions/delete",
      body: deleteRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * getCoursesubmissionsById
   * @param materialId material_id
   * @returns BaseResponse_Coursesubmissions_ OK
   * @throws ApiError
   */
  public static getCoursesubmissionsByIdUsingGet(
    materialId?: number
  ): CancelablePromise<BaseResponse_Coursesubmissions_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/study/courseSubmissions/get",
      query: {
        material_id: materialId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * listCoursesubmissionsByPage
   * @param coursesubmissionsQueryRequest coursesubmissionsQueryRequest
   * @returns BaseResponse_Page_Coursesubmissions_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static listCoursesubmissionsByPageUsingPost(
    coursesubmissionsQueryRequest: CoursesubmissionsQueryRequest
  ): CancelablePromise<BaseResponse_Page_Coursesubmissions_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/study/courseSubmissions/list/page",
      body: coursesubmissionsQueryRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * updateCoursesubmission
   * @param coursesubmissionsUpdateRequest coursesubmissionsUpdateRequest
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static updateCoursesubmissionUsingPost(
    coursesubmissionsUpdateRequest: CoursesubmissionsUpdateRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/study/courseSubmissions/update",
      body: coursesubmissionsUpdateRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}

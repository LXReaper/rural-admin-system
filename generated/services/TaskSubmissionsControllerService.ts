/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from "../models/BaseResponse_boolean_";
import type { BaseResponse_long_ } from "../models/BaseResponse_long_";
import type { BaseResponse_Page_Tasksubmissions_ } from "../models/BaseResponse_Page_Tasksubmissions_";
import type { BaseResponse_Tasksubmissions_ } from "../models/BaseResponse_Tasksubmissions_";
import type { DeleteRequest } from "../models/DeleteRequest";
import type { TasksubmissionsAddRequest } from "../models/TasksubmissionsAddRequest";
import type { TasksubmissionsQueryRequest } from "../models/TasksubmissionsQueryRequest";
import type { TasksubmissionsUpdateRequest } from "../models/TasksubmissionsUpdateRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class TaskSubmissionsControllerService {
  /**
   * 接取任务
   * @param tasksubmissionsAddRequest tasksubmissionsAddRequest
   * @returns BaseResponse_long_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static taskSubmissionsAddUsingPost(
    tasksubmissionsAddRequest: TasksubmissionsAddRequest
  ): CancelablePromise<BaseResponse_long_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/tasksubmissions/add",
      body: tasksubmissionsAddRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 删除任务接取信息（管理员可用）
   * @param deleteRequest deleteRequest
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static deleteTaskSubmissionsUsingPost(
    deleteRequest: DeleteRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/tasksubmissions/delete",
      body: deleteRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 根据id获取任务接取信息
   * @param submissionId submissionId
   * @returns BaseResponse_Tasksubmissions_ OK
   * @throws ApiError
   */
  public static getTaskSubmissionsByIdUsingGet(
    submissionId?: number
  ): CancelablePromise<BaseResponse_Tasksubmissions_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/tasksubmissions/get",
      query: {
        submissionId: submissionId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 分页获取任务接取信息
   * @param tasksubmissionsQueryRequest tasksubmissionsQueryRequest
   * @returns BaseResponse_Page_Tasksubmissions_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static listTaskSubmissionsByPageUsingPost(
    tasksubmissionsQueryRequest: TasksubmissionsQueryRequest
  ): CancelablePromise<BaseResponse_Page_Tasksubmissions_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/tasksubmissions/list/page",
      body: tasksubmissionsQueryRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 更新任务接取信息
   * @param tasksubmissionsUpdateRequest tasksubmissionsUpdateRequest
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static updateTaskSubmissionsUsingPost(
    tasksubmissionsUpdateRequest: TasksubmissionsUpdateRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/tasksubmissions/update",
      body: tasksubmissionsUpdateRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}

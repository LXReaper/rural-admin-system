/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from "../models/BaseResponse_boolean_";
import type { BaseResponse_long_ } from "../models/BaseResponse_long_";
import type { BaseResponse_Page_TasksCase_ } from "../models/BaseResponse_Page_TasksCase_";
import type { DeleteRequest } from "../models/DeleteRequest";
import type { TasksCaseAddRequest } from "../models/TasksCaseAddRequest";
import type { TasksCaseQueryRequest } from "../models/TasksCaseQueryRequest";
import type { TasksCaseUpdateRequest } from "../models/TasksCaseUpdateRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class TaskCaseControllerService {
  /**
   * 删除任务完成情况
   * @param deleteRequest deleteRequest
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static deleteTasksCaseUsingPost(
    deleteRequest: DeleteRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/task/case/delete",
      body: deleteRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 分页获取任务情况列表
   * @param tasksCaseQueryRequest tasksCaseQueryRequest
   * @returns BaseResponse_Page_TasksCase_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static listTasksCaseByPageUsingPost(
    tasksCaseQueryRequest: TasksCaseQueryRequest
  ): CancelablePromise<BaseResponse_Page_TasksCase_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/task/case/list/page",
      body: tasksCaseQueryRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 更新任务完成情况
   * @param tasksCaseUpdateRequest tasksCaseUpdateRequest
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static updateTasksCaseUsingPost(
    tasksCaseUpdateRequest: TasksCaseUpdateRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/task/case/update",
      body: tasksCaseUpdateRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 提交任务完成情况
   * @param tasksCaseAddRequest tasksCaseAddRequest
   * @returns BaseResponse_long_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static uploadTasksCaseUsingPost(
    tasksCaseAddRequest: TasksCaseAddRequest
  ): CancelablePromise<BaseResponse_long_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/task/case/upload",
      body: tasksCaseAddRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}

/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from "../models/BaseResponse_boolean_";
import type { BaseResponse_long_ } from "../models/BaseResponse_long_";
import type { BaseResponse_Page_Tasks_ } from "../models/BaseResponse_Page_Tasks_";
import type { BaseResponse_Tasks_ } from "../models/BaseResponse_Tasks_";
import type { DeleteRequest } from "../models/DeleteRequest";
import type { TasksAddRequest } from "../models/TasksAddRequest";
import type { TasksConfirmRequest } from "../models/TasksConfirmRequest";
import type { TasksQueryRequest } from "../models/TasksQueryRequest";
import type { TasksUpdateRequest } from "../models/TasksUpdateRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
import { BaseResponse_Page_TasksVO_ } from "../models/BaseResponse_Page_TasksVO_";
import { TaskCountInfoVO } from "../models/TaskCountInfoVO";
import { BaseResponse_TaskCountInfoVO_ } from "../models/BaseResponse_TaskCountInfoVO_";

export class TasksControllerService {
  /**
   * 直接添加任务（仅限管理员）
   * @param tasksAddRequest tasksAddRequest
   * @returns BaseResponse_long_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static tasksAddUsingPost(
    tasksAddRequest: TasksAddRequest
  ): CancelablePromise<BaseResponse_long_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/task/tasks/add",
      body: tasksAddRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 确认完成任务（任务发布者操作）
   * @param tasksConfirmRequest tasksConfirmRequest
   * @returns BaseResponse_boolean_ OK
   * @throws ApiError
   */
  public static confirmCompleteTaskUsingGet(
    tasksConfirmRequest: TasksConfirmRequest
  ): CancelablePromise<BaseResponse_boolean_> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/task/tasks/confirm/complete/task",
      body: tasksConfirmRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 删除任务
   * @param deleteRequest deleteRequest
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static deleteTasksUsingPost(
    deleteRequest: DeleteRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/task/tasks/delete",
      body: deleteRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 根据id获取任务
   * @param taskId TaskId
   * @returns BaseResponse_Tasks_ OK
   * @throws ApiError
   */
  public static getTasksByIdUsingGet(
    taskId?: number
  ): CancelablePromise<BaseResponse_Tasks_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/task/tasks/get",
      query: {
        TaskId: taskId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 分页获取任务列表
   * @param tasksQueryRequest tasksQueryRequest
   * @returns BaseResponse_Page_Tasks_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static listTasksByPageUsingPost(
    tasksQueryRequest: TasksQueryRequest
  ): CancelablePromise<BaseResponse_Page_Tasks_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/task/tasks/list/page",
      body: tasksQueryRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 分页获取任务信息封装列表
   * @param tasksQueryRequest tasksQueryRequest
   * @returns BaseResponse_Page_TasksVO_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static listTasksVoByPageUsingPost(
    tasksQueryRequest: TasksQueryRequest
  ): CancelablePromise<BaseResponse_Page_TasksVO_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/task/tasks/list/page/vo",
      body: tasksQueryRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * updateTasks
   * @param tasksUpdateRequest tasksUpdateRequest
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static updateTasksUsingPost(
    tasksUpdateRequest: TasksUpdateRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/task/tasks/update",
      body: tasksUpdateRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * getTaskCountInfo
   * @returns BaseResponse_TaskCountInfoVO_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static getTaskCountInfoUsingGet(): CancelablePromise<
    BaseResponse_TaskCountInfoVO_ | any
  > {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/task/tasks/get/count/info/vo",
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}

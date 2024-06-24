/* eslint-disable */
import type { BaseResponse_boolean_ } from "../models/BaseResponse_boolean_";
import type { BaseResponse_long_ } from "../models/BaseResponse_long_";
import type { BaseResponse_Page_Tasks_ } from "../models/BaseResponse_Page_Tasks_";
import type { BaseResponse_Tasks_ } from "../models/BaseResponse_Tasks_";
import type { DeleteRequest } from "../models/DeleteRequest";
import type { TasksAddRequest } from "../models/TasksAddRequest";
import type { TasksQueryRequest } from "../models/TasksQueryRequest";
import type { TasksUpdateRequest } from "../models/TasksUpdateRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class TasksControllerService {
  /**
   * tasksAdd
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
      url: "/api/tasks/add",
      body: tasksAddRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * deleteTasks
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
      url: "/api/tasks/delete",
      body: deleteRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * getTasksById
   * @param taskId TaskId
   * @returns BaseResponse_Tasks_ OK
   * @throws ApiError
   */
  public static getTasksByIdUsingGet(
    taskId?: number
  ): CancelablePromise<BaseResponse_Tasks_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/tasks/get",
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
   * listTasksByPage
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
      url: "/api/tasks/list/page",
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
      url: "/api/tasks/update",
      body: tasksUpdateRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}

/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from "../models/BaseResponse_boolean_";
import type { BaseResponse_long_ } from "../models/BaseResponse_long_";
import type { BaseResponse_Page_TasksExamine_ } from "../models/BaseResponse_Page_TasksExamine_";
import type { DeleteRequest } from "../models/DeleteRequest";
import type { TaskExamineRequest } from "../models/TaskExamineRequest";
import type { TasksExamineAddRequest } from "../models/TasksExamineAddRequest";
import type { TasksExamineQueryRequest } from "../models/TasksExamineQueryRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
import { BaseResponse_Page_TasksExamineVO_ } from "../models/BaseResponse_Page_TasksExamineVO_";

export class TasksExamineControllerService {
  /**
   * 申请添加任务
   * @param tasksExamineAddRequest tasksExamineAddRequest
   * @returns BaseResponse_long_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static taskExamineAddUsingPost(
    tasksExamineAddRequest: TasksExamineAddRequest
  ): CancelablePromise<BaseResponse_long_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/tasksExamine/add",
      body: tasksExamineAddRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 删除审核任务记录
   * @param deleteRequest deleteRequest
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static deleteTaskExamineUsingPost(
    deleteRequest: DeleteRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/tasksExamine/delete",
      body: deleteRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 处理审核任务
   * @param taskExamineRequest taskExamineRequest
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static taskHandleUsingPost(
    taskExamineRequest: TaskExamineRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/tasksExamine/handle",
      body: taskExamineRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 分页展示所有审核任务信息
   * @param tasksExamineQueryRequest tasksExamineQueryRequest
   * @returns BaseResponse_Page_TasksExamine_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static listTasksExamineByPageUsingPost(
    tasksExamineQueryRequest: TasksExamineQueryRequest
  ): CancelablePromise<BaseResponse_Page_TasksExamine_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/tasksExamine/list/page",
      body: tasksExamineQueryRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 分页获取审核信息封装列表
   * @param tasksExamineQueryRequest tasksExamineQueryRequest
   * @returns BaseResponse_Page_TasksExamineVO_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static listTasksExamineVoByPageUsingPost(
    tasksExamineQueryRequest: TasksExamineQueryRequest
  ): CancelablePromise<BaseResponse_Page_TasksExamineVO_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/tasksExamine/list/page/vo",
      body: tasksExamineQueryRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}

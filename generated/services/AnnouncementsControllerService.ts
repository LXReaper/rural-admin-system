/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnnouncementsAddRequest } from "../models/AnnouncementsAddRequest";
import type { AnnouncementsQueryRequest } from "../models/AnnouncementsQueryRequest";
import type { AnnouncementsUpdateRequest } from "../models/AnnouncementsUpdateRequest";
import type { BaseResponse_Announcements_ } from "../models/BaseResponse_Announcements_";
import type { BaseResponse_AnnouncementsVO_ } from "../models/BaseResponse_AnnouncementsVO_";
import type { BaseResponse_boolean_ } from "../models/BaseResponse_boolean_";
import type { BaseResponse_long_ } from "../models/BaseResponse_long_";
import type { BaseResponse_Page_Announcements_ } from "../models/BaseResponse_Page_Announcements_";
import type { BaseResponse_Page_AnnouncementsVO_ } from "../models/BaseResponse_Page_AnnouncementsVO_";
import type { DeleteRequest } from "../models/DeleteRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class AnnouncementsControllerService {
  /**
   * 发布公告
   * @param announcementsAddRequest announcementsAddRequest
   * @returns BaseResponse_long_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static addAnnouncementsUsingPost(
    announcementsAddRequest: AnnouncementsAddRequest
  ): CancelablePromise<BaseResponse_long_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/announcements/add",
      body: announcementsAddRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 删除公告
   * @param deleteRequest deleteRequest
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static deleteAnnouncementsUsingPost(
    deleteRequest: DeleteRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/announcements/delete",
      body: deleteRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 根据id获取公告信息
   * @param announcementsId announcementsId
   * @returns BaseResponse_Announcements_ OK
   * @throws ApiError
   */
  public static getAnnouncementsByIdUsingGet(
    announcementsId?: number
  ): CancelablePromise<BaseResponse_Announcements_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/announcements/get",
      query: {
        announcementsId: announcementsId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 根据id获取公告封装信息
   * @param announcementsId announcementsId
   * @returns BaseResponse_AnnouncementsVO_ OK
   * @throws ApiError
   */
  public static getAnnouncementsVoByIdUsingGet(
    announcementsId?: number
  ): CancelablePromise<BaseResponse_AnnouncementsVO_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/announcements/get/vo",
      query: {
        announcementsId: announcementsId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 分页获取公告列表
   * @param announcementsQueryRequest announcementsQueryRequest
   * @returns BaseResponse_Page_Announcements_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static listAnnouncementsByPageUsingPost(
    announcementsQueryRequest: AnnouncementsQueryRequest
  ): CancelablePromise<BaseResponse_Page_Announcements_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/announcements/list/page",
      body: announcementsQueryRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 分页获取公告信息封装列表
   * @param announcementsQueryRequest announcementsQueryRequest
   * @returns BaseResponse_Page_AnnouncementsVO_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static listTasksVoByPageUsingPost(
    announcementsQueryRequest: AnnouncementsQueryRequest
  ): CancelablePromise<BaseResponse_Page_AnnouncementsVO_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/announcements/list/page/vo",
      body: announcementsQueryRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 更新公告
   * @param announcementsUpdateRequest announcementsUpdateRequest
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static updateAnnouncementsUsingPost(
    announcementsUpdateRequest: AnnouncementsUpdateRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/announcements/update",
      body: announcementsUpdateRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}

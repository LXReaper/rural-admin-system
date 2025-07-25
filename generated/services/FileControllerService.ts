/* eslint-disable */
import type { BaseResponse_string_ } from "../models/BaseResponse_string_";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class FileControllerService {
  /**
   * filesUpload
   * @param file file
   * @param filePrefix
   * @param fileType
   * @returns BaseResponse_string_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static filesUploadUsingPost(
    file: Blob,
    filePrefix?: string,
    fileType?: string
  ): CancelablePromise<BaseResponse_string_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/file/fileUpload",
      query: {
        filePrefix: filePrefix,
        fileType: fileType,
      },
      formData: {
        file: file,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * uploadFile
   * @param file file
   * @param biz
   * @returns BaseResponse_string_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static uploadFileUsingPost(
    file: Blob,
    biz?: string
  ): CancelablePromise<BaseResponse_string_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/file/upload",
      query: {
        biz: biz,
      },
      formData: {
        file: file,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}

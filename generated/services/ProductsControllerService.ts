/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from "../models/BaseResponse_boolean_";
import type { BaseResponse_long_ } from "../models/BaseResponse_long_";
import type { BaseResponse_Page_Products_ } from "../models/BaseResponse_Page_Products_";
import type { BaseResponse_Products_ } from "../models/BaseResponse_Products_";
import type { DeleteRequest } from "../models/DeleteRequest";
import type { ProductsAddRequest } from "../models/ProductsAddRequest";
import type { ProductsQueryRequest } from "../models/ProductsQueryRequest";
import type { ProductsUpdateRequest } from "../models/ProductsUpdateRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class ProductsControllerService {
  /**
   * 添加商品
   * @param productsAddRequest productsAddRequest
   * @returns BaseResponse_long_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static productsAddUsingPost(
    productsAddRequest: ProductsAddRequest
  ): CancelablePromise<BaseResponse_long_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/products/add",
      body: productsAddRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 删除单个商品
   * @param deleteRequest deleteRequest
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static deleteProductsUsingPost(
    deleteRequest: DeleteRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/products/delete",
      body: deleteRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 删除多个商品
   * @param deleteRequest deleteRequest
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static deleteProductsMoreUsingPost(
    deleteRequest: Array<DeleteRequest>
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/products/delete/more",
      body: deleteRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 根据id获取商品
   * @param productId ProductId
   * @returns BaseResponse_Products_ OK
   * @throws ApiError
   */
  public static getProductsByIdUsingGet(
    productId?: number
  ): CancelablePromise<BaseResponse_Products_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/products/get",
      query: {
        ProductId: productId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 分页获取商品列表
   * @param productsQueryRequest productsQueryRequest
   * @returns BaseResponse_Page_Products_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static listProductsByPageUsingPost(
    productsQueryRequest: ProductsQueryRequest
  ): CancelablePromise<BaseResponse_Page_Products_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/products/list/page",
      body: productsQueryRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 更新商品
   * @param productsUpdateRequest productsUpdateRequest
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static updateProductsUsingPost(
    productsUpdateRequest: ProductsUpdateRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/products/update",
      body: productsUpdateRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}

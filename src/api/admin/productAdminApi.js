import axiosClient from "../axiosClient";
const productAdminApi = {
  async getAllProduct(_page, _limit) {
    const productList = await axiosClient.get("products/getAllProductAdmin", {
      params: { _page, _limit },
    });
    const count = await axiosClient.get("/products/getAllProductAdmin");
    return {
      data: productList.data,
      pagination: {
        page: _page,
        limit: _limit,
        total: count.data.length,
      },
    };
  },
  async getAllProductBySearchTitle(title, _page, _limit) {
    const productList = await axiosClient.get("products/getAllProductAdmin", {
      params: { title, _page, _limit },
    });
    const count = await axiosClient.get("/products/getAllProductAdmin");
    return {
      data: productList.data,
      pagination: {
        page: _page,
        limit: _limit,
        total: count.data.length,
      },
    };
  },
  addProduct(data) {
    // console.log(data);
    const url = "/products";
    return axiosClient.post(url, data);
  },
  addProduct2(productId, data) {
    // console.log(data);
    // console.log(productId);
    const url = "/products/" + productId + "/ProductDetail";
    console.log(url);
    return axiosClient.post(url, data);
  },
  getProductByTitle(title) {
    // console.log(title);
    const url = "/products/findProductByTitle";
    return axiosClient.get(url, {
      params: {
        title,
      },
    });
  },
  updateProduct(id, newProduct) {
    const url = "/products/" + id;
    return axiosClient.put(url, newProduct);
  },
  updateProductDetail(id, productDetailId, newProductDetail) {
    const url = "/products/" + id + "/ProductDetail/" + productDetailId;

    return axiosClient.put(url, newProductDetail);
  },
  deleteProduct(id) {
    const url = "/products/" + id;
    return axiosClient.delete(url);
  },
  resellProduct(id) {
    const url = "/products/return" + id;
    return axiosClient.post(url);
  },
  deleteProductDetail(id, productDetailId) {
    const url = "/products/" + id + "/ProductDetail/" + productDetailId;
    console.log(url);
    return axiosClient.delete(url);
  },
  resellProductDetail(id, productDetailId) {
    const url = "/products/" + id + "/ProductDetail/return/" + productDetailId;
    console.log(url);
    return axiosClient.delete(url);
  },
};

export default productAdminApi;

import axiosClient from "./axiosClient";
const productApi = {
  async getAll(params) {
    // Transform _page to _start
    const newParams = { ...params };
    newParams._start =
      !params._page || params._page <= 1
        ? 0
        : (params._page - 1) * (params._limit || 50);
    // Remove un-needed key
    delete newParams._page;
    // Fetch product list + count
    const productList = await axiosClient.get("/products", {
      params: newParams,
    });
    const count = await axiosClient.get("/products/count", {
      params: newParams,
    });
    // Build response and return
    return {
      data: productList,
      pagination: {
        page: params._page,
        limit: params._limit,
        total: count,
      },
    };
  },
  async getAllProduct(_page, _limit) {
    // console.log(_page + " page" + _limit + " limit");
    // const url = "/products";
    // return axiosClient.get(url);
    // const newParams = { ...params };
    // newParams._start =
    //   !params._page || params._page <= 1
    //     ? 0
    //     : (params._page - 1) * (params._limit || 50);
    // console.log(newParams._start);
    // // Remove un-needed key
    // delete _page;
    // // Fetch product list + count
    const productList = await axiosClient.get("/products", {
      params: { _page, _limit },
    });
    const count = await axiosClient.get("/products");
    return {
      data: productList.data,
      pagination: {
        page: _page,
        limit: _limit,
        total: count.data.length,
      },
    };
  },
  async getAllProductByCategory(category, _page, _limit) {
    const productList = await axiosClient.get("/products", {
      params: { category, _page, _limit },
    });
    const count = await axiosClient.get("/products");
    return {
      data: productList.data,
      pagination: {
        page: _page,
        limit: _limit,
        total: count.data.length,
      },
    };
  },
  getIdProduct(id) {
    const url = "/products/find/" + id;
    return axiosClient.get(url);
  },
  getIdProductDetail(proId) {
    const url = "/products/" + proId + "/ProductDetail/";
    console.log(url);
    return axiosClient.get(url);
  },
  //Truyen vao size vs color để lấy productDetailId thêm vào giỏ hàng
  getIdProductDetailToCart(proId, size, color) {
    const url = "/products/" + proId + "/findOneProductDetail/";
    return axiosClient.get(url, {
      params: {
        size,
        color,
      },
    });
  },
  //Truyền vào size vs color để lấy giá thêm vào giỏ hàng
  getPriceByColorSize(proId, size, color) {
    const url = "/products/" + proId + "/findOneProductDetail/";
    return axiosClient.get(url, {
      params: {
        size,
        color,
      },
    });
  },
  //Lấy size của một product
  getSizeByProductId(proId) {
    const url = "/products/" + proId + "/getSizeProductDetail/";
    return axiosClient.get(url);
  },
  //Lấy mau của một product
  getColorByProductId(proId) {
    const url = "/products/" + proId + "/getColorProductDetail/";
    return axiosClient.get(url);
  },
  //Truyền vào size để lấy giá và màu
  getPriceColorBySize(proId, size) {
    const url = "/products/" + proId + "/findPriceAndColorBySize/";
    return axiosClient.get(url, {
      params: {
        size,
      },
    });
  },
  //Truyền vào color để lấy giá và size
  getPriceSizeByColor(proId, color) {
    const url = "/products/" + proId + "/findPriceAndSizeByColor/";
    return axiosClient.get(url, {
      params: {
        color,
      },
    });
  },
  getAllBrand(categoryData) {
    let category = categoryData?.join(",");
    const url = "/products/allBrand";
    return axiosClient.get(url, {
      params: {
        category,
      },
    });
  },
  async getAllProductByFilter(
    // _page,
    // _limit,
    brandData,
    sizeData,
    colorData,
    categoryData,
    priceLT,
    priceGT,
    priceMin,
    priceMax,
    fromStar
  ) {
    // let brand = brandData?.join(",");
    // let size = sizeData?.join(",");
    // let color = colorData?.join(",");
    // let category = categoryData?.join(",");
    // const productList = await axiosClient.get("/products", {
    //   params: {
    //     _page,
    //     _limit,
    //     brand,
    //     size,
    //     color,
    //     category,
    //     priceLT,
    //     priceGT,
    //     priceMin,
    //     priceMax,
    //     fromStar,
    //   },
    // });
    // const count = await axiosClient.get("/products");
    // return {
    //   data: productList.data,
    //   pagination: {
    //     page: _page,
    //     limit: _limit,
    //     total: count.data.length,
    //   },
    // };

    let brand = brandData?.join(",");
    let size = sizeData?.join(",");
    let color = colorData?.join(",");
    let category = categoryData?.join(",");
    const url = "/products";
    return axiosClient.get(url, {
      params: {
        brand,
        size,
        color,
        category,
        priceLT,
        priceGT,
        priceMin,
        priceMax,
        fromStar,
      },
    });
  },
  getAllSize(category) {
    const url = "/products/allSize";
    return axiosClient.get(url, {
      params: {
        category,
      },
    });
  },
  getAllColor(category) {
    const url = "/products/allColor";
    return axiosClient.get(url, {
      params: {
        category,
      },
    });
  },
  getAllProductDiscount() {
    const url = "/products/allProductDiscount";
    return axiosClient.get(url);
  },
  //search
  getAllProductBySearch(title) {
    const url = "/products";
    return axiosClient.get(url, {
      params: {
        title,
      },
    });
  },
  //search tuyet doi
  getAllProductBySearchTD(title) {
    const url = "/products/findProductByTitleTD";
    return axiosClient.get(url, {
      params: {
        title,
      },
    });
  },
  getAllProductDetail() {
    const url = "/products/allProductDetail";
    return axiosClient.get(url);
  },
  //bestseller
  getAllProductBestSeller() {
    const url = "/orders/getAllProductHotSales";
    return axiosClient.get(url);
  },
};

export default productApi;

import {
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import style from './FormUpdateProductDetail.module.scss';
import productAdminApi from 'api/admin/productAdminApi';
import { GlobalContext } from 'store/store';
import { ACTIOS } from 'store/actions';
import productApi from 'api/productApi';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  // emailInput: { padding: theme.spacing(2) },
  title: {
    color: '#444',
    marginBottom: '-10px',
  },
  submit: {
    background: 'black',
    width: '170px',
    height: '50px',
    color: '#fff',
    transition: 'all 0.6s',
    marginTop: '20px',
    '&:hover': {
      background: '#ba933e',
      transition: 'all 0.6s',
    },
  },
}));
function FormUpdateProduct(props) {
  const classes = useStyles();
  const [isOpenForm, setIsOpenForm] = useState('');
  const { dispatch } = useContext(GlobalContext);

  useEffect(() => {
    if (props.isForm) {
      setIsOpenForm(style.active);
    } else {
      setIsOpenForm('');
    }
  }, [props.isForm]);
  const cancelHandler = () => {
    setIsOpenForm('');
    props.onFormFalse(false);
  };

  const [size, setSize] = useState({ value: '', errorSize: undefined });
  const [color, setColor] = useState({ value: '', errorColor: undefined });
  const [price, setPrice] = useState({ value: '', errorPrice: undefined });
  const [percentSaleOff, setPercentSaleOff] = useState({
    value: '',
    errorPercentSaleOff: undefined,
  });

  const [quantity, setQuantity] = useState({
    value: '',
    errorQuantity: undefined,
  });
  const [imageDetail, setImageDetail] = useState({ img: '' });

  const handleSize = (e) => {
    if (e.target.value === '') {
      setSize({
        value: e.target.value,
        errorSize: 'Vui lòng nhập kích cỡ',
      });
    } else {
      setSize({
        value: e.target.value,
        errorSize: undefined,
      });
    }
  };
  const handleColor = (e) => {
    if (e.target.value === '') {
      setColor({
        value: e.target.value,
        errorColor: 'Vui lòng nhập màu sắc',
      });
    } else {
      setColor({
        value: e.target.value,
        errorColor: undefined,
      });
    }
  };
  const handlePrice = (e) => {
    if (e.target.value === '') {
      setPrice({
        value: e.target.value,
        errorPrice: 'Vui lòng nhập giá tiền',
      });
    } else {
      let val = e.target.value;
      val = val.replace(/,/g, '');
      if (val.length > 3) {
        let noCommas = Math.ceil(val.length / 3) - 1;
        let remain = val.length - noCommas * 3;
        let newVal = [];
        for (let i = 0; i < noCommas; i++) {
          newVal.unshift(val.substr(val.length - i * 3 - 3, 3));
        }
        newVal.unshift(val.substr(0, remain));
        setPrice({
          value: newVal,
          errorPrice: undefined,
        });
      } else {
        setPrice({
          value: val,
          errorPrice: undefined,
        });
      }
    }

    // setPrice(e.target.value);
  };
  const handleQuantity = (e) => {
    if (e.target.value === '') {
      setQuantity({
        value: e.target.value,
        errorQuantity: 'Vui lòng nhập số lượng',
      });
    } else {
      setQuantity({
        value: e.target.value,
        errorQuantity: undefined,
      });
    }
  };
  const handlePercentSaleOff = (e) => {
    if (e.target.value === '') {
      setPercentSaleOff({
        value: e.target.value,
        errorPercentSaleOff: 'Vui lòng nhập phần trăm giảm giá',
      });
    } else {
      setPercentSaleOff({
        value: e.target.value,
        errorPercentSaleOff: undefined,
      });
    }
  };

  useEffect(() => {
    setSize({ ...size, value: props.dataProductDetail?.size });
    setColor({ ...color, value: props.dataProductDetail?.color });
    setPrice({ ...price, value: props.dataProductDetail?.price.original });
    setPercentSaleOff({
      ...percentSaleOff,
      value: props.dataProductDetail?.price.discount * 100,
    });
    setImageDetail({
      img: props.dataProductDetail?.image,
    });
    setQuantity({ ...quantity, value: props.dataProductDetail?.countInStock }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.dataProductDetail]);

  const handleUpdateProductDetail = () => {
    const fetchRequestUpdateProductDetail = async () => {
      try {
        const requestUpdateProductDetail =
          await productAdminApi.updateProductDetail(
            props.dataProduct._id,
            props.dataProductDetail._id,
            {
              available: true,
              color_image: { color: color.value, image: imageDetail.img },
              countInStock: quantity.value,
              price: {
                original: price.value,
                discount: percentSaleOff.value / 100,
                currency: 'VNĐ',
              },
              size: size.value,
            }
          );
        if (requestUpdateProductDetail.status === 200) {
          props.onFormFalse(false);
          const fetchRequestGetProductDetail = async () => {
            try {
              props.dataProduct.productDetail.map(async (data) => {
                const requestGetProductDetail =
                  await productApi.getIdProductDetail(props.dataProduct._id);
                dispatch({
                  type: ACTIOS.dataAllProductDetail,
                  payload: requestGetProductDetail.data,
                });
              });
            } catch (error) {
              console.log(error);
            }
          };
          fetchRequestGetProductDetail();
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestUpdateProductDetail();
  };
  const handleAddImageDetail = (e) => {
    e.preventDefault();
    const fileSelected = e.target.files[0];
    const fd = new FormData();
    fd.append('uploadFile', fileSelected);
    axios
      .post(
        '//ec2-54-251-0-156.ap-southeast-1.compute.amazonaws.com/products/addFile',
        fd
      )
      .then((res) => {
        setImageDetail((pre) => {
          return { ...pre, img: res.data };
        });
      })
      .catch((aa) => {
        console.log('Khong Gui dc', aa);
      });
  };
  return (
    <div className={style.modalView}>
      <div className={`${style.backdropViewInformation} ${isOpenForm}`}></div>
      <div className={`${style.viewInformation} ${isOpenForm}`}>
        <div className={style.header}>
          <p>Cập nhật thông tin sản phẩm: {props.dataProduct.title}</p>
          <div onClick={cancelHandler}>
            <i className='fas fa-times'></i>
          </div>
        </div>
        <div className={style.formUpdateProduct}>
          <div className={`${style.form0} d-flex justify-content-between`}>
            <div className={`${style.image}`}>
              <Typography className={classes.title}>
                Hình ảnh chi tiết <span style={{ color: 'red' }}>*</span>
              </Typography>
              <div className={style.image_product_group}>
                <span className={style.select}>
                  Chọn tệp
                  <input
                    type='file'
                    onChange={handleAddImageDetail}
                    multiple
                    // onFocus={InputHandler}
                  />
                </span>
                <div className={style.image_product}>
                  <img src={imageDetail.img} alt='image_product' />
                </div>
              </div>
            </div>
            {/* <div className={style.image}>
              <Typography className={classes.title}>
                Hình ảnh sau <span style={{ color: "red" }}>*</span>
              </Typography>
              <div className={style.image_product_group}>
                <span className={style.select}>
                  Chọn tệp
                  <input
                    type="file"
                    // onChange={ChangeIMGAvatarHandler}
                    multiple
                    // onFocus={InputHandler}
                  />
                </span>
                <div className={style.image_product}>
                  <img src={aothun2_front} alt="image_product" />
                </div>
              </div>
            </div> */}
          </div>
          <div className={style.form1_form2}>
            <div className={`${style.form1} d-flex`}>
              <div
                style={{
                  paddingRight:
                    size.errorSize !== undefined ? '105px' : '165px',
                }}
              >
                <Typography className={classes.title}>
                  Kích cỡ <span style={{ color: 'red' }}>*</span>
                </Typography>
                <FormControl
                  variant='outlined'
                  name='size'
                  // inputRef={register}
                  error={!!size.errorSize}
                  style={{
                    width: size.errorSize !== undefined ? '165%' : '325%',
                    marginTop: '16px',
                  }}
                >
                  <InputLabel id='demo-simple-select-autowidth-label'>
                    Chọn kích cỡ
                  </InputLabel>
                  <Select
                    name='size'
                    labelId='demo-simple-select-autowidth-label'
                    id='demo-simple-select-autowidth'
                    value={size.value}
                    error={!!size.errorSize}
                    onChange={handleSize}
                    label='Chọn Kích Cỡ'
                  >
                    <MenuItem value='M'>M</MenuItem>
                    <MenuItem value='L'>L</MenuItem>
                    <MenuItem value='XL'>XL</MenuItem>
                    <MenuItem value='2XL'>2XL</MenuItem>
                    <MenuItem value='3XL'>3XL</MenuItem>
                  </Select>
                  {size.errorSize !== undefined && (
                    <span
                      style={{
                        fontSize: '0.75rem',
                        marginTop: '2px',
                        paddingLeft: '12px',
                        color: '#f44336',
                        fontWeight: '400',
                      }}
                    >
                      {size.errorSize}
                    </span>
                  )}
                </FormControl>
              </div>
              <div
                style={{
                  paddingRight:
                    color.errorSize !== undefined ? '105px' : '165px',
                }}
              >
                <Typography className={classes.title}>
                  Màu sắc <span style={{ color: 'red' }}>*</span>
                </Typography>

                <FormControl
                  variant='outlined'
                  name='size'
                  error={!!color.errorColor}
                  style={{
                    width: color.errorColor !== undefined ? '158%' : '292%',
                    marginTop: '16px',
                  }}
                >
                  <InputLabel id='demo-simple-select-autowidth-label'>
                    Chọn màu sắc
                  </InputLabel>
                  <Select
                    name='size'
                    labelId='demo-simple-select-autowidth-label'
                    id='demo-simple-select-autowidth'
                    value={color.value}
                    error={!!color.errorColor}
                    onChange={handleColor}
                    label=' Chọn màu sắc'
                  >
                    <MenuItem value='Xanh lá'>Xanh lá</MenuItem>
                    <MenuItem value='Đỏ'>Đỏ</MenuItem>
                    <MenuItem value='Đen'>Đen</MenuItem>{' '}
                    <MenuItem value='Trắng'>Trắng</MenuItem>
                    <MenuItem value='Xanh dương'>Xanh dương</MenuItem>{' '}
                    <MenuItem value='Nâu'>Nâu</MenuItem>{' '}
                    <MenuItem value='Cam'>Cam</MenuItem>{' '}
                    <MenuItem value='Hồng'>Hồng</MenuItem>
                    <MenuItem value='Vàng'>Vàng</MenuItem>
                    <MenuItem value='Tím'>Tím</MenuItem>
                    <MenuItem value='Xám'>Xám</MenuItem>
                  </Select>
                  {color.errorColor !== undefined && (
                    <span
                      style={{
                        fontSize: '0.75rem',
                        marginTop: '2px',
                        paddingLeft: '12px',
                        color: '#f44336',
                        fontWeight: '400',
                      }}
                    >
                      {color.errorColor}
                    </span>
                  )}
                </FormControl>
              </div>
              <div>
                <Typography className={classes.title}>
                  Giá <span style={{ color: 'red' }}>*</span>
                </Typography>
                <TextField
                  name='price'
                  label='Nhập giá tiền'
                  margin='normal'
                  variant='outlined'
                  fullWidth
                  value={price.value}
                  onChange={handlePrice}
                  error={!!price.errorPrice}
                  helperText={
                    price.errorPrice !== undefined ? price.errorPrice : ''
                  }
                />
              </div>
            </div>
            <div className={`${style.form2} d-flex`}>
              <div style={{ marginRight: '20px' }}>
                <Typography className={classes.title}>
                  Phần trăm giảm giá <span style={{ color: 'red' }}>*</span>
                </Typography>

                <TextField
                  name='percentSaleOff'
                  label='Nhập phần trăm giảm giá'
                  margin='normal'
                  variant='outlined'
                  fullWidth
                  value={percentSaleOff.value}
                  onChange={handlePercentSaleOff}
                  error={!!percentSaleOff.errorPercentSaleOff}
                  helperText={
                    percentSaleOff.errorPercentSaleOff !== undefined
                      ? percentSaleOff.errorPercentSaleOff
                      : ''
                  }
                />
              </div>
              <div>
                <Typography className={classes.title}>
                  Số lượng <span style={{ color: 'red' }}>*</span>
                </Typography>
                <TextField
                  name='quantity'
                  label='Nhập số lượng'
                  margin='normal'
                  variant='outlined'
                  fullWidth
                  type='number'
                  value={quantity.value}
                  onChange={handleQuantity}
                  error={!!quantity.errorQuantity}
                  helperText={
                    quantity.errorQuantity !== undefined
                      ? quantity.errorQuantity
                      : ''
                  }
                />
              </div>
            </div>
          </div>
          <div className={style.button} style={{ textAlign: 'right' }}>
            <Button
              type='submit'
              className={classes.submit}
              onClick={handleUpdateProductDetail}
            >
              Cập nhật sản phẩm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormUpdateProduct;

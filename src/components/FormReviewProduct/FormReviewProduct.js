import React from 'react';
import classes from './FormReviewProduct.module.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import reviewApi from 'api/reviewApi';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const FormReviewProduct = (props) => {
  const [isOpenForm, setIsOpenForm] = useState('');
  const loggedInUser = useSelector((state) => state.user.current);

  const cancelHandler = (e) => {
    e.preventDefault();
    setIsOpenForm('');
    props.onFormFalse(false);
  };

  useEffect(() => {
    if (props.isOpenFormReview) {
      setIsOpenForm(classes.active);
    } else {
      setIsOpenForm('');
    }
  }, [props.isOpenFormReview]);

  const [contentStart, setContentStart] = useState('Vui lòng đánh giá');
  const [star1, setStart1] = useState({ mouse: 'far fa-star', click: false });
  const [star2, setStart2] = useState({ mouse: 'far fa-star', click: false });
  const [star3, setStart3] = useState({ mouse: 'far fa-star', click: false });
  const [star4, setStart4] = useState({ mouse: 'far fa-star', click: false });
  const [star5, setStart5] = useState({ mouse: 'far fa-star', click: false });
  const [starValue, setStartValue] = useState();

  const handleFillStar1 = () => {
    if (!star1.click) {
      setStart1({ mouse: 'fas fa-star', click: false });
      setContentStart('Rất không hài lòng');
    }
  };
  const handleClickFillStar1 = () => {
    setStart1({ mouse: 'fas fa-star', click: true });
    setStart2({ mouse: 'far fa-star', click: true });
    setStart3({ mouse: 'far fa-star', click: true });
    setStart4({ mouse: 'far fa-star', click: true });
    setStart5({ mouse: 'far fa-star', click: true });
    setContentStart('Rất không hài lòng');
    setStartValue(1);
  };
  const handleNOTFillStar1 = () => {
    if (!star1.click) {
      setStart1({ mouse: 'far fa-star', click: false });
      setContentStart('Vui lòng đánh giá');
    }
  };
  const handleFillStar2 = () => {
    if (!star1.click && !star2.click) {
      setStart2({ mouse: 'fas fa-star', click: false });
      setStart1({ mouse: 'fas fa-star', click: false });

      setContentStart('Không hài lòng');
    }
  };
  const handleClickFillStar2 = () => {
    setStart2({ mouse: 'fas fa-star', click: true });
    setStart1({ mouse: 'fas fa-star', click: true });
    setStart3({ mouse: 'far fa-star', click: true });
    setStart4({ mouse: 'far fa-star', click: true });
    setStart5({ mouse: 'far fa-star', click: true });

    setContentStart('Không hài lòng');
    setStartValue(2);
  };
  const handleNOTFillStar2 = () => {
    if (!star1.click && !star2.click) {
      setStart2({ mouse: 'far fa-star', click: false });
      setStart1({ mouse: 'far fa-star', click: false });
      setContentStart('Vui lòng đánh giá');
    }
  };
  const handleFillStar3 = () => {
    if (!star1.click && !star2.click && !star3.click) {
      setStart3({ mouse: 'fas fa-star', click: false });
      setStart2({ mouse: 'fas fa-star', click: false });
      setStart1({ mouse: 'fas fa-star', click: false });
      setContentStart('Bình thường');
    }
  };
  const handleClickFillStar3 = () => {
    setStart3({ mouse: 'fas fa-star', click: true });
    setStart1({ mouse: 'fas fa-star', click: true });
    setStart2({ mouse: 'fas fa-star', click: true });
    setStart4({ mouse: 'far fa-star', click: true });
    setStart5({ mouse: 'far fa-star', click: true });
    setContentStart('Bình thường');
    setStartValue(3);
  };
  const handleNOTFillStar3 = () => {
    if (!star1.click && !star2.click && !star3.click) {
      setStart3({ mouse: 'far fa-star', click: false });
      setStart2({ mouse: 'far fa-star', click: false });
      setStart1({ mouse: 'far fa-star', click: false });
      setContentStart('Vui lòng đánh giá');
    }
  };
  const handleFillStar4 = () => {
    if (!star1.click && !star2.click && !star3.click && !star4.click) {
      setStart4({ mouse: 'fas fa-star', click: false });
      setStart3({ mouse: 'fas fa-star', click: false });
      setStart2({ mouse: 'fas fa-star', click: false });
      setStart1({ mouse: 'fas fa-star', click: false });
      setContentStart('Hài lòng');
    }
  };
  const handleClickFillStar4 = () => {
    setStart3({ mouse: 'fas fa-star', click: true });
    setStart1({ mouse: 'fas fa-star', click: true });
    setStart2({ mouse: 'fas fa-star', click: true });
    setStart4({ mouse: 'fas fa-star', click: true });
    setStart5({ mouse: 'far fa-star', click: true });
    setContentStart('Hài lòng');
    setStartValue(4);
  };
  const handleNOTFillStar4 = () => {
    if (!star1.click && !star2.click && !star3.click && !star4.click) {
      setStart4({ mouse: 'far fa-star', click: false });
      setStart3({ mouse: 'far fa-star', click: false });
      setStart2({ mouse: 'far fa-star', click: false });
      setStart1({ mouse: 'far fa-star', click: false });
      setContentStart('Vui lòng đánh giá');
    }
  };
  const handleFillStar5 = () => {
    if (
      !star1.click &&
      !star2.click &&
      !star3.click &&
      !star4.click &&
      !star5.click
    ) {
      setStart5({ mouse: 'fas fa-star', click: false });
      setStart4({ mouse: 'fas fa-star', click: false });
      setStart3({ mouse: 'fas fa-star', click: false });
      setStart2({ mouse: 'fas fa-star', click: false });
      setStart1({ mouse: 'fas fa-star', click: false });
      setContentStart('Cực kì hài lòng');
    }
  };
  const handleClickFillStar5 = () => {
    setStart3({ mouse: 'fas fa-star', click: true });
    setStart1({ mouse: 'fas fa-star', click: true });
    setStart2({ mouse: 'fas fa-star', click: true });
    setStart4({ mouse: 'fas fa-star', click: true });
    setStart5({ mouse: 'fas fa-star', click: true });
    setContentStart('Cực kì hài lòng');
    setStartValue(5);
  };
  const handleNOTFillStar5 = () => {
    if (!star1.click && !star2.click) {
      setStart5({ mouse: 'far fa-star', click: false });
      setStart4({ mouse: 'far fa-star', click: false });
      setStart3({ mouse: 'far fa-star', click: false });
      setStart2({ mouse: 'far fa-star', click: false });
      setStart1({ mouse: 'far fa-star', click: false });
      setContentStart('Vui lòng đánh giá');
    }
  };
  const [imageReview, setImageReview] = useState({ img: '' });
  const [comment, setComment] = useState('');

  const handleAddImageReview = (e) => {
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
        console.log(res);
        setImageReview((pre) => {
          return { ...pre, img: res.data };
        });
      })
      .catch((aa) => {
        console.log('Khong Gui dc', aa);
      });
  };
  const handleComment = (e) => {
    setComment(e.target.value);
  };
  const handleAddReview = () => {
    const fetchRequestAddReview = async () => {
      try {
        const requestAddReview = await reviewApi.addReview({
          userId: loggedInUser._id,
          comment: comment,
          rating: starValue,
          image: imageReview.img,
          ProductDetailId: props.dataProductDetail.productDetailId,
        });
        console.log(requestAddReview);
        if (requestAddReview.status === 200) {
          if (
            requestAddReview.data.message ===
            ' Bạn đã đánh giá cho sản phẩm này rồi'
          ) {
            toast.error('Bạn đã đánh giá sản phẩm này rồi', {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 2000,
            });
          } else {
            props.onFormFalse(false);
            props.onActiveNotifyReview(true);
          }
        }
      } catch (error) {
        console.log(error);
        toast.error('Bạn cần nhập đánh giá', {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
        });
      }
    };
    fetchRequestAddReview();
  };
  return (
    <div className={classes.modalFormReview}>
      <div className={` ${classes.backdrop} ${isOpenForm}`}></div>
      <div
        className={` ${classes.viewFormReview} ${isOpenForm} ${
          imageReview.img !== '' ? classes.activeHeight : ''
        }`}
      >
        <div className={classes.header}>
          <div className={`${classes.image_item_order}`}>
            <img src={props.image} alt='img'></img>
            <div className={classes.name_order}>
              {props.titleProduct} -{' '}
              <span className={classes.size_order}>
                Size: <b style={{ fontSize: '15px' }}> {props.size}</b>
              </span>
              <div>
                <span className={classes.color_order}>
                  Màu: <b style={{ fontSize: '15px' }}> {props.color}</b>
                </span>{' '}
              </div>
              <div>
                <p className={classes.brand_order}>
                  Thương hiệu:{' '}
                  <b style={{ fontSize: '15px' }}> {props.brand}</b>
                </p>
              </div>
            </div>
          </div>
          <div className={classes.cancel} onClick={cancelHandler}>
            <div className={classes.blur}>
              <i className='bi bi-x'></i>
            </div>
          </div>
        </div>
        <div className={classes.body}>
          <h5 className='text-center'>{contentStart}</h5>
          <div className={`${classes.fivestar} d-flex justify-content-center`}>
            <span>
              <i
                className={star1.mouse}
                style={{ color: '#ba933e' }}
                onMouseEnter={handleFillStar1}
                onMouseLeave={handleNOTFillStar1}
                onClick={handleClickFillStar1}
              ></i>
              <i
                className={star2.mouse}
                style={{ color: '#ba933e' }}
                onMouseEnter={handleFillStar2}
                onMouseLeave={handleNOTFillStar2}
                onClick={handleClickFillStar2}
              ></i>
              <i
                className={star3.mouse}
                style={{ color: '#ba933e' }}
                onMouseEnter={handleFillStar3}
                onMouseLeave={handleNOTFillStar3}
                onClick={handleClickFillStar3}
              ></i>
              <i
                className={star4.mouse}
                style={{ color: '#ba933e' }}
                onMouseEnter={handleFillStar4}
                onMouseLeave={handleNOTFillStar4}
                onClick={handleClickFillStar4}
              ></i>
              <i
                className={star5.mouse}
                style={{ color: '#ba933e' }}
                onMouseEnter={handleFillStar5}
                onMouseLeave={handleNOTFillStar5}
                onClick={handleClickFillStar5}
              ></i>
            </span>
          </div>{' '}
          <div className={classes.describe}>
            <textarea
              rows='6'
              cols='58'
              placeholder='Nhập đánh giá của bạn'
              onChange={handleComment}
              className={`${classes.area} pt-3`}
              value={comment}
            ></textarea>{' '}
          </div>
        </div>
        <div className={classes.footer}>
          {imageReview.img !== '' && (
            <div className={classes.image_review}>
              <img src={imageReview.img} alt='img' />
            </div>
          )}

          <div className={classes.button}>
            <span className={classes.select}>
              <i class='fas fa-camera' style={{ marginRight: '7px' }}></i>
              Thêm ảnh
              <input type='file' onChange={handleAddImageReview} multiple />
            </span>
            <button className={classes.confirm} onClick={handleAddReview}>
              Gửi đánh giá
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormReviewProduct;

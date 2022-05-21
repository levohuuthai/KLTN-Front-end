import React from "react";
import PropTypes from "prop-types";
import { Box, Grid, makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

CartSkeletonPage.propTypes = {
  length: PropTypes.number,
};

CartSkeletonPage.defaultProps = {
  length: 3,
};
const useStyles = makeStyles((theme) => ({
  box: {
    marginTop: "12px",
    paddingTop: "20px",
  },
  // skeleton_cancel: {
  //   marginTop: "27px",
  //   30px",marginLeft: "1
  // },
  checkbox: {
    marginRight: "10px",
  },
  skeleton_image: {
    marginRight: "70px",
  },
  nameProduct: {
    marginRight: "70px",
  },
  priceProduct: {
    marginRight: "90px",
  },
  quantityProduct: {
    marginRight: "120px",
  },
  totalProduct: {
    marginRight: "45px",
  },
  box2: {
    marginTop: "25px",
  },
  grid: {
    marginTop: "-30px",
  },
  skeleton_left: {
    marginRight: "10px",
  },
}));
function CartSkeletonPage({ length }) {
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <Grid container>
        {Array.from(new Array(length)).map((x, index) => (
          <Grid
            item
            key={index}
            xs={12}
            md={12}
            lg={12}
            className={classes.grid}
          >
            <Box padding={0} className={`d-flex align-items-center`}>
              <Skeleton
                variant="rect"
                width={20}
                height={20}
                className={classes.checkbox}
              />
              <Skeleton
                varient="rect"
                width="10%"
                height={118}
                className={classes.skeleton_image}
              />{" "}
              <Skeleton
                width="20%"
                height={15}
                className={classes.nameProduct}
              />
              <Skeleton
                width="10%"
                height={15}
                className={classes.priceProduct}
              />
              <Skeleton
                width="5%"
                height={15}
                className={classes.quantityProduct}
              />{" "}
              <Skeleton
                width="10%"
                height={15}
                className={classes.totalProduct}
              />
           
              <Skeleton
                variant="circle"
                width={15}
                height={15}
                className={classes.skeleton_cancel}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CartSkeletonPage;

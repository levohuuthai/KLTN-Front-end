import React from "react";
import PropTypes from "prop-types";
import { Box, Grid, makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

ProductSkeletonList.propTypes = {
  length: PropTypes.number,
};

ProductSkeletonList.defaultProps = {
  length: 12,
};
const useStyles = makeStyles((theme) => ({
  box1: {
    marginTop: "-120px",
  },
  price: { marginTop: "-60px" },
  box2: {
    marginRight: "90px",
  },
}));
function ProductSkeletonList({ length }) {
  const classes = useStyles();

  return (
    <Box className={classes.box1}>
      <Grid container>
        {Array.from(new Array(length)).map((x, index) => (
          <Grid item key={index} xs={12} md={4} lg={4}>
            <Box className={classes.box2}>
              <Skeleton varient="rect" width="100%" height={500} />
              <Skeleton width="60%" className={classes.price} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductSkeletonList;

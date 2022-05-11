import React from "react";
import PropTypes from "prop-types";
import { Box, Grid, makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

CartSkeletonList.propTypes = {
  length: PropTypes.number,
};

CartSkeletonList.defaultProps = {
  length: 3,
};
const useStyles = makeStyles((theme) => ({
  box: {
    marginTop: "12px",
  },
  skeleton_cancel: {
    marginTop: "27px",
    marginLeft: "130px",
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
function CartSkeletonList({ length }) {
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
            <Box padding={0} className={`d-flex justify-content`}>
              <Skeleton
                varient="rect"
                width="30%"
                height={118}
                className={classes.skeleton_left}
              />
              <div className={`${classes.box2} `}>
                <Skeleton width="2700%" height={15} />
                <Skeleton width="2700%" height={15} />
                <Skeleton width="2700%" height={15} />
              </div>{" "}
              <div>
                <Skeleton
                  variant="circle"
                  width={15}
                  height={15}
                  className={classes.skeleton_cancel}
                />
              </div>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CartSkeletonList;

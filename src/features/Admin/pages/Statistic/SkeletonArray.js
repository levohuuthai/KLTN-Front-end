import React from "react";
import PropTypes from "prop-types";
import { Box, Grid, makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

SkeletonArray.propTypes = {
  length: PropTypes.number,
};

SkeletonArray.defaultProps = {
  length: 3,
};
const useStyles = makeStyles((theme) => ({
  top: {
    width: "10%",
    background: "#999966",
    marginRight: "30px",
    marginLeft: "10px",
  },

  id_order: {
    width: "20%",
    background: "#999966",
    marginRight: "20px",
  },
  priceProduct: {
    background: "#999966",
    width: "20%",
    marginRight: "20px",
  },
  namecustomer: {
    background: "#999966",
    width: "20%",
    marginRight: "30px",
  },
  createDay: {
    background: "#999966",
    width: "20%",
  },
  box2: {
    marginTop: "25px",
  },
  grid: {
    marginTop: "10px",
  },
}));
function SkeletonArray({ length }) {
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <Grid container>
        {Array.from(new Array(3)).map((x, index) => (
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
                width={10}
                height={20}
                className={classes.top}
              />
              <Skeleton width="20%" height={15} className={classes.id_order} />
              <Skeleton
                width="20%"
                height={15}
                className={classes.priceProduct}
              />
              <Skeleton
                width="20%"
                height={15}
                className={classes.namecustomer}
              />{" "}
              <Skeleton width="20%" height={15} className={classes.createDay} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default SkeletonArray;

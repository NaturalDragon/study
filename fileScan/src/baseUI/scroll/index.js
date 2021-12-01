import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import BScroll from "better-scroll";
import Loading from "./../loading/index";
import Loading2 from "./../loading-v2/index";
import _ from "underscore";
import styles from "./index.less";

const Scroll = forwardRef((props, ref) => {
  const {
    click,
    height,
    direction,
    refresh,
    bounceTop,
    bounceBottom,
    pullDownLoading,
    pullUpLoading,
  } = props;
  const { pullUp, pullDown, onScroll, onScrollTo } = props;
  const [bScroll, setBScroll] = useState();
  const [count, setCount] = useState(0);
  const scrollContaninerRef = useRef();
  let pullUpDebounce = useMemo(() => {
    return _.debounce(pullUp, 500);
  }, [pullUp]);
  let pullDownDebounce = useMemo(() => {
    return _.debounce(pullDown, 500);
  }, [pullDown]);
  useEffect(() => {
    if (height) {
      scrollContaninerRef.current.style.height = height + "px";
    }
    const scroll = new BScroll(scrollContaninerRef.current, {
      scrollX: direction === "horizental",
      scrollY: direction === "vertical",
      click: click,
      probeType: 3,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom,
      },
    });

    setBScroll(scroll);
    setCount(1000);
    return () => {
      setBScroll(null);
      setCount(0);
    };
  }, []);

  useEffect(() => {
    if (!bScroll || !onScroll) return;
    bScroll.on("scroll", onScroll);
    return () => {
      bScroll.off("scroll", onScroll);
    };
  });
  useEffect(() => {
    if (!bScroll || !onScrollTo) return;
    bScroll.on("scrollTo", onScrollTo);
    return () => {
      bScroll.off("scrollTo", onScrollTo);
    };
  });
  useEffect(() => {
    if (!bScroll || !pullUp) return;
    const handlePullUp = () => {
      //判断是否滑动到了底部
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUpDebounce();
      }
    };
    bScroll.on("scrollEnd", handlePullUp);
    return () => {
      bScroll.off("scrollEnd", handlePullUp);
    };
  }, [pullUp, pullUpDebounce, bScroll]);

  useEffect(() => {
    if (!bScroll || !pullDown) return;
    const handlePullDown = (pos) => {
      //判断用户的下拉动作
      if (pos.y > 50) {
        pullDownDebounce();
      }
    };
    bScroll.on("touchEnd", handlePullDown);
    return () => {
      bScroll.off("touchEnd", handlePullDown);
    };
  }, [pullDown, pullDownDebounce, bScroll]);

  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh();
    }
  });
  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
    getBScroll() {
      var a = count;

      if (bScroll) {
        return bScroll;
      }
    },
  }));
  const PullUpdisplayStyle = pullUpLoading
    ? { display: "" }
    : { display: "none" };
  const pullDowndisplayStyle = pullDownLoading
    ? { display: "" }
    : { display: "none" };
  return (
    <div className={styles.scrollContainer} ref={scrollContaninerRef}>
      {props.children}
      <div className={styles.pullUpLoading} style={PullUpdisplayStyle}>
        <Loading></Loading>
      </div>
      <div className={styles.pullDownLoading} style={pullDowndisplayStyle}>
        <Loading2></Loading2>
      </div>
    </div>
  );
});

Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  refresh: true,
  onScroll: null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  height: 0,
  bounceBottom: true,
};
Scroll.propTypes = {
  direction: PropTypes.oneOf(["vertical", "horizental"]),
  refresh: PropTypes.bool,
  onScroll: PropTypes.func,
  pullUp: PropTypes.func,
  pullDown: PropTypes.func,
  pullUpLoading: PropTypes.bool,
  height: PropTypes.number,
  pullDownLoading: PropTypes.bool,
  bounceTop: PropTypes.bool, //是否支持向上吸顶
  bounceBottom: PropTypes.bool, //是否支持向下吸顶
};
export default Scroll;

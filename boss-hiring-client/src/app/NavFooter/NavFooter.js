import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/users/currentUserSlice";
import { TabBar } from "antd-mobile";
import "./navFooter.less";

NavFooter.propTypes = {
  navList: PropTypes.array.isRequired,
};

export default function NavFooter(props) {
  const navList = props.navList;
  const location = useLocation();
  const history = useHistory();
  const user = useSelector(selectCurrentUser);

  return (
    <div>
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
      >
        {navList.map((nav, idx) => (
          <TabBar.Item
            title={
              idx === 0
                ? user.type === "recruiter"
                  ? "Job Seekers"
                  : "Recruiters"
                : nav.title
            }
            key={nav.key}
            icon={{
              uri: require(`./images/${nav.key}.png`),
              style: {
                width: "22px",
                height: "22px",
                background: `center center /  21px 21px no-repeat`,
              },
            }}
            selectedIcon={{
              uri: require(`./images/${nav.key}-selected.png`),
              style: {
                width: "22px",
                height: "22px",
                background: `center center /  21px 21px no-repeat`,
              },
            }}
            selected={
              `/home${nav.path}` === location.pathname ||
              `/home${nav.path}/` === location.pathname
            }
            onPress={() =>
              `/home${nav.path}` === location.pathname ||
              `/home${nav.path}/` === location.pathname
                ? null
                : history.push(`/home${nav.path}`)
            }
          ></TabBar.Item>
        ))}
      </TabBar>
    </div>
  );
}

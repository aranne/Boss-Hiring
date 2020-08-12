import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { TabBar } from "antd-mobile";

NavFooter.propTypes = {
  navList: PropTypes.array.isRequired,
};

export default function NavFooter(props) {
  const navList = props.navList;
  const location = useLocation();
  const history = useHistory();

  return (
    <div>
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
      >
        {navList.map((nav) => (
          <TabBar.Item
            title={nav.title}
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
            selected={`/home${nav.path}` === location.pathname}
            onPress={() => history.push(`/home${nav.path}`)}
          >
          </TabBar.Item>
        ))}
      </TabBar>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
// compoents =>{
import { TabElement } from "./TabElement";
import { Box, IconButton, Stack, Tabs } from "@chakra-ui/react";
// }
// react router =>{
import { useLocation } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
// }

export const TabsMenu = ({ TabsValues }) => {
  const TabsMenuRef = useRef();
  // pathname cahnging handler =>{
  const { pathname } = useLocation();
  function getStringAfterSlash(str) {
    const lastIndex = str.lastIndexOf("/");

    if (lastIndex !== -1) {
      const substring = str.substring(lastIndex + 1);
      return substring;
    } else {
      return str;
    }
  }
  const getPathNameIndex = () => {
    return TabsValues?.indexOf(
      TabsValues?.find((item) => {
        return item.href === getStringAfterSlash(pathname);
      })
    );
  };
  const [value, setValue] = useState(getPathNameIndex());
  const HandleChange = (index) => {
    setValue(index);
  };
  // }
  // expand tabs menu handler =>{
  const [expand, setExpnad] = useState(true);
  const ExpandMenu = () => {
    setExpnad(!expand);
  };
  // }
  return (
    <Stack bgColor="gray.50" h="100%" alignItems="center">
      <Box
        display="flex"
        justifyContent="center"
        p="9px"
        borderBottom="2px"
        w="100%"
        borderBottomColor="gray.100"
      >
        <IconButton
          onClick={ExpandMenu}
          borderRadius="50%"
          colorScheme="blue"
          minW="50px"
          minH="50px"
          m="0 auto"
        >
          <MenuOutlined />
        </IconButton>
      </Box>

      <Tabs
        orientation="vertical"
        flexDirection="column"
        alignItems="center"
        w={`${expand ? "220px" : "80px"}`}
        h="100%"
        overflowX="hidden"
        overflowY="auto"
        index={value}
        onChange={HandleChange}
        transition="0.3s"
        borderLeft="2px"
        borderLeftColor="gray.200"
        className="scrollable"
        ref={TabsMenuRef}
      >
        {TabsValues?.map((tab, index) => {
          return (
            <TabElement
              key={index}
              href={tab.href}
              title={tab.title}
              icon={tab.icon}
              expand={expand}
              childLinks={tab.childsLinks}
            />
          );
        })}
      </Tabs>
    </Stack>
  );
};

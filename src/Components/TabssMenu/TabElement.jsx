import React, { useState } from "react";
// react router =>{
import { Link } from "react-router-dom";
// }
// chakra componens =>{
import {
  Tab,
  Icon,
  AccordionIcon,
  Tabs,
  AccordionPanel,
  AccordionItem,
  AccordionButton,
  Accordion,
  Button,
} from "@chakra-ui/react";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { ArrowRightIcon } from "@chakra-ui/icons";
// }
export const TabElement = ({ expand, title, href, icon, childLinks }) => {
  return childLinks && expand ? (
    <Tab {...styles.tab}>
      <Accordion w="100%" h="100%" allowToggle>
        <AccordionItem border="none">
          <AccordionButton
            as={Link}
            display="flex"
            justifyContent="start"
            gap="10px"
            to={href}
            p="17px"
          >
            {icon}
            {expand && title}

            <AccordionIcon ml="auto" />
          </AccordionButton>

          <Tabs as={AccordionPanel} {...styles.tabs}>
            {childLinks.map((child, index) => {
              return (
                <Tab
                  as={Link}
                  to={child.href}
                  key={index}
                  m="0"
                  w="100%"
                  borderTop="1px"
                  borderTopColor="gray.400"
                  justifyContent="start"
                  gap="3"
                  _hover={{
                    bgColor: "gray.200",
                  }}
                  _selected={{
                    bgColor: "gray.200",
                    color: "blue.800",
                    ".icon": {},
                  }}
                  fontSize="xs"
                  textAlign="left"
                >
                  <ArrowRightOutlined />

                  {child.title}
                  {child.icon}
                </Tab>
              );
            })}
          </Tabs>
        </AccordionItem>
      </Accordion>
    </Tab>
  ) : (
    <Tab {...styles.tab}>
      <Link
        style={{
          display: "flex",
          justifyContent: expand ? "start" : "center",
          alignItems: "center",
          gap: "10px",
          width: "100%",
          height: "100%",
          padding: "17px",
        }}
        to={href}
      >
        {icon}
        {expand && title}
      </Link>
    </Tab>
  );
};
const styles = {
  tab: {
    _selected: {
      bgColor: "gray.100",
      borderLeft: "2px",
      borderLeftColor: "blue.800",
      color: "blue.900",
    },
    _hover: {
      bgColor: "gray.100",
      borderLeft: "2px",
      borderLeftColor: "blue.800",
      color: "blue.900",
    },
    w: "100%",
    mb: "14px",
    bgColor: "gray.50",
    gap: "10px",
    fontWeight: "600",
    fontSize: "md",
    alignItems: "center",
    justifyContent: "center",
    textOverflow: "ellipsis",
    p: "0px",
    flexShrink: "0",
    borderRadius: "0",
  },
  tabs: {
    orientation: "vertical",
    flexDirection: "column",
    alignItems: "center",
    h: "100%",
    w: "100%",
    p: "0",
    bgColor: "gray.100",
    overflowX: "hidden",
    overflowY: "auto",
    transition: "0.3s",
    borderLeft: "2px",
    borderLeftColor: "gray.200",
    className: "scrollable",
  },
};

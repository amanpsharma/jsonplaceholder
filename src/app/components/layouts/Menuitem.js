import React from "react";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import PromoGift from "@material-ui/icons/CardGiftcard";
import UserIcon from "@material-ui/icons/VerifiedUser";

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default () => {
  let menufields = [
    {
      label: "User",
      link: "/users",
      Icon: <UserIcon />,
      title: "User",
    },
    {
      label: "Post",
      link: "/post",
      Icon: <InboxIcon />,
      title: "Post",
    },
    {
      label: "Album",
      link: "/album",
      Icon: <PromoGift />,
      title: "Album",
    },
  ];
  return menufields;
};

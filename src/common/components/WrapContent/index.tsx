import React, { FC } from "react";
import { WrapContentStyles } from "./styles";

type WrapContentProps = {
  children?: any;
  title: string;
};

const WrapContent: FC<WrapContentProps> = ({ children, title }) => {
  return (
    <WrapContentStyles>
      <h2 className="title">{title}</h2>
      {children}
    </WrapContentStyles>
  );
};

export default WrapContent;

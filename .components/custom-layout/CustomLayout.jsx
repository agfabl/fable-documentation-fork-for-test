import React, { useEffect, useState } from "react";
import "../index.css";
import TOC from "../toc";
import SupportBanner from "../support-banner";

const menuIconUrl =
  "https://fable-tour-app-gamma.s3.ap-south-1.amazonaws.com/root/usr/org/206/443a5a856de3425a8baa9eae3f2befb4";

const CustomLayout = (props) => {
  const {
    headerComp: Header,
    sidepanelComp: Sidepanel,
    footerComp: Footer,
    contentFooterComp: ContentFooter,
  } = props;

  const [showSidePanel, setShowSidePanel] = useState("init");

  return (
    <>
      <Header />
      <div className="content-con">
        <Sidepanel show={showSidePanel} closeSidepanel={() => setShowSidePanel(false)} />
        <div className="content">
          <button type="button" className="menu-icon">
            <img
              style={{ cursor: "pointer"}}
              src={menuIconUrl}
              alt=""
              width={28}
              height={28}
              onClick={() =>
                setShowSidePanel((prev) =>
                  prev === "init" || !prev ? true : false
                )
              }
            />
          </button>
          {props.children}
          <SupportBanner />
          <ContentFooter />
        </div>
        <TOC toc={props.toc.length && props.toc} />
      </div>
      <Footer />
    </>
  );
};

export default CustomLayout;

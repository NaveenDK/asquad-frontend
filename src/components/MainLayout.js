import React from "react";

const MainLayout = ({ children, title, start_date, end_date }) => {
  return (
    <div>
      <div className="customContainer">
        <div className="customSubWrap">
          <h5 className="customTitle">
            {title} {start_date} {end_date}
          </h5>
          <div className="innerContentWrap">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

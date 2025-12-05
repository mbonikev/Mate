import { ConfigProvider, Dropdown, Menu } from "antd";
import React, { useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { LuGithub } from "react-icons/lu";
import { Link } from "react-router-dom";

function StickyNav() {
  const items = [
    // {
    //   key: "1",
    //   label: (
    //     <Link
    //       to={`/`}
    //       className="text-sm font-medium tracking-tight flex items-center justify-start w-full gap-2"
    //     >
    //       Generate Random Quotes
    //     </Link>
    //   ),
    // },
    {
      key: "3",
      label: (
        <a
          href="https://rapidapi.com/martin.svoboda/api/quotes15"
          target="_blank"
          className="text-sm font-medium tracking-tight flex flex-col min-w-[170px] items-start justify-start w-full gap-0"
        >
          <span className="text-xs font-normal text-dark-color/70">
            Credits
          </span>
          Rapid API
        </a>
      ),
    },
    // {
    //   key: "4",
    //   label: (
    //     <Link
    //       to={`/tools_techs`}
    //       className="text-sm font-medium tracking-tight flex items-center justify-start w-full gap-2"
    //     >
    //       Tools & Tech
    //     </Link>
    //   ),
    // },
    {
      key: "divider",
      label: <div className="ant-dropdown-menu-item-divider" />, // Custom divider
    },
    // {
    //   key: "2",
    //   label: (
    //     <a
    //       href="https://kevinmk.onrender.com"
    //       target="_blank"
    //       className="text-sm font-medium tracking-tight flex flex-col items-start justify-start w-full gap-0"
    //     >
    //       <span className="text-xs font-normal text-dark-color/70">
    //         Creator
    //       </span>
    //       Kevin K. Mbonimpaye
    //     </a>
    //   ),
    // },
    {
      key: "5",
      label: (
        <a
          href="https://github.com/kevindermot99/Mate"
          target="_blank"
          className="text-sm font-medium tracking-tight flex flex-col items-start justify-start w-full gap-[2px]"
        >
          <span className="text-xs font-normal text-dark-color/70">
            Give me a star
          </span>
          <span className=" flex items-center gap-1">
            <LuGithub className="text-lg" />
            Source Code
          </span>
        </a>
      ),
    },
  ];

  const menuItems = items.map((item) => {
    if (item.key === "divider") return { type: "divider", key: item.key };
    return {
      key: item.key,
      label: item.label,
    };
  });

  return (
    <div className="sticky p-3 right-0 left-0 mx-auto h-[80px] w-fit min-w-[450px] max-md:min-w-full z-20">
      <div className=" bg-stone-100/60 rounded-full p-3 mb-6 w-full h-full flex items-center justify-between">
        <h1 className="font-bold text-2xl tracking-tight px-4 max-sm:text-lg">
          QuoteMate.
        </h1>
        <div className="flex items-center gap-3 justify-end px-4 tracking-tight text-dark-color/80">
          <ConfigProvider
            theme={{
              token: {
                // Seed Token
                borderRadius: 9,
                controlItemBgHover: "rgb(231 229 228 / 0.8)",
                zIndexPopupBase: -30,
              },
            }}
          >
            <Dropdown
              menu={{ items: menuItems }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <div className="text-dark-color/60 hover:text-dark-color text-3xl max-md:text-2xl font-semibold flex items-center gap-[2px] cursor-pointer">
                <HiMenuAlt4 />
              </div>
            </Dropdown>
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
}

export default StickyNav;

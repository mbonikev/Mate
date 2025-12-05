import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {
  LuCheck,
  LuChevronDown,
  LuCopy,
  LuGlasses,
} from "react-icons/lu";
import { HiSparkles } from "react-icons/hi2";
import { ConfigProvider, Dropdown } from "antd";
import { Tooltip } from "antd";
import "ldrs/squircle";
import StickyNav from "../components/StickyNav";

function Home() {
  const [result, setResult] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [animateShowMore, setAnimateShowMore] = useState(false);
  const [animateFetch, setAnimateFetch] = useState(false);
  const [coppied, setCoppied] = useState(false);

  const welcomeResult = {
    content: "Simplicity is the ultimate sophistication.",
    originator: {
      description:
        "Leonardo da Vinci, known for his genius in both art and science, believed that true elegance comes from simplicity. This quote reflects his approach to life and work, where he often sought to distill complex ideas into their simplest, most beautiful forms. Whether in his art or inventions, da Vinci mastered the balance of sophistication and simplicity.",
      name: "Leonardo da Vinci",
    },
  };

  const location = useLocation();

  const handleNewQuote = () => {
    const options = {
      method: "GET",
      url: import.meta.env.VITE_API_URL,
      params: {
        language_code: "en",
      },
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
        "x-rapidapi-host": import.meta.env.VITE_RAPIDAPI_HOST,
      },
    };

    const getQuote = async () => {
      setAnimateFetch(true);
      // console.log("clicked");
      try {
        const response = await axios.request(options);
        // console.log(response.data);
        setResult(response.data);
        localStorage.setItem("quoteCache", JSON.stringify(response.data));
        setAnimateFetch(false);
        setShowMore(showMore);
      } catch (error) {
        console.error(error);
      }
    };

    getQuote();
  };

  useEffect(() => {
    const cache = localStorage.getItem("quoteCache") || [];
    if (cache.length > 0) {
      setResult(JSON.parse(cache));
    } else {
      setResult(welcomeResult);
    }
  }, []);

  const copyQO = () => {
    navigator.clipboard.writeText(`❝${result.content}❞`);
    setCoppied(true);
    setTimeout(() => {
      setCoppied(false);
    }, 900);
  };

  const copyQAA = () => {
    navigator.clipboard.writeText(
      `❝${result.content}❞\n— ${result.originator.name}`
    );
    setCoppied(true);
    setTimeout(() => {
      setCoppied(false);
    }, 900);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(
      `❝${result.content}❞\n\n— ${result.originator.name}\n\n${result.originator.description}`
    );
    setCoppied(true);
    setTimeout(() => {
      setCoppied(false);
    }, 900);
  };

  const items = [
    {
      key: "1",
      label: (
        <button onClick={copyQO} className="text-sm font-medium tracking-tight">
          Copy Quote only
        </button>
      ),
    },
    {
      key: "2",
      label: (
        <button
          onClick={copyQAA}
          className="text-sm font-medium tracking-tight"
        >
          Copy Quote & Author
        </button>
      ),
    },
    {
      key: "3",
      label: (
        <button
          onClick={copyAll}
          className="text-sm font-medium tracking-tight"
        >
          Copy Everything
        </button>
      ),
    },
  ];

  const handleShowMore = () => {
    if (!showMore) {
      setAnimateShowMore(true);
      setTimeout(() => {
        setShowMore(true);
        setAnimateShowMore(false);
      }, 900);
    } else {
      setShowMore(false);
      setAnimateShowMore(false);
    }
  };

  return (
    <div className="flex flex-col h-fit w-full bg-[#cdd3b7]">
      {/* Sticky nav */}
      <StickyNav />
      <div className="w-full h-full pt-[80px] flex flex-col items-center justify-center text-lg">
        <div className="w-full max-w-[1080px] pt-10 max-md:pt-0 px-10 relative">
          <p className="pb-4 text-sm Cascadia text-dark-color/70">quote:</p>
          <h1 className="font-bold text-4xl max-md:text-2xl tracking-tight">
            {result !== "" && "❝" + result.content + "❞"}
          </h1>
          <p className="pt-4 Cascadia text-dark-color/90">
            {result !== "" && "— " + result.originator.name}
          </p>
          {animateShowMore && (
            <div className="py-4 ">
              <svg
                className="container"
                x="0px"
                y="0px"
                viewBox="0 0 20 20"
                height="20"
                width="20"
                preserveAspectRatio="xMidYMid meet"
              >
                <path
                  className="track"
                  fill="none"
                  strokeWidth="5"
                  pathLength="100"
                  d="M0.37 18.5 C0.37 5.772 5.772 0.37 18.5 0.37 S36.63 5.772 36.63 18.5 S31.228 36.63 18.5 36.63 S0.37 31.228 0.37 18.5"
                ></path>
                <path
                  className="car"
                  fill="none"
                  strokeWidth="5"
                  pathLength="100"
                  d="M0.37 18.5 C0.37 5.772 5.772 0.37 18.5 0.37 S36.63 5.772 36.63 18.5 S31.228 36.63 18.5 36.63 S0.37 31.228 0.37 18.5"
                ></path>
              </svg>
            </div>
          )}
          {showMore && (
            <p
              className={`pt-4 Cascadia text-sm text-justify text-dark-color/90`}
            >
              {result !== "" && result.originator.description !== ""
                ? result.originator.description
                : "No description"}
            </p>
          )}
          <div className="flex items-center justify-end gap-2 py-4 sticky bottom-0 bg-[#cdd3b7] mt-4">
            {/* blender */}
            <div className="absolute -top-3 left-0 w-full h-3 bg-gradient-to-b from-transparent to-[#cdd3b7]"></div>
            <ConfigProvider
              theme={{
                token: {
                  // Seed Token
                  borderRadius: 6,
                  controlItemBgHover: "rgb(231 229 228 / 0.8)",
                },
              }}
            >
              <Dropdown
                menu={{
                  items,
                }}
                trigger={["click"]}
                placement="bottomRight"
              >
                <div className="text-dark-color/70 hover:text-dark-color bg-white/50 hover:bg-white/80 text-xl flex items-center justify-center gap-[1px] cursor-pointer h-[37px] rounded-lg pr-1 pl-2">
                  {coppied ? <LuCheck /> : <LuCopy />}
                  <span>
                    <LuChevronDown className="text-sm" />
                  </span>
                </div>
              </Dropdown>
            </ConfigProvider>
            <Tooltip
              title={`${showMore ? "Hide" : "Show"} Description`}
              mouseLeaveDelay={0}
              placement="bottom"
            >
              <button
                onClick={handleShowMore}
                className={`text-xl h-[37px] px-3  cursor-pointer flex items-center justify-center gap-2 rounded-lg
                ${
                  showMore
                    ? "bg-white/80 text-dark-color"
                    : "bg-white/50 hover:bg-white/80 text-dark-color/70 hover:text-dark-color "
                }
              `}
              >
                <LuGlasses />
                {/* <p className="text-sm font-medium max-sm:hidden">Description</p> */}
              </button>
            </Tooltip>
            <button
              disabled={animateFetch}
              onClick={handleNewQuote}
              className={`bg-[#3f4d46] text-light-color text-xl flex items-center select-none gap-1 transition-all h-[37px] pl-3 pr-4 rounded-lg font-medium group 
                ${animateFetch ? " opacity-85 cursor-not-allowed" : ""}    
            `}
            >
              {animateFetch ? (
                <div className="flex items-center gap-3">
                  <svg
                    className="container2"
                    x="0px"
                    y="0px"
                    viewBox="0 0 20 20"
                    height="20"
                    width="20"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <path
                      className="track"
                      fill="none"
                      strokeWidth="5"
                      pathLength="100"
                      d="M0.37 18.5 C0.37 5.772 5.772 0.37 18.5 0.37 S36.63 5.772 36.63 18.5 S31.228 36.63 18.5 36.63 S0.37 31.228 0.37 18.5"
                    ></path>
                    <path
                      className="car"
                      fill="none"
                      strokeWidth="5"
                      pathLength="100"
                      d="M0.37 18.5 C0.37 5.772 5.772 0.37 18.5 0.37 S36.63 5.772 36.63 18.5 S31.228 36.63 18.5 36.63 S0.37 31.228 0.37 18.5"
                    ></path>
                  </svg>
                  <span className="text-sm font-semibold pl-1">
                    Fetching..
                  </span>
                </div>
              ) : (
                <>
                  <HiSparkles className="group-hover:rotate-45 transition duration-200" />
                  <span className="text-sm font-semibold ">Get New Quote</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

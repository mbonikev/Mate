import React, { useEffect, useState } from "react";
import axios from "axios";
import { json, useLocation } from "react-router-dom";
import {
    LuBookmark,
    LuChevronDown,
    LuCopy,
    LuGlasses,
    LuLanguages,
    LuVolume2,
} from "react-icons/lu";
import { HiSparkles } from "react-icons/hi2";
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { ConfigProvider, Dropdown, Space } from 'antd';

function Home() {
    const [result, setResult] = useState("");
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
            url: "https://quotes15.p.rapidapi.com/quotes/random/",
            params: {
                language_code: "en",
            },
            headers: {
                "x-rapidapi-key": "60f4cd0945msh79435640a97e714p13ec56jsnf80bbe924f6c",
                "x-rapidapi-host": "quotes15.p.rapidapi.com",
            },
        };

        const getQuote = async () => {
            try {
                const response = await axios.request(options);
                // console.log(response.data);
                setResult(response.data);
                localStorage.setItem("quoteCache", JSON.stringify(response.data));
            } catch (error) {
                // console.error(error);
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

    const items = [
        {
            key: '1',
            label: (
                <button className="text-sm font-medium tracking-tight">
                    Quote only
                </button>
            ),
        },
        {
            key: '2',
            label: (
                <button className="text-sm font-medium tracking-tight">
                    Quote & Author
                </button>
            ),
        },
        {
            key: '3',
            label: (
                <button className="text-sm font-medium tracking-tight">
                    The Whole Thing
                </button>
            ),
        },
    ];

    return (
        <div className="w-full min-h-svh flex flex-col items-center justify-center text-lg">
            <div className="w-full max-w-[1080px] pt-10 px-10 relative">
                <h1 className="font-bold text-4xl tracking-tight">
                    {result !== "" && "❝" + result.content + "❞"}
                </h1>
                <p className="pt-4 Cascadia text-dark-color/90">
                    {result !== "" && "— " + result.originator.name}
                </p>
                <p className="pt-4 Cascadia text-sm text-justify text-dark-color/90">
                    {result !== "" && result.originator.description !== ""
                        ? result.originator.description
                        : "No description"}
                </p>
                <div className="flex items-center justify-end gap-1 py-4 sticky bottom-0 bg-white mt-4">
                    {/* blender */}
                    <div className="absolute -top-3 left-0 w-full h-3 bg-gradient-to-b from-transparent to-white"></div>
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
                            trigger={['click']}
                            placement="bottomRight"
                        >
                            <div className="text-dark-color/50 hover:text-dark-color text-xl flex items-center justify-center gap-1 cursor-pointer">
                                <LuCopy />
                                <span>
                                    <LuChevronDown />
                                </span>
                            </div>
                        </Dropdown>
                    </ConfigProvider>
                    <button className="text-dark-color/50 hover:text-dark-color text-xl h-[37px] aspect-square cursor-pointer flex items-center justify-center rounded-lg hover:bg-stone-200/80">
                        <LuBookmark />
                    </button>
                    <button className={`text-dark-color/50 hover:text-dark-color text-xl h-[37px] aspect-square cursor-pointer flex items-center justify-center rounded-lg hover:bg-stone-200/80`}>
                        <LuGlasses />
                    </button>
                    <button
                        onClick={handleNewQuote}
                        className="text-dark-color text-xl flex items-center select-none gap-1 bg-stone-200/50 hover:bg-stone-200 transition-all h-[37px] pl-3 pr-4 ml-3 rounded-lg font-medium group "
                    >
                        <HiSparkles className="group-hover:rotate-45 transition duration-200" />
                        <span className="text-base ">Generate</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;

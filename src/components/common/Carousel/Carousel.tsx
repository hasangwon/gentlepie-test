import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({
  handleTextButtonClick,
  setMenu,
}: {
  handleTextButtonClick: (buttonText: string) => void;
  setMenu: React.Dispatch<React.SetStateAction<"FAQ" | "Chat">>;
}) => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    dots: true,
    arrows: false,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 400,
        settings: {
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          centerPadding: "80px",
        },
      },
      {
        breakpoint: 560,
        settings: {
          centerPadding: "120px",
        },
      },
      {
        breakpoint: 700,
        settings: {
          centerPadding: "160px",
        },
      },
      {
        breakpoint: 2000,
        settings: {
          centerPadding: "220px",
        },
      },
    ],
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center py-4">
      <div className="text-[26px] font-semibold text-center w-full mb-[4rem] px-8 custom-text text-nowrap">
        FAQ TITLE
        <br />
        <span>SUB TITLE</span>
      </div>
      <Slider {...settings} className="w-full h-[20rem] m-0">
        {FAQList.map((item, index) => (
          <div key={index} className={`h-[15rem] p-4 text-center`}>
            <div className={`flex w-full h-full rounded-[30px] ${item.color}`}>
              <div className="w-full h-full flex justify-center items-end pb-8 px-4 text-white">
                <button
                  className="hover:underline p-2 rounded-2xl"
                  onClick={() => {
                    handleTextButtonClick(item.text);
                    setMenu("Chat");
                  }}
                >
                  {item.text}
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;

export const FAQList = [
  {
    id: 1,
    text: "화장품 광고하고 싶은데 자문 받을 수 있는 방법이 있나요?",
    color: "bg-red-700",
  },
  {
    id: 2,
    text: "중국 수출 관련 문의 드립니다.",
    color: "bg-blue-700",
  },
  {
    id: 3,
    text: "하나카드 캐쉬백",
    color: "bg-green-700",
  },
  {
    id: 4,
    text: "김치볶음밥을 잘 볶는 법",
    color: "bg-yellow-700",
  },
  {
    id: 5,
    text: "화장품 업계의 전망",
    color: "bg-purple-500",
  },
  {
    id: 6,
    text: "식약처장의 이름이 뭔가요?",
    color: "bg-orange-500",
  },
];

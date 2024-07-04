import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "100px",
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    dots: true,
    arrows: false,
    focusOnSelect: true,

    appendDots: (dots: React.JSX.Element) => (
      <div>
        <ul>{dots}</ul>
      </div>
    ),

    // pauseOnHover: true,
  };

  const list = [
    {
      id: 1,
      name: "1",
      color: "bg-red-100",
    },
    {
      id: 2,
      name: "2",

      color: "bg-blue-100",
    },
    {
      id: 3,
      name: "3",
      color: "bg-green-100",
    },
    {
      id: 4,
      name: "4",
      color: "bg-yellow-100",
    },
    {
      id: 5,
      name: "5",
      color: "bg-purple-100",
    },
    {
      id: 6,
      name: "6",
      color: "bg-orange-100",
    },
  ];

  return (
    <div className="w-full h-full flex justify-center items-center py-4">
      <Slider {...settings} className="w-full h-[20rem] m-0">
        {list.map((item, index) => (
          <div key={index} className={`h-[15rem] p-4 text-center`}>
            <div className={`w-full h-full rounded-[30px] ${item.color}`}>
              {index}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;

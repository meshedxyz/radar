import { useState, createRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

const images = [
  require("../public/1popup.gif"),
  require("../public/2details.gif"),
  require("../public/3personalize.gif"),
  require("../public/4report.gif"),
  require("../public/5support.gif"),
];

const messages = [
  "Get a report on every incoming signature request.", // pop up
  "See how your assets change if you sign.", // read report
  "Add websites to your personal safe list or mute them.", // personalize
  "Report scams using the report section!", // report
  "Follow us and share your feedback!", // closing
];

const Headlines = [
  "How Radar Works",
  "The Risk Report",
  "Custom Alerting",
  "Make Web3 Safer",
  "Thank You!",
];

const FirstTimeUserCarousel = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const refs = images.reduce((acc: any, val, i) => {
    acc[i] = createRef();
    return acc;
  }, {});

  const scrollToImage = (i: number) => {
    setCurrentImage(i);
    refs[i].current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  const totalImages = images.length;

  const nextImage = () => {
    if (currentImage >= totalImages - 1) {
      scrollToImage(0);
    } else {
      scrollToImage(currentImage + 1);
    }
  };

  const previousImage = () => {
    if (currentImage === 0) {
      scrollToImage(totalImages - 1);
    } else {
      scrollToImage(currentImage - 1);
    }
  };

  const sliderControl = (isLeft: boolean) =>
    (isLeft && currentImage === 0) ||
    (!isLeft && currentImage === totalImages - 1) ? (
      <></>
    ) : (
      <button
        type="button"
        onClick={isLeft ? previousImage : nextImage}
        className={`absolute z-10 flex items-center justify-center ${
          isLeft ? "-left-8" : "-right-8"
        }`}
        style={{ top: "52.5%" }}
      >
        <span role="img" aria-label={`Arrow ${isLeft ? "left" : "right"}`}>
          {isLeft ? (
            <ChevronLeftIcon className="h-7 w-7 text-zinc-50" />
          ) : (
            <ChevronRightIcon className="h-7 w-7 text-zinc-50" />
          )}
        </span>
      </button>
    );

  return (
    <div className="flex items-center justify-center pb-8 pt-4">
      <div className="relative w-full">
        <div className="carousel w-[300px] rounded">
          {sliderControl(true)}
          {images.map((img, i) => (
            <div key={i} className="w-full flex-shrink-0">
              <div className="w-full flex-shrink-0" ref={refs[i]}>
                <h1 className="flex-none self-center object-contain text-center text-3xl font-bold text-zinc-50">
                  {Headlines[i]}
                </h1>

                <h2 className="object-contain pb-2 text-center text-[11px] font-medium text-zinc-400">
                  {messages[i]}
                </h2>
                <img
                  src={img}
                  className="w-[300px] rounded border object-contain"
                />
              </div>
              <h2 className="font-xs absolute -bottom-6 left-[48%] font-medium text-zinc-500">
                {currentImage + 1}/{totalImages}
              </h2>
            </div>
          ))}
          {sliderControl(false)}
        </div>
      </div>
    </div>
  );
};

export default FirstTimeUserCarousel;

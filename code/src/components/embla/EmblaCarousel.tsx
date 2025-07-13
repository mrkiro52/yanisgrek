"use client";
import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./embla.module.scss";

// type EmblaCarouselProps = {
//   slides: string[];
//   options?: EmblaOptionsType;
// };

type Slide = {
  src: string;
  caption?: string;
};

type EmblaCarouselProps = {
  slides: Slide[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<EmblaCarouselProps> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {/* {slides.map((src, idx) => (
            <div className={styles.embla__slide} key={idx}>
              <img
                className={styles.embla__slide__number}
                src={src}
                alt={`slide-${idx}`}
                style={{ width: "auto", display: "block" }}
              />
            </div>
          ))} */}
          {slides.map((slide, idx) => (
            <div className={styles.embla__slide} key={idx}>
              <img
                className={styles.embla__slide__number}
                src={slide.src}
                alt={`slide-${idx}`}
                style={{ width: "auto", display: "block" }}
              />
              {slide.caption && (
                <p className={styles.embla__caption}>{slide.caption}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.embla__controls}>
        <div className={styles.embla__buttons}>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className={styles.embla__dots}>
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;

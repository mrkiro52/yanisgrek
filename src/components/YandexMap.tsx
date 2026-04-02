export default function YandexMap() {
  return (
    <div
      style={{ filter: "invert(0.9) hue-rotate(180deg)" }}
      className="yandex_map"
    >
      <iframe
        src="https://yandex.ru/map-widget/v1/?um=constructor%3A9cd8128f022d9c52582359f6749d3206589822ddbb5c480e49a54483a2093b0d&amp;source=constructor"
        width="100%"
        height="100%"
        frameBorder="0"
      ></iframe>
    </div>
  );
}

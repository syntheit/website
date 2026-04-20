"use client";

export function HeroBackground() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
      <svg
        id="visual"
        viewBox="0 0 960 540"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M0 191L137 271L274 269L411 307L549 294L686 282L823 212L960 222L960 541L823 541L686 541L549 541L411 541L274 541L137 541L0 541Z"
          fill="#65c3ac"
        ></path>
        <path
          d="M0 320L137 305L274 300L411 303L549 342L686 339L823 254L960 300L960 541L823 541L686 541L549 541L411 541L274 541L137 541L0 541Z"
          fill="#4a9b8a"
        ></path>
        <path
          d="M0 393L137 410L274 412L411 319L549 322L686 337L823 398L960 319L960 541L823 541L686 541L549 541L411 541L274 541L137 541L0 541Z"
          fill="#2a5b46"
        ></path>
        <path
          d="M0 443L137 447L274 444L411 432L549 441L686 376L823 440L960 451L960 541L823 541L686 541L549 541L411 541L274 541L137 541L0 541Z"
          fill="#1e4536"
        ></path>
        <path
          d="M0 459L137 467L274 464L411 491L549 455L686 460L823 478L960 471L960 541L823 541L686 541L549 541L411 541L274 541L137 541L0 541Z"
          fill="#152f26"
        ></path>
      </svg>
    </div>
  );
}

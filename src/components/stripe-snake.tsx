"use client";

export function StripeSnake() {
  return (
    <div
      className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none z-0 overflow-visible"
      style={{ width: 1400 }}
    >
      <svg
        width="1400"
        height="1900"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        {/* Line 0 - Brown (innermost on right turns, outermost on left turns) */}
        <path
          d="
            M 1160 0 V 400
            A 60 60 0 0 1 1100 460
            H 300
            A 120 120 0 0 0 180 580
            V 960
            A 120 120 0 0 0 300 1080
            H 1100
            A 60 60 0 0 1 1160 1140
            V 1400
            A 60 60 0 0 1 1100 1460
            H 300
            A 120 120 0 0 0 180 1580
            V 1900
          "
          stroke="#3B2314"
          strokeWidth="14"
          strokeLinecap="round"
          opacity="0.28"
        />

        {/* Line 1 - Burnt Orange */}
        <path
          d="
            M 1180 0 V 400
            A 80 80 0 0 1 1100 480
            H 300
            A 100 100 0 0 0 200 580
            V 960
            A 100 100 0 0 0 300 1060
            H 1100
            A 80 80 0 0 1 1180 1140
            V 1400
            A 80 80 0 0 1 1100 1480
            H 300
            A 100 100 0 0 0 200 1580
            V 1900
          "
          stroke="#D4581A"
          strokeWidth="14"
          strokeLinecap="round"
          opacity="0.28"
        />

        {/* Line 2 - Orange */}
        <path
          d="
            M 1200 0 V 400
            A 100 100 0 0 1 1100 500
            H 300
            A 80 80 0 0 0 220 580
            V 960
            A 80 80 0 0 0 300 1040
            H 1100
            A 100 100 0 0 1 1200 1140
            V 1400
            A 100 100 0 0 1 1100 1500
            H 300
            A 80 80 0 0 0 220 1580
            V 1900
          "
          stroke="#E8941A"
          strokeWidth="14"
          strokeLinecap="round"
          opacity="0.28"
        />

        {/* Line 3 - Amber (outermost on right turns, innermost on left turns) */}
        <path
          d="
            M 1220 0 V 400
            A 120 120 0 0 1 1100 520
            H 300
            A 60 60 0 0 0 240 580
            V 960
            A 60 60 0 0 0 300 1020
            H 1100
            A 120 120 0 0 1 1220 1140
            V 1400
            A 120 120 0 0 1 1100 1520
            H 300
            A 60 60 0 0 0 240 1580
            V 1900
          "
          stroke="#E8C95A"
          strokeWidth="14"
          strokeLinecap="round"
          opacity="0.28"
        />
      </svg>
    </div>
  );
}

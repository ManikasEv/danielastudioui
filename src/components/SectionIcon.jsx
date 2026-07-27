const paths = {
  mark: (
    <path
      d="M12 3 L19 7.5 V16.5 L12 21 L5 16.5 V7.5 Z M12 8 V16 M8.5 10.5 L12 12.5 L15.5 10.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  ),
  home: (
    <path
      d="M4 11.5 L12 5 L20 11.5 V19 A1 1 0 0 1 19 20 H5 A1 1 0 0 1 4 19 Z M10 20 V14 H14 V20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  ),
  clapper: (
    <>
      <path
        d="M4 10 H20 V19 A1 1 0 0 1 19 20 H5 A1 1 0 0 1 4 19 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M4 10 L7 4 H17 L20 10 M7 4 L9.5 10 M12 4 V10 M14.5 4 L17 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  grid: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13" y="4" width="7" height="7" rx="1" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <rect x="4" y="13" width="7" height="7" rx="1" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13" y="13" width="7" height="7" rx="1" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </>
  ),
  path: (
    <path
      d="M6 18 C6 12 10 12 12 9 C14 6 14 4 18 4 M6 18 H10 M18 4 V8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  frames: (
    <>
      <rect
        x="3"
        y="6"
        width="12"
        height="12"
        rx="1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M9 4 H19 A1 1 0 0 1 20 5 V15"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </>
  ),
  box: (
    <path
      d="M4 8 L12 4 L20 8 V16 L12 20 L4 16 Z M4 8 L12 12 L20 8 M12 12 V20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  ),
  partners: (
    <>
      <circle cx="9" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16" cy="9" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M3 19 C3 15.5 5.5 14 9 14 C11 14 12.5 14.5 13.5 15.5 M14 19 C14 16.5 15 15 16 15 C18.5 15 21 16.5 21 19"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </>
  ),
  send: (
    <path
      d="M4 12 L20 4 L13 20 L11 13 Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  ),
}

export default function SectionIcon({ name, className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      {paths[name]}
    </svg>
  )
}

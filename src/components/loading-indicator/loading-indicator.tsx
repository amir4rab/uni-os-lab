interface Props {
  animate?: boolean;
  scale?: number;
}

const LoadingIndicator = ({ animate = false, scale = 0.05 }: Props) => {
  return (
    <div style={`transform: scale(${scale})`}>
      <div className="loading-indicator" data-animate={animate}>
        <svg
          width="512"
          height="512"
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M85.2163 157.921L171.819 207.921"
            stroke-width="32"
            stroke-linecap="round"
          />
          <path
            d="M157.764 84.4801L207.764 171.083"
            stroke-width="32"
            stroke-linecap="round"
          />
          <path d="M57 257.5H157" stroke-width="32" stroke-linecap="round" />
          <path
            d="M83.4801 355.236L170.083 305.236"
            stroke-width="32"
            stroke-linecap="round"
          />
          <path
            d="M156.921 427.784L206.921 341.181"
            stroke-width="32"
            stroke-linecap="round"
          />
          <path
            d="M258 454.764V354.764"
            stroke-width="32"
            stroke-linecap="round"
          />
          <path
            d="M355.736 427.284L305.736 340.681"
            stroke-width="32"
            stroke-linecap="round"
          />
          <path
            d="M428.284 353.842L341.681 303.842"
            stroke-width="32"
            stroke-linecap="round"
          />
          <path
            d="M455.264 254.815H355.264"
            stroke-width="32"
            stroke-linecap="round"
          />
          <path
            d="M428.784 157.079L342.181 207.079"
            stroke-width="32"
            stroke-linecap="round"
          />
          <path
            d="M355.342 84.5311L305.342 171.134"
            stroke-width="32"
            stroke-linecap="round"
          />
          <path d="M255.5 58V158" stroke-width="32" stroke-linecap="round" />
        </svg>
      </div>
    </div>
  );
};

export default LoadingIndicator;

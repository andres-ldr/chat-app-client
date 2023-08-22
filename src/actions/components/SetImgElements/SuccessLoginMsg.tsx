import React from 'react';

interface ISuccessLoginMsg {
  isSuccess: boolean;
}

const SuccessLoginMsg: React.FC<ISuccessLoginMsg> = ({ isSuccess }) => {
  return (
    <div
      className={`${
        !isSuccess ? 'hidden' : 'flex'
      }   absolute inset-0  w-full h-full flex-col justify-center items-center animate-show z-10`}
    >
      <h2 className='text-5xl mb-16 font-bold w-3/4 text-center text-brightPurple'>
        Account successfully created
      </h2>
      <svg
        className='w-3/4'
        viewBox='0 0 598 400'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g clipPath='url(#clip0_45_1057)'>
          <path
            d='M155.282 226.991C148.749 176.944 183.171 117.428 256.528 126.455C318.75 134.109 332.238 124.239 359.025 110.175C376.714 100.891 404.386 84.4634 426.837 131.438C456.221 192.919 387.309 289.317 325.763 318.881C266.909 347.157 167.132 317.814 155.282 226.991Z'
            fill='#259F46'
          />
          <path
            d='M162.42 137.961L181.483 118.834C182.178 118.137 182.178 117.008 181.483 116.312C180.789 115.615 179.664 115.615 178.97 116.312L159.906 135.439C159.212 136.135 159.212 137.264 159.906 137.961C160.6 138.657 161.726 138.657 162.42 137.961Z'
            fill='#E1E4E5'
          />
          <path
            d='M156.358 312.629L167.684 301.265C168.097 300.851 168.097 300.18 167.684 299.766C167.272 299.352 166.603 299.352 166.191 299.766L154.864 311.13C154.452 311.544 154.452 312.215 154.864 312.629C155.276 313.043 155.945 313.043 156.358 312.629Z'
            fill='#E1E4E5'
          />
          <path
            d='M437.419 259.746L426.092 271.11C425.68 271.524 425.68 272.195 426.092 272.609C426.504 273.023 427.173 273.023 427.586 272.609L438.912 261.245C439.325 260.831 439.325 260.16 438.912 259.746C438.5 259.332 437.831 259.332 437.419 259.746Z'
            fill='#E1E4E5'
          />
          <path
            d='M164.285 124.266L169.783 118.75C170.477 118.053 170.477 116.924 169.783 116.228C169.089 115.531 167.964 115.531 167.27 116.228L161.772 121.744C161.078 122.44 161.078 123.57 161.772 124.266C162.466 124.962 163.591 124.962 164.285 124.266Z'
            fill='#E1E4E5'
          />
          <path
            d='M157.467 304.492L160.733 301.215C161.146 300.801 161.146 300.13 160.733 299.716C160.321 299.302 159.652 299.302 159.239 299.716L155.973 302.993C155.56 303.407 155.56 304.078 155.973 304.492C156.385 304.906 157.054 304.906 157.467 304.492Z'
            fill='#E1E4E5'
          />
          <path
            d='M436.31 267.883L433.043 271.16C432.631 271.574 432.631 272.246 433.043 272.659C433.456 273.073 434.124 273.073 434.537 272.659L437.803 269.382C438.216 268.968 438.216 268.297 437.804 267.883C437.391 267.469 436.722 267.469 436.31 267.883Z'
            fill='#E1E4E5'
          />
          <path
            d='M324.324 333.678C321.285 334.408 317.202 335.981 314.887 339.113C312.572 342.243 315.372 343.168 319.07 342.567C322.768 341.965 326.437 339.873 327.924 336.926C329.411 333.98 326.819 333.079 324.324 333.678ZM339.296 327.847C337.828 328.2 335.857 328.96 334.738 330.472C333.62 331.985 334.972 332.431 336.758 332.141C338.544 331.85 340.317 330.839 341.035 329.416C341.753 327.993 340.501 327.558 339.296 327.847ZM393.953 307.561C397.769 304.935 398.142 298.823 398.142 298.823C398.142 298.823 392.328 296.971 388.514 299.6C384.699 302.225 384.323 308.334 384.323 308.334C384.323 308.334 390.137 310.186 393.953 307.561Z'
            fill='#E1E4E5'
          />
          <path
            d='M383.632 83.55C386.441 83.55 388.719 81.1013 388.719 78.0807C388.719 75.06 386.441 72.6113 383.632 72.6113C380.822 72.6113 378.544 75.06 378.544 78.0807C378.544 81.1013 380.822 83.55 383.632 83.55Z'
            fill='#E1E4E5'
          />
          <path
            d='M454.863 225.031C456.468 225.031 457.77 223.072 457.77 220.655C457.77 218.238 456.468 216.279 454.863 216.279C453.257 216.279 451.955 218.238 451.955 220.655C451.955 223.072 453.257 225.031 454.863 225.031Z'
            fill='#E1E4E5'
          />
          <path
            d='M239.715 223.257L271.69 255.661L341.475 184.921'
            stroke='white'
            strokeWidth='33'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M322.708 111.249C301.921 116.771 279.334 99.5553 279.334 99.5553C279.334 99.5553 290.463 73.3953 311.257 67.8886C332.044 62.3666 354.624 79.5673 354.624 79.5673C354.624 79.5673 343.494 105.727 322.708 111.249Z'
            fill='url(#paint0_linear_45_1057)'
          />
          <path
            d='M467.201 164.104C460.95 170.487 449.262 169.141 449.262 169.141C449.262 169.141 447.716 157.447 453.972 151.067C460.222 144.685 471.904 146.027 471.904 146.027C471.904 146.027 473.451 157.721 467.201 164.104Z'
            fill='url(#paint1_linear_45_1057)'
          />
          <path
            d='M131.778 211.903C137.598 211.903 142.317 216.964 142.317 223.207C142.317 229.45 137.598 234.511 131.778 234.511C125.957 234.511 121.238 229.45 121.238 223.207C121.238 216.964 125.957 211.903 131.778 211.903Z'
            fill='#E1E4E5'
          />
          <path
            d='M129.597 160.854C131.805 160.854 133.595 159.221 133.595 157.207C133.595 155.193 131.805 153.561 129.597 153.561C127.389 153.561 125.599 155.193 125.599 157.207C125.599 159.221 127.389 160.854 129.597 160.854Z'
            fill='#E1E4E5'
          />
          <path
            d='M232.81 109.804C237.025 109.804 240.442 106.376 240.442 102.147C240.442 97.9177 237.025 94.4894 232.81 94.4894C228.595 94.4894 225.178 97.9177 225.178 102.147C225.178 106.376 228.595 109.804 232.81 109.804Z'
            fill='#E1E4E5'
          />
          <path
            d='M447.31 91.572H447.157C446.25 104.578 436.692 104.778 436.692 104.778C436.692 104.778 447.231 104.986 447.231 120.014C447.231 104.986 457.771 104.778 457.771 104.778C457.771 104.778 448.217 104.578 447.31 91.572Z'
            fill='#E1E4E5'
          />
        </g>
        <defs>
          <linearGradient
            id='paint0_linear_45_1057'
            x1='244.265'
            y1='125.683'
            x2='425.344'
            y2='34.5584'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='white' />
            <stop offset='1' stopColor='#EEEEEE' />
          </linearGradient>
          <linearGradient
            id='paint1_linear_45_1057'
            x1='442.263'
            y1='185.907'
            x2='487.664'
            y2='114.973'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='white' />
            <stop offset='1' stopColor='#EEEEEE' />
          </linearGradient>
          <clipPath id='clip0_45_1057'>
            <rect width='598' height='400' fill='white' />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default SuccessLoginMsg;

import Navigation from './Navigation';

const Home = () => {
  return (
    <main>
      <Navigation />
      <svg width='0' height='0'>
        <defs>
          <clipPath id='myCurve' clipPathUnits='objectBoundingBox'>
            <path d='M 0 0 L 1 0 L 1 .8 C .6 1 .4 1 0 .8 L 0 0' />
          </clipPath>
        </defs>
      </svg>
      <section
        id='hero'
        className='h-screen w-full flex justify-center  bg-gradient-to-b from-darkPurple from-2% to-brightPurple to-98%'
      >
        <div className='flex w-4/5 justify-around h-full'>
          <div className='flex flex-col w-1/3 text-white justify-center font-rubik'>
            <h2 className='text-6xl mb-12 font-bold animate-show'>
              More security and faster communication
            </h2>
            <h4 className='text-xl mb-12 animate-show'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima,
              rem itaque! Aut magnam accusamus minima dolor voluptas
            </h4>
            <a
              href='#'
              className='flex justify-center uppercase shadow-md bg-brightPurple w-48 pt-2 pb-2 pl-4 pr-4  rounded-full transition duration-300 animate-show hover:bg-darkPurple hover:shadow-xl hover:scale-105 '
            >
              <span className='mr-3'>download</span>
              <svg
                className='w-5'
                viewBox='0 0 19 20'
                fill='#ffff'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M10.45 1C10.45 0.447715 10.0247 0 9.5 0C8.97533 0 8.55 0.447715 8.55 1V10.5858L5.42175 7.29289C5.05075 6.90237 4.44925 6.90237 4.07825 7.29289C3.70725 7.68342 3.70725 8.31658 4.07825 8.70711L8.82825 13.7071C9.19925 14.0976 9.80075 14.0976 10.1718 13.7071L14.9218 8.70711C15.2927 8.31658 15.2927 7.68342 14.9218 7.29289C14.5508 6.90237 13.9492 6.90237 13.5782 7.29289L10.45 10.5858V1Z'
                  fill='#fffff'
                />
                <path
                  d='M0.95 12C1.47467 12 1.9 12.4477 1.9 13V17C1.9 17.2652 2.00009 17.5196 2.17825 17.7071C2.35641 17.8946 2.59804 18 2.85 18H16.15C16.402 18 16.6436 17.8946 16.8218 17.7071C16.9999 17.5196 17.1 17.2652 17.1 17V13C17.1 12.4477 17.5253 12 18.05 12C18.5747 12 19 12.4477 19 13V17C19 17.7957 18.6997 18.5587 18.1653 19.1213C17.6308 19.6839 16.9059 20 16.15 20H2.85C2.09413 20 1.36922 19.6839 0.834746 19.1213C0.300267 18.5587 0 17.7957 0 17V13C0 12.4477 0.425329 12 0.95 12Z'
                  fill='#ffff'
                />
              </svg>
            </a>
          </div>
          <svg
            className='w-1/2 animate-show'
            viewBox='0 0 900 600'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path fill='transparent' d='M0 0h900v600H0z' />
            <rect
              x='202.043'
              y='94.14'
              width='486.827'
              height='369.855'
              rx='184.928'
              fill='url(#a)'
            />
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M539.67 326.441c0-76.628-62.119-138.747-138.747-138.747H281.747C205.119 187.694 143 249.813 143 326.441c0 76.628 62.119 138.748 138.747 138.748h39.87l62.495 50.222c4.627 3.718 11.499.425 11.499-5.511v-44.711h5.312c76.628 0 138.747-62.12 138.747-138.748z'
              fill='#180A38'
            />
            <rect
              x='245.821'
              y='267.208'
              width='160.401'
              height='13.71'
              rx='6.855'
              fill='#fff'
            />
            <rect
              x='245.821'
              y='302.854'
              width='84.999'
              height='13.71'
              rx='6.855'
              fill='#fff'
            />
            <rect
              x='245.821'
              y='338.499'
              width='130.24'
              height='13.71'
              rx='6.855'
              fill='#fff'
            />
            <rect
              x='245.821'
              y='374.144'
              width='178.224'
              height='13.71'
              rx='6.855'
              fill='#fff'
            />
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M558.531 386.151c0-38.222 30.986-69.207 69.208-69.207h59.445c38.222 0 69.207 30.985 69.207 69.207 0 38.223-30.985 69.208-69.207 69.208h-19.887l-31.173 25.051c-2.308 1.855-5.736.212-5.736-2.749v-22.302h-2.649c-38.222 0-69.208-30.985-69.208-69.208z'
              fill='#180A38'
            />
            <rect
              x='616.205'
              y='367.075'
              width='80.009'
              height='6.838'
              rx='3.419'
              fill='#fff'
            />
            <rect
              x='616.205'
              y='384.854'
              width='42.398'
              height='6.838'
              rx='3.419'
              fill='#fff'
            />
            <rect
              x='616.205'
              y='402.634'
              width='64.964'
              height='6.838'
              rx='3.419'
              fill='#fff'
            />
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M748.93 169.081C748.93 121.54 710.39 83 662.849 83h-73.938c-47.542 0-86.081 38.54-86.081 86.081 0 47.541 38.539 86.081 86.081 86.081h24.735l38.773 31.159c2.871 2.307 7.134.263 7.134-3.419v-27.74h3.296c47.541 0 86.081-38.54 86.081-86.081z'
              fill='#180A38'
            />
            <rect
              x='566.621'
              y='137.845'
              width='63.617'
              height='10.261'
              rx='5.13'
              fill='#fff'
            />
            <rect
              x='566.621'
              y='164.523'
              width='97.477'
              height='10.261'
              rx='5.13'
              fill='#fff'
            />
            <rect
              x='566.621'
              y='191.202'
              width='133.39'
              height='10.261'
              rx='5.13'
              fill='#fff'
            />
            <circle
              r='13.901'
              transform='scale(-1 1) rotate(-45 8.332 463.503)'
              fill='#E1E4E5'
            />
            <circle
              r='6.546'
              transform='scale(-1 1) rotate(-45 -33.821 617.239)'
              fill='#E1E4E5'
            />
            <path
              d='M691.013 287.017c5.788.387 12.092-4.154 12.092-4.154s-5.574-6.394-11.363-6.781c-5.788-.388-10.647 1.745-10.849 4.767-.201 3.021 4.327 5.782 10.12 6.168z'
              fill='#E1E4E5'
            />
            <circle
              cx='567.85'
              cy='287.273'
              r='9.142'
              transform='rotate(-178.879 567.85 287.273)'
              fill='#E1E4E5'
            />
            <circle
              cx='519.946'
              cy='461.06'
              r='9.142'
              transform='rotate(-178.879 519.946 461.06)'
              fill='#E1E4E5'
            />
            <defs>
              <linearGradient
                id='a'
                x1='455.837'
                y1='671.357'
                x2='447.173'
                y2='-308.255'
                gradientUnits='userSpaceOnUse'
              >
                <stop stop-color='#fff' />
                <stop offset='1' stop-color='#EEE' />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
      <section className='h-screen w-full bg-darkPurple -mt-48'></section>
    </main>
  );
};

export default Home;

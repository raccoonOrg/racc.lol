export type Testimonial = {
  name: string;
  worksAt: string;
  pfp: string;
  message: string;
};

export const BASE_API = "https://api.racc.lol";
export const BASE_API_V1 = `${BASE_API}/v1`;

export const GITHUB_REPO = "https://github.com/venqoi/raccoon-web";
export const GITHUB_API_REPO = "https://github.com/venqoi/raccoon-api";
export const TWITTER = "https://twitter.com/venqoii";
export const SITE = "https://venqoi.lol";


export const TESTIMONIALS: Testimonial[] = [
  {
    message: `I LOVE VENQOIS FABLOUS RACCON API!`,
    name: "Joje",
    pfp: "/img/Joje.png",
    worksAt: "VACBAN.wtf",
  },
  {
    message: `Best placeholder API on earth`,
    name: "Jbablestime",
    pfp: "/img/Jb.jpg",
    worksAt: "Polar",
  },
  {
    message: `Anti France site I strongly advise to boycott`,
    name: "Brievement",
    pfp: "/img/Xpray.png",
    worksAt: "VACBAN.wtf",
  },
  {
    message: `raccoon. 🦝`,
    name: "Ripkova",
    pfp: "/img/Kova.png",
    worksAt: "KeyAuth",
  },
  {
    message: `🦝 Truly one of the best sites of all time 🦝`,
    name: "Smellon420",
    pfp: "/img/Smellon.png",
    worksAt: "KeyAuth",
  },
  {
    message: `France #1`,
    name: "Kyroware",
    pfp: "/img/Kyro.png",
    worksAt: "VACBAN.wtf",
  },
];

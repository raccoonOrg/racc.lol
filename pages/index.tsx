import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import styled from "styled-components";
import { FaBuilding } from "react-icons/fa";
import Navbar from "../components/Navbar";
import {
  api_repo,
  TESTIMONIALS,
} from "../utils/Consts";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
`;


const Landing = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  max-width: 1300px;
  margin: 0 auto;

  padding: 8rem 2rem;
  z-index: 2;

  > div {
    display: flex;
    flex-direction: column;
    flex: 1;

    &:nth-child(2) {
      @media (max-width: 1120px) {
        display: none; // sneaky ;)
      }
    }
  }
`;

const Intro = styled.h1`
  max-width: 13ch;
  font-size: 3.85em; // big text = attention
  font-weight: 800;
  color: #D8C2BA;
  line-height: 1.35;
  margin-top: 20px;


  @media (max-width: 550px) {
    font-size: 2em;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
  align-self: flex-start;
`;

const Btn = styled.button`
  outline: none;
  border: unset;
  color: var(--text-secondary);
  padding: 8px;
  border-radius: 10px;
  background: var(--button-bg);
  opacity: 0.75;
  cursor: pointer;
  border: 2px solid rgb(0 0 0 / 5%);

  transition: all 0.15s ease-in-out;

  &:hover {
    opacity: 1;
    border: 2px solid rgb(0 0 0 / 12%);
  }
`;

const CodeContainerBtn = styled.button`
  position: absolute;
  right: -20px;
  bottom: -18px;
  outline: none;
  border: unset;
  color: var(--text-secondary);
  padding: 8px;
  border-radius: 10px;
  background: var(--button-bg);
  opacity: 0.9;
  cursor: pointer;
  border: 2px solid rgb(0 0 0 / 12%);

  align-self: flex-end;
  margin-top: -15px;

  transition: all 0.15s ease-in-out;

  &:hover {
    opacity: 1;
    box-shadow: 0px 0px 8px rgb(0 0 0 / 12%);
  }
`;

const PreviewContainer = styled.div`
  position: relative;
  align-self: center;
  justify-self: center;
  display: flex;
  background: var(--bg-secondary);
  border-radius: 10px;
  padding: 10px;
  border: 2px solid rgb(0 0 0 / 12%);

  width: 100%;
  max-width: 350px;
  min-height: 150px;
  justify-content: center;
  align-items: center;
`;

const PreviewImage = styled.img<{ loading?: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  opacity: ${props => (props.loading ? 0.5 : 1)};
  transition: opacity 0.2s ease-in-out;
`;

const Testimonials = styled.div`
  width: 100%;
  display: flex;
  gap: 50px;

  padding: 5rem 0;
`;

const Testimonial = styled.div`
  display: flex;
  min-width: 400px;
  max-width: 400px;
  background: var(--bg-secondary);
  padding: 15px;
  border-radius: 18px;
  border: 2px solid rgb(0 0 0 / 12%);
  padding-top: 50px;
  position: relative;

  &:first-of-type {
    margin-left: 50px;
  }

  > div {
    > div {
      p {
        line-height: 1;
        margin-bottom: 8px;
        color: var(--text-primary);
        font-size: 1.2em;
        span {
          display: flex;
          align-items: center;
          font-size: 0.85em;
          color: var(--text-secondary);
          margin-top: 5px;
          opacity: 0.75;
          svg {
            width: 1.2em;
            height: 1.2em;
            margin-right: 5px;
          }
        }
      }
    }
    > p {
      margin-top: 5px;
      line-height: 1;
      font-weight: 400;
      color: var(--text-secondary);
      font-size: 1.15em;
      line-height: 115%;
    }
  }
`;

const ImageWrapper = styled.div`
  margin-right: 15px;

  position: absolute;
  top: -28px;

  left: 14px;
  span {
    border: 2px solid rgb(0 0 0 / 35%) !important;
    border-radius: 18px;
  }
`;

const Home: NextPage = () => {
  const [imageUrl, setImageUrl] = useState("https://api.racc.lol/raccoon");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rateLimitCountdown, setRateLimitCountdown] = useState(0);

  useEffect(() => {
    if (rateLimitCountdown > 0) {
      const timer = setTimeout(() => {
        setRateLimitCountdown(rateLimitCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (rateLimitCountdown === 0 && error?.includes("Rate limited")) {
      setError(null);
    }
  }, [rateLimitCountdown, error]);

  const fetchNewImage = async () => {
    if (rateLimitCountdown > 0) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://api.racc.lol/raccoon");
      if (res.status === 429) {
        setError("Rate limited!");
        setRateLimitCountdown(5);
        setLoading(false);
        return;
      }
      setImageUrl(`https://api.racc.lol/raccoon?t=${Date.now()}`);
    } catch (e) {
      setError("Failed to fetch image.");
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Head>
        <title>the raccoons trashcan</title>
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="racc.lol" />
        <meta property="og:title" content="THE Raccoon API" />
        <meta
          property="og:description"
          content="the one and only raccoon api that will take over the world!"
        />
        <meta name="twitter:creator" content="@venqoii" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ffffff" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#E9E2D8" />
      </Head>

      <Navbar />
      <Landing id="#">
        <div>
          <Intro>the mother raccoon of all raccoon apis.</Intro>
          <BtnContainer>
            <a
              style={{ padding: "unset", borderRadius: 10 }}
              href="/documentation"
            >
              <Btn tabIndex={-1}>documentation</Btn>
            </a>
            <a
              style={{ padding: "unset", borderRadius: 10 }}
              href={api_repo}
              target="_blank"
              rel="noreferrer"
            >
              <Btn tabIndex={-1}>source</Btn>
            </a>
          </BtnContainer>
        </div>
        <div>
          <PreviewContainer>
            {error ? (
              <p style={{ color: "var(--text-primary)", textAlign: "center", padding: "20px" }}>
                {error} {rateLimitCountdown > 0 && `Wait ${rateLimitCountdown}s...`}
              </p>
            ) : (
              <PreviewImage
                src={imageUrl}
                loading={loading}
                onLoad={() => setLoading(false)}
                alt="Random Raccoon"
              />
            )}
            <CodeContainerBtn 
              onClick={fetchNewImage} 
              disabled={loading || rateLimitCountdown > 0}
            >
              {loading ? "loading..." : rateLimitCountdown > 0 ? `Wait ${rateLimitCountdown}s` : "fetch a new one"}
            </CodeContainerBtn>
          </PreviewContainer>
        </div>
      </Landing>
      <Marquee
        speed={50}
        gradientWidth={100}
        style={{ width: "100%" }}
      >
<Testimonials>
           {TESTIMONIALS.map((testimonial, index) => (
            <Testimonial key={index}>
              <ImageWrapper>
                <Image
                  style={{
                    borderRadius: "18px",
                  }}
                  width={65}
                  height={65}
                  layout="fixed"
                  draggable={false}
                  src={testimonial.pfp}
                  alt={testimonial.name + "'s pfp"}
                />
              </ImageWrapper>
              <div>
                <div>
                  <p>
                    {testimonial.name}{" "}
                    <span>
                      <FaBuilding /> {testimonial.worksAt}
                    </span>
                  </p>
                </div>
                <p>{testimonial.message}</p>
              </div>
            </Testimonial>
          ))}
        </Testimonials>
      </Marquee>
    </Wrapper>
  );
};

export default Home;

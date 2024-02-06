import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import CopyToClipboard from "react-copy-to-clipboard";
import Marquee from "react-fast-marquee";
import { toast } from "react-toastify";
import styled from "styled-components";
import { BuildingIcon } from "../components/Icons";
import Navbar from "../components/Navbar";
import {
  BASE_API_V1,
  GITHUB_API_REPO,
  GITHUB_REPO,
  TESTIMONIALS,
} from "../utils/Consts";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Polka = styled.div`
  background: linear-gradient(transparent, var(--bg-primary)),
    url("/polka-dots.svg");
  position: absolute;
  inset: 0;
  height: 500px;
  z-index: 1;
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

const ProductHunt = styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
  background: #da552f;
  width: fit-content;
  border-radius: 12px;
  color: white;
  div {
    display: flex;
    flex-direction: column;
    font-size: 1.25em;
    margin-left: 15px;
    font-weight: 500;
    span {
      font-size: 0.65em;
      opacity: 0.75;
      position: relative;
    }

    &:nth-of-type(2) {
      align-items: center;
      justify-content: center;
      align-self: center;
      font-size: 1.15em;
      svg {
        width: 1.25em;
        height: 1.25em;
        position: relative;
        margin: -5px 0;
      }
    }
  }
  svg {
    width: 3em;
    height: 3em;
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

const SubHeader = styled.h2`
  font-size: 1.5em;
  font-weight: 700;
  line-height: 1.35;
  margin-bottom: 5px;
  color: #CAD1C7;
  margin-left: 0 !important;
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
  background: var(--bg-secondary);
  opacity: 0.75;
  cursor: pointer;
  border: 2px solid rgb(0 0 0 / 5%);

  transition: all 0.15s ease-in-out;

  &:hover {
    opacity: 1;
    border: 2px solid rgb(0 0 0 / 12%);
  }
`;

const TextBtn = styled.button`
  outline: none;
  border: unset;
  color: var(--text-secondary);
  background: unset;
  margin-left: auto;
  opacity: 0.75;
  cursor: pointer;
  font-size: 0.9em;
  margin-bottom: 20px;

  transition: all 0.15s ease-in-out;

  &:hover {
    opacity: 1;
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
  background: var(--bg-primary);
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

const CodeContainer = styled.div`
  position: relative;
  align-self: center;
  justify-self: center;
  display: flex;
  background: var(--bg-secondary);
  border-radius: 10px;
  padding: 10px;
  border: 2px solid rgb(0 0 0 / 12%);

  width: 100%;
  height: 100%;
  max-width: 550px;

  span {
    user-select: none;
    color: var(----text-muted);
  }

  pre {
    color: var(--text-secondary);
    line-height: 1.25;

    overflow: auto;
  }
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

const DocumentationWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 1300px;
  margin: 0 auto;

  padding: 6rem 2rem;

  h1 {
    margin-bottom: 50px;
  }
`;

const Request = styled.div`
  margin-bottom: 50px;
  > span {
    font-weight: 600;
    color: var(--text-secondary);
    padding: 5px 0;
    display: block;
  }

  > * {
    margin-left: 25px;
  }
`;

const Home: NextPage = () => {
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

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ffffff" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#E9E2D8" />
      </Head>

      <Navbar />
      <Polka />
      <Landing id="#">
        <div>
          <Intro>the mother raccoon of all raccoon apis.</Intro>
          <BtnContainer>
            <a
              style={{ padding: "unset", borderRadius: 10 }}
              href="#documentation"
            >
              {/* Tell agent to NOT select this, but still read it pls :) */}
              <Btn tabIndex={-1}>documentation</Btn>
            </a>
            <a
              style={{ padding: "unset", borderRadius: 10 }}
              href={GITHUB_API_REPO}
              target="_blank"
              rel="noreferrer"
            >
              {/* Tell agent to NOT select this, but still read it pls :) */}
              <Btn tabIndex={-1}>source</Btn>
            </a>
          </BtnContainer>
        </div>
        <div>
          <CodeContainer style={{ overflow: "unset" }}>
            <div style={{ overflow: "auto" }}>
              <pre>
                {`~ curl 'https://api.racc.lol/v1/raccoon?json=true' \\
   -H 'authority: api.racc.lol' \\
   -H 'accept: */*' \\
   -H 'accept-language: en-US,en;q=0.9' \\
   -H 'sec-ch-ua: ".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"' \\
   -H 'sec-ch-ua-mobile: ?0' \\
   -H 'sec-ch-ua-platform: "macOS"' \\
   -H 'sec-fetch-dest: empty' \\
   -H 'sec-fetch-mode: cors' \\
   -H 'sec-fetch-site: cross-site' \\
   -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36' \\
   --compressed`}
                <br />
                <br />
              </pre>
            </div>
            <CopyToClipboard
              onCopy={() => toast("Copied", { type: "success" })}
              text={`
            curl 'https://api.racc.lol/v1/raccoon?json=true' \\
   -H 'authority: api.racc.lol' \\
   -H 'accept: */*' \\
   -H 'accept-language: en-US,en;q=0.9' \\
   -H 'sec-ch-ua: ".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"' \\
   -H 'sec-ch-ua-mobile: ?0' \\
   -H 'sec-ch-ua-platform: "macOS"' \\
   -H 'sec-fetch-dest: empty' \\
   -H 'sec-fetch-mode: cors' \\
   -H 'sec-fetch-site: cross-site' \\
   -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36' \\
   --compressed
          `}
            >
              <CodeContainerBtn>try it for yourself</CodeContainerBtn>
            </CopyToClipboard>
          </CodeContainer>
        </div>
      </Landing>
      <Marquee
        speed={50}
        gradientWidth={100}
        style={{ width: "100%" }}
        gradientColor={[234, 226, 215]}
      >
        <Testimonials>
          {TESTIMONIALS.map((testimonial, index) => (
            <Testimonial key={index}>
              <ImageWrapper>
                <Image
                  style={{
                    borderRadius: "0",
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
                      <BuildingIcon /> {testimonial.worksAt}
                    </span>
                  </p>
                </div>
                <p>{testimonial.message}</p>
              </div>
            </Testimonial>
          ))}
        </Testimonials>
      </Marquee>
      <DocumentationWrapper id="documentation">
        <Intro>documentation</Intro>
        <Request>
          <SubHeader>GET v1/raccoon</SubHeader>
          <span>GET a random picture of a raccoon.</span>
          <CodeContainer>
            <pre>
              <span>GET </span>
              <code>{BASE_API_V1}/raccoon</code>
            </pre>
          </CodeContainer>
          <CopyToClipboard
            onCopy={() => toast("Copied", { type: "success" })}
            text={`curl ${BASE_API_V1}/raccoon --output ./racc.jpg`}
          >
            <TextBtn>Copy cURL</TextBtn>
          </CopyToClipboard>
          <br />
          <span>For JSON format...</span>
          <CodeContainer>
            <pre>
              <span>GET </span>
              <code>{BASE_API_V1}/raccoon?json=true</code>
            </pre>
          </CodeContainer>
          <CopyToClipboard
            onCopy={() => toast("Copied", { type: "success" })}
            text={`curl ${BASE_API_V1}/raccoon?json=true`}
          >
            <TextBtn>Copy cURL</TextBtn>
          </CopyToClipboard>
        </Request>
        <Request>
          <SubHeader>GET v1/raccoon/:index</SubHeader>
          <span>GET a picture of a raccoon.</span>
          <CodeContainer>
            <pre>
              <span>GET </span>
              <code>{BASE_API_V1}/raccoon/100</code>
            </pre>
          </CodeContainer>
          <CopyToClipboard
            onCopy={() => toast("Copied", { type: "success" })}
            text={`curl ${BASE_API_V1}/raccoon/100 --output ./racc100.jpg`}
          >
            <TextBtn>Copy cURL</TextBtn>
          </CopyToClipboard>
          <br />
          <span>For JSON format...</span>
          <CodeContainer>
            <pre>
              <span>GET </span>
              <code>{BASE_API_V1}/raccoon/100?json=true</code>
            </pre>
          </CodeContainer>
          <CopyToClipboard
            onCopy={() => toast("Copied", { type: "success" })}
            text={`curl ${BASE_API_V1}/raccoon/100?json=true`}
          >
            <TextBtn>Copy cURL</TextBtn>
          </CopyToClipboard>
        </Request>
        <Request>
          <SubHeader>GET v1/raccoons</SubHeader>
          <span>GET a JSON list of raccoons (default 25 a request)</span>
          <CodeContainer>
            <pre>
              <span>GET </span>
              <code>{BASE_API_V1}/raccoons</code>
            </pre>
          </CodeContainer>
          <CopyToClipboard
            onCopy={() => toast("Copied", { type: "success" })}
            text={`curl ${BASE_API_V1}/raccoons`}
          >
            <TextBtn>Copy cURL</TextBtn>
          </CopyToClipboard>
          <br />
          <span>With random parameter...</span>
          <CodeContainer>
            <pre>
              <span>GET </span>
              <code>{BASE_API_V1}/raccoons?random=true</code>
            </pre>
          </CodeContainer>
          <CopyToClipboard
            onCopy={() => toast("Copied", { type: "success" })}
            text={`curl ${BASE_API_V1}/raccoons?random=true`}
          >
            <TextBtn>Copy cURL</TextBtn>
          </CopyToClipboard>
          <br />
          <span>With take parameter...</span>
          <CodeContainer>
            <pre>
              <span>GET </span>
              <code>{BASE_API_V1}/raccoons?take=50</code>
            </pre>
          </CodeContainer>
          <CopyToClipboard
            onCopy={() => toast("Copied", { type: "success" })}
            text={`curl ${BASE_API_V1}/raccoons?take=50`}
          >
            <TextBtn>Copy cURL</TextBtn>
          </CopyToClipboard>
          <br />
          <span>With from parameter...</span>
          <CodeContainer>
            <pre>
              <span>GET </span>
              <code>{BASE_API_V1}/raccoons?from=50</code>
            </pre>
          </CodeContainer>
          <CopyToClipboard
            onCopy={() => toast("Copied", { type: "success" })}
            text={`curl ${BASE_API_V1}/raccoons?from=50`}
          >
            <TextBtn>Copy cURL</TextBtn>
          </CopyToClipboard>
          <br />
          <span>With take and from parameter...</span>
          <CodeContainer>
            <pre>
              <span>GET </span>
              <code>{BASE_API_V1}/raccoons?from=50&take=10</code>
            </pre>
          </CodeContainer>
          <CopyToClipboard
            onCopy={() => toast("Copied", { type: "success" })}
            text={`curl ${BASE_API_V1}/raccoons?from=50&take=10`}
          >
            <TextBtn>Copy cURL</TextBtn>
          </CopyToClipboard>
        </Request>
        <Request>
          <SubHeader>GET v1/raccoftheday</SubHeader>
          <span>GET the racc of the day! (refreshes every 24hrs)</span>
          <CodeContainer>
            <pre>
              <span>GET </span>
              <code>{BASE_API_V1}/raccoftheday</code>
            </pre>
          </CodeContainer>
          <CopyToClipboard
            onCopy={() => toast("Copied", { type: "success" })}
            text={`curl ${BASE_API_V1}/raccoftheday --output ./raccoftheday.jpeg`}
          >
            <TextBtn>Copy cURL</TextBtn>
          </CopyToClipboard>
          <br />
          <span>For JSON format...</span>
          <CodeContainer>
            <pre>
              <span>GET </span>
              <code>{BASE_API_V1}/raccoftheday?json=true</code>
            </pre>
          </CodeContainer>
          <CopyToClipboard
            onCopy={() => toast("Copied", { type: "success" })}
            text={`curl ${BASE_API_V1}/raccoftheday?json=true`}
          >
            <TextBtn>Copy cURL</TextBtn>
          </CopyToClipboard>
        </Request>
        <Request>
          <SubHeader>GET v1/racchour</SubHeader>
          <span>GET the racc of the hour! (refreshes every hour)</span>
          <CodeContainer>
            <pre>
              <span>GET </span>
              <code>{BASE_API_V1}/racchour</code>
            </pre>
          </CodeContainer>
          <CopyToClipboard
            onCopy={() => toast("Copied", { type: "success" })}
            text={`curl ${BASE_API_V1}/racchour --output ./racchour.jpeg`}
          >
            <TextBtn>Copy cURL</TextBtn>
          </CopyToClipboard>
          <br />
          <span>For JSON format...</span>
          <CodeContainer>
            <pre>
              <span>GET </span>
              <code>{BASE_API_V1}/racchour?json=true</code>
            </pre>
          </CodeContainer>
          <CopyToClipboard
            onCopy={() => toast("Copied", { type: "success" })}
            text={`curl ${BASE_API_V1}/racchour?json=true`}
          >
            <TextBtn>Copy cURL</TextBtn>
          </CopyToClipboard>
        </Request>
        <Request>
          <SubHeader>GET v1/fact</SubHeader>
          <span>
            GET a fact about raccoons!
          </span>
          <CodeContainer>
            <pre>
              <span>GET </span>
              <code>{BASE_API_V1}/fact</code>
            </pre>
          </CodeContainer>
          <CopyToClipboard
            onCopy={() => toast("Copied", { type: "success" })}
            text={`curl ${BASE_API_V1}/fact`}
          >
            <TextBtn>Copy cURL</TextBtn>
          </CopyToClipboard>
        </Request>
        <Request>
          <SubHeader>GET v1/facts</SubHeader>
          <span>GET many facts about raccoons!</span>
          <CodeContainer>
            <pre>
              <span>GET </span>
              <code>{BASE_API_V1}/facts</code>
            </pre>
          </CodeContainer>
          <CopyToClipboard
            onCopy={() => toast("Copied", { type: "success" })}
            text={`curl ${BASE_API_V1}/facts`}
          >
            <TextBtn>Copy cURL</TextBtn>
          </CopyToClipboard>
          <br />
          <span>With from parameter...</span>
          <CodeContainer>
            <pre>
              <span>GET </span>
              <code>{BASE_API_V1}/facts?from=10</code>
            </pre>
          </CodeContainer>
          <CopyToClipboard
            onCopy={() => toast("Copied", { type: "success" })}
            text={`curl ${BASE_API_V1}/facts?from=10`}
          >
            <TextBtn>Copy cURL</TextBtn>
          </CopyToClipboard>
          <br />
          <span>With take parameter...</span>
          <CodeContainer>
            <pre>
              <span>GET </span>
              <code>{BASE_API_V1}/facts?take=5</code>
            </pre>
          </CodeContainer>
          <CopyToClipboard
            onCopy={() => toast("Copied", { type: "success" })}
            text={`curl ${BASE_API_V1}/facts?take=5`}
          >
            <TextBtn>Copy cURL</TextBtn>
          </CopyToClipboard>
          <br />
          <span>With take and from parameter...</span>
          <CodeContainer>
            <pre>
              <span>GET </span>
              <code>{BASE_API_V1}/facts?from=5&take=10</code>
            </pre>
          </CodeContainer>
          <CopyToClipboard
            onCopy={() => toast("Copied", { type: "success" })}
            text={`curl ${BASE_API_V1}/facts?from=5&take=10`}
          >
            <TextBtn>Copy cURL</TextBtn>
          </CopyToClipboard>
        </Request>
      </DocumentationWrapper>
    </Wrapper>
  );
};

export default Home;

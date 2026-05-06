import type { NextPage } from "next";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { api_url } from "../utils/Consts";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
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
  scroll-margin-top: 120px;
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

const ContentWrapper = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 6rem 2rem;
`;

const Sidebar = styled.aside`
  position: sticky;
  top: 100px;
  width: 200px;
  height: fit-content;
  flex-shrink: 0;

  @media (max-width: 900px) {
    display: none;
  }
`;

const SidebarTitle = styled.h3`
  font-size: 1em;
  font-weight: 700;
  color: var(--text-muted);
  text-bold: 600;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(0 0 0 / 12%);
`;

const SidebarLink = styled.a`
  display: block;
  padding: 8px 0;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.9em;
  transition: color 0.15s ease-in-out;
  cursor: pointer;

  &:hover {
    color: #D8C2BA;
  }

  &:active {
    color: #D8C2BA;
  }
`;

const MainContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const IntroText = styled.p`
  color: var(--text-secondary);
  font-size: 1.1em;
  line-height: 1.6;
  margin-bottom: 50px;
  opacity: 0.9;
`;

const Home: NextPage = () => {
  const endpoints = [
    { name: "GET /raccoon", id: "raccoon" },
    { name: "GET /raccoon/:id", id: "raccoon-id" },
    { name: "GET /raccoons", id: "raccoons" },
    { name: "GET /video", id: "video" },
    { name: "GET /meme", id: "meme" },
    { name: "GET /meme/:id", id: "meme-id" },
    { name: "GET /memes", id: "memes" },
    { name: "GET /fact", id: "fact" },
    { name: "GET /stats", id: "stats" },
  ];

  return (
    <Wrapper>
      <Navbar />
      <DocumentationWrapper id="documentation">
        <Intro>documentation</Intro>
        <IntroText>
          all the api endpoints are below, there's an example cURL command for each endpoint.
        </IntroText>
        <ContentWrapper>
          <Sidebar>
            <SidebarTitle>endpoints</SidebarTitle>
            {endpoints.map((endpoint) => (
              <SidebarLink key={endpoint.id} href={`#${endpoint.id}`}>
                <span>{endpoint.name}</span>
              </SidebarLink>
            ))}
          </Sidebar>
          <MainContent>
        <Request id="raccoon">
          <SubHeader>GET /raccoon</SubHeader>
          <span>GET a random picture of a raccoon.</span>
          <CodeContainer>
            <pre>
              <span>GET </span>
              <code>{api_url}/raccoon</code>
            </pre>
          </CodeContainer>
          <CopyToClipboard
            onCopy={() => toast("Copied", { type: "success" })}
            text={`curl ${api_url}/raccoon --output ./racc.jpg`}
          >
            <TextBtn>Copy cURL</TextBtn>
          </CopyToClipboard>
          <br />
          <span>For JSON format.</span>
          <CodeContainer>
            <pre>
              <span>GET </span>
              <code>{api_url}/raccoon?json=true</code>
            </pre>
          </CodeContainer>
          <CopyToClipboard
            onCopy={() => toast("Copied", { type: "success" })}
            text={`curl ${api_url}/raccoon?json=true`}
          >
            <TextBtn>Copy cURL</TextBtn>
          </CopyToClipboard>
          <br />
          <span>For daily raccoon (same all day).</span>
          <CodeContainer>
            <pre>
              <span>GET </span>
              <code>{api_url}/raccoon?daily=true</code>
            </pre>
          </CodeContainer>
          <CopyToClipboard
            onCopy={() => toast("Copied", { type: "success" })}
            text={`curl ${api_url}/raccoon?daily=true`}
          >
            <TextBtn>Copy cURL</TextBtn>
          </CopyToClipboard>
          <br />
          <span>For hourly raccoon (same all hour).</span>
          <CodeContainer>
            <pre>
              <span>GET </span>
              <code>{api_url}/raccoon?hourly=true</code>
            </pre>
          </CodeContainer>
          <CopyToClipboard
            onCopy={() => toast("Copied", { type: "success" })}
            text={`curl ${api_url}/raccoon?hourly=true`}
          >
            <TextBtn>Copy cURL</TextBtn>
          </CopyToClipboard>
          <br />
          <span>For weekly raccoon (same all week).</span>
          <CodeContainer>
            <pre>
              <span>GET </span>
              <code>{api_url}/raccoon?weekly=true</code>
            </pre>
          </CodeContainer>
          <CopyToClipboard
            onCopy={() => toast("Copied", { type: "success" })}
            text={`curl ${api_url}/raccoon?weekly=true`}
          >
            <TextBtn>Copy cURL</TextBtn>
          </CopyToClipboard>
        </Request>
        <Request id="raccoon-id">
          <SubHeader>GET /raccoon/:id</SubHeader>
          <span>GET a specific raccoon by ID.</span>
          <CodeContainer>
            <pre>
              <span>GET </span>
              <code>{api_url}/raccoon/100</code>
            </pre>
          </CodeContainer>
          <CopyToClipboard
            onCopy={() => toast("Copied", { type: "success" })}
            text={`curl ${api_url}/raccoon/100 --output ./racc100.jpg`}
          >
            <TextBtn>Copy cURL</TextBtn>
          </CopyToClipboard>
          <br />
          <span>For JSON format...</span>
          <CodeContainer>
            <pre>
              <span>GET </span>
              <code>{api_url}/raccoon/100?json=true</code>
            </pre>
          </CodeContainer>
          <CopyToClipboard
            onCopy={() => toast("Copied", { type: "success" })}
            text={`curl ${api_url}/raccoon/100?json=true`}
          >
            <TextBtn>Copy cURL</TextBtn>
          </CopyToClipboard>
        </Request>
        <Request id="raccoons">
          <SubHeader>GET /raccoons</SubHeader>
          <span>GET a JSON list of all available raccoons.</span>
          <CodeContainer>
            <pre>
              <span>GET </span>
              <code>{api_url}/raccoons</code>
            </pre>
          </CodeContainer>
          <CopyToClipboard
            onCopy={() => toast("Copied", { type: "success" })}
            text={`curl ${api_url}/raccoons`}
          >
            <TextBtn>Copy cURL</TextBtn>
          </CopyToClipboard>
        </Request>
        <Request id="video">
          <SubHeader>GET /video</SubHeader>
          <span>GET a random video of raccoon(s).</span>
          <CodeContainer>
            <pre>
              <span>GET </span>
              <code>{api_url}/video</code>
            </pre>
          </CodeContainer>
          <CopyToClipboard
            onCopy={() => toast("Copied", { type: "success" })}
            text={`curl ${api_url}/video --output ./racc.mp4`}
          >
            <TextBtn>Copy cURL</TextBtn>
          </CopyToClipboard>
          <br />
          <span>For JSON format...</span>
          <CodeContainer>
            <pre>
              <span>GET </span>
              <code>{api_url}/video?json=true</code>
            </pre>
          </CodeContainer>
          <CopyToClipboard
            onCopy={() => toast("Copied", { type: "success" })}
            text={`curl ${api_url}/video?json=true`}
          >
            <TextBtn>Copy cURL</TextBtn>
          </CopyToClipboard>
        </Request>
        <Request id="meme">
          <SubHeader>GET /meme</SubHeader>
          <span>GET a random meme.</span>
          <CodeContainer>
            <pre>
              <span>GET </span>
              <code>{api_url}/meme</code>
            </pre>
          </CodeContainer>
          <CopyToClipboard
            onCopy={() => toast("Copied", { type: "success" })}
            text={`curl ${api_url}/meme --output ./meme.jpg`}
          >
            <TextBtn>Copy cURL</TextBtn>
          </CopyToClipboard>
          <br />
          <span>For JSON format.</span>
          <CodeContainer>
            <pre>
              <span>GET </span>
              <code>{api_url}/meme?json=true</code>
            </pre>
          </CodeContainer>
          <CopyToClipboard
            onCopy={() => toast("Copied", { type: "success" })}
            text={`curl ${api_url}/meme?json=true`}
          >
            <TextBtn>Copy cURL</TextBtn>
          </CopyToClipboard>
          <br />
          <span>For daily meme (same all day).</span>
          <CodeContainer>
            <pre>
              <span>GET </span>
              <code>{api_url}/meme?daily=true</code>
            </pre>
          </CodeContainer>
          <CopyToClipboard
            onCopy={() => toast("Copied", { type: "success" })}
            text={`curl ${api_url}/meme?daily=true`}
          >
            <TextBtn>Copy cURL</TextBtn>
          </CopyToClipboard>
        </Request>
        <Request id="meme-id">
          <SubHeader>GET /meme/:id</SubHeader>
          <span>GET a specific meme by ID.</span>
          <CodeContainer>
            <pre>
              <span>GET </span>
              <code>{api_url}/meme/5</code>
            </pre>
          </CodeContainer>
          <CopyToClipboard
            onCopy={() => toast("Copied", { type: "success" })}
            text={`curl ${api_url}/meme/5 --output ./meme5.jpg`}
          >
            <TextBtn>Copy cURL</TextBtn>
          </CopyToClipboard>
          <br />
          <span>For JSON format.</span>
          <CodeContainer>
            <pre>
              <span>GET </span>
              <code>{api_url}/meme/5?json=true</code>
            </pre>
          </CodeContainer>
          <CopyToClipboard
            onCopy={() => toast("Copied", { type: "success" })}
            text={`curl ${api_url}/meme/5?json=true`}
          >
            <TextBtn>Copy cURL</TextBtn>
          </CopyToClipboard>
        </Request>
        <Request id="memes">
          <SubHeader>GET /memes</SubHeader>
          <span>GET a JSON list of all available memes.</span>
          <CodeContainer>
            <pre>
              <span>GET </span>
              <code>{api_url}/memes</code>
            </pre>
          </CodeContainer>
          <CopyToClipboard
            onCopy={() => toast("Copied", { type: "success" })}
            text={`curl ${api_url}/memes`}
          >
            <TextBtn>Copy cURL</TextBtn>
          </CopyToClipboard>
        </Request>
        <Request id="fact">
          <SubHeader>GET /fact</SubHeader>
          <span>GET a random fact about raccoons.</span>
          <CodeContainer>
            <pre>
              <span>GET </span>
              <code>{api_url}/fact</code>
            </pre>
          </CodeContainer>
          <CopyToClipboard
            onCopy={() => toast("Copied", { type: "success" })}
            text={`curl ${api_url}/fact`}
          >
            <TextBtn>Copy cURL</TextBtn>
          </CopyToClipboard>
          <br />
          <span>For JSON format.</span>
          <CodeContainer>
            <pre>
              <span>GET </span>
              <code>{api_url}/fact?json=true</code>
            </pre>
          </CodeContainer>
          <CopyToClipboard
            onCopy={() => toast("Copied", { type: "success" })}
            text={`curl ${api_url}/fact?json=true`}
          >
            <TextBtn>Copy cURL</TextBtn>
          </CopyToClipboard>
        </Request>
        <Request id="stats">
          <SubHeader>GET /stats</SubHeader>
          <span>GET API statistics (total photos, videos, and memes).</span>
          <CodeContainer>
            <pre>
              <span>GET </span>
              <code>{api_url}/stats</code>
            </pre>
          </CodeContainer>
          <CopyToClipboard
            onCopy={() => toast("Copied", { type: "success" })}
            text={`curl ${api_url}/stats`}
          >
            <TextBtn>Copy cURL</TextBtn>
          </CopyToClipboard>
        </Request>
          </MainContent>
        </ContentWrapper>
      </DocumentationWrapper>
    </Wrapper>
  );
};

export default Home;
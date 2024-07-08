import type { NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: ;
  color: #afb6af;
  padding: 10px;
`;

const TestText = styled.div`
  font-size: 1rem;
  font-weight: 800;
`;

const Privacy: NextPage = () => {
  return (
    <Wrapper>
      <Head>
        <title>racc.lol - privacy policy</title>
      </Head>
      <TestText>
        long story short, we do not collect any data on you. <br></br> your public ipv4 address is listed in the console for the api https://api.racc.lol, otherwise no data about your computer, web browser or mobile phone is collected or stored.<br></br>for any reason if you&apos;d like your ip to be removed from the console, please let me know on email: <a href="mailto:nolan@venqoi.lol">nolan@venqoi.lol</a> or discord: <a href="https://discord.com/users/282605485411270657">@venqoi</a>
      </TestText>
    </Wrapper>
  );
};

export default Privacy;

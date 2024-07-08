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

const ToS: NextPage = () => {
  return (
    <Wrapper>
      <Head>
        <title>racc.lol - tos</title>
      </Head>
      <TestText>
        very big tos blah blah <br></br>pretty much don&apos;t spam it and no ddossing. Use it however you&apos;d like!
      </TestText>
    </Wrapper>
  );
};

export default ToS;

import React from "react";
import styled from "styled-components";

function MoreInfoCard({ onClose }) {
  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalContent>
          <CloseButton onClick={onClose}>×</CloseButton>
          <Title>Disruptive Studio</Title>
          <Subtitle>Multimedia</Subtitle>
          <Description>
            <p>
              In today's market, new companies have very challenging moments
              when competing, the differentiation from being successful and
              average comes into place when showing the best side of your
              company to the world through great multimedia marketing.
            </p>
            <p>
              <strong>Creative process</strong>
              <br />
              <ul>
                <li>Objective</li>
                <li>Bullet</li>
                <li>Script</li>
                <li>Voice</li>
                <li>Collaterals</li>
                <li>Animations</li>
                <li>Final</li>
                <li>Feedback</li>
                <li>Delivery</li>
              </ul>
            </p>
            <p>
              <strong>Objective</strong>
              <br />
              It is very important to understand the market our clients want to
              get into. What differentiates them from their competitors and what
              they are trying to achieve.
            </p>
            {/* Agrega el resto del texto aquí */}
          </Description>
        </ModalContent>
      </ModalContainer>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background-color: #00000; /* Color de fondo del modal */
  padding: 20px;
  border-radius: 5px;
`;

const ModalContent = styled.div`
  max-width: 600px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 24px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Subtitle = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Description = styled.div`
  font-size: 16px;
  line-height: 1.5;

  p {
    margin-bottom: 15px;
  }

  ul {
    list-style: disc;
    margin-left: 20px;
  }
`;

export default MoreInfoCard;

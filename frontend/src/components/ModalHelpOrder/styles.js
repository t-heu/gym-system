import styled from 'styled-components';
import colors from '../../styles/colors';

export const ModalBase = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(0, 0, 0, 0.7);
  z-index: 100;
`;

export const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;

  z-index: -1;
`;

export const Title = styled.span`
  max-height: 104px;
  font-weight: bold;
  display: block;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

export const Question = styled.p`
  line-height: 1.6;
  color: ${colors.grayHeavy};
  margin-bottom: 20px;
`;

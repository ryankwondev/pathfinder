import styled from 'styled-components';
import { ReactComponent as RightArrowSVG } from '../icons/right-arrow.svg';

export function Header() {
  return (
    <Container>
      <Logo>pathfinder</Logo>
      <InteractionContainer>
        <Select>
          <option value={'a'}>a</option>
        </Select>
        <RightArrow />
        <Select>
          <option value={'a'}>a</option>
        </Select>
      </InteractionContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;

  width: 100vw;
  height: 80px;

  padding: 0 100px 0 100px;

  border-bottom: 1px solid #eaecef;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
`;

const Logo = styled.p`
  font-weight: 700;
  font-size: 24px;

  cursor: pointer;
`;

const InteractionContainer = styled.div`
  display: flex;
  column-gap: 20px;

  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  width: 382px;
  height: 40px;
`;

const Select = styled.select`
  width: 160px;
  height: 100%;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  text-indent: 7px;

  background-color: #fff;

  border: 1px solid #eaecef;
  border-radius: 7px;

  outline: 0;
`;

const RightArrow = styled(RightArrowSVG)`
  width: 22px;
  height: 100%;

  color: #94a2b8;
`;

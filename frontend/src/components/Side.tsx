import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as CrossArrowSVG } from '../icons/cross-arrow.svg';

export function Side() {
  const [data, setData] = useState<any[] | null>(null);

  useEffect(() => {
    axios.get('https://api.path-finder.kro.kr/edges').then((res) => {
      setData(res.data as any[]);
    });
  }, []);

  return (
    <Container>
      {data?.map((data, index) => (
        <DataCotainer key={index}>
          <PointContainer>
            <Point>{data.start_point}</Point>
            <Point
              style={{
                color: '#94a2b8',
                fontSize: 14,
                fontWeight: 400,
                marginTop: -7,
              }}
            >
              <CrossArrow /> ({data.move_minutes}분 소요)
            </Point>
            <Point>{data.end_point}</Point>
          </PointContainer>
        </DataCotainer>
      ))}
    </Container>
  );
}

const Container = styled.div`
  position: absolute;

  width: 400px;
  height: calc(100vh - 80px);

  border-right: 1px solid #eaecef;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
`;

const DataCotainer = styled.div`
  padding: 20px;

  width: 100%;
  height: 150px;

  border-bottom: 1px solid #eaecef;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
`;

const PointContainer = styled.div`
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`;

const Point = styled.p`
  font-weight: 600;
  font-size: 20px;

  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;

const CrossArrow = styled(CrossArrowSVG)`
  position: relative;
  width: 18px;
  height: 100%;
  top: 5px;
`;

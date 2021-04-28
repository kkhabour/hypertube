import styled from 'styled-components/macro';
import { Link as ReachRouterLink } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  // min-height: 660px;
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 5px;
  width: 60vw;
  margin: auto;
  max-width: 450px;
  padding: 60px 68px 40px;
  margin-bottom: 100px;
  
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  //min-height: 660px;
  //background-color: rgba(0, 0, 0, 0.75);
  border-radius: 5px;
  margin: auto;
  //max-width: 450px;
  padding: 60px 68px 40px;
  // margin-bottom: 100px;

  
`

export const Image = styled.img`
  margin: auto;
  margin-top: 5px;
  margin-bottom: 15px;
  height: 200px;
  width: 200px;
  // border-radius: 50%;

  @media(max-width: 1000px){
    margin: auto;
    width: 100%;
    height: 100%;
  
`

export const Error = styled.div`
  background: #e87c03;
  border-radius: 4px;
  font-size: 14px;
  margin: 0 0 16px;
  color: white;
  padding: 15px 20px;
`;

export const Base = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 450px;
  width: 100%;
`;

export const Title = styled.h1`
  color: #fff;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 28px;
`;

export const Text = styled.p`
    display: flex;
    justify-content: space-between;

  color: #737373;
  font-size: 16px;
  font-weight: 500;
`;

export const TextSmall = styled.p`
  margin-top: 10px;
  font-size: 13px;
  line-height: normal;
  color: #8c8c8c;
`;

export const Link = styled(ReachRouterLink)`
  color: #fff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const Input = styled.input`
  background: #333;
  border-radius: 4px;
  border: 0;
  color: #fff;
  height: 50px;
  line-height: 50px;
  padding: 5px
   20px;
  margin-bottom: 20px;
  &:last-of-type {
    margin-bottom: 30px;
  }
`;

export const Submit = styled.button`
  background: #e50914;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  margin: 24px 0 12px;
  padding: 16px;
  border: 0;
  color: white;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
  }
`;

export const Omniauth = styled.button`
  background: #c2c2c240;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  margin: 24px 0 12px;
  padding: 16px;
  border: 0;
  color: white;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
  }
`;


export const Row = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: space-between;
`;


export const Para = styled.p`
    color: red;
`;

export const InputImage = styled.input`
  
`
export const Label = styled.label`

  
  border: 0;
  color: #fff;
  height: 50px;
  line-height: 50px;
  
  
  margin-left: 20px;
 

`
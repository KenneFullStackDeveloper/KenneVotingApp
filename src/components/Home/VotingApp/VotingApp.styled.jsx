import styled from 'styled-components';


export const SelectCandidat = styled.div`
    box-shadow: rgba(98,129,255,0.17) 0px 48px 100px 0px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top:45px;
    padding: 2rem;
    gap: 20px;
    & > div > div{
       display: flex;
       flex-direction: row;
       
    } 

 `


 export const BoxSchadow = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7); /* noir transparent */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
   

 `

 export const StartVoteBtn = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: #ffffff;
  color: #000;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  transition: background-color 0.3s ease;
  `
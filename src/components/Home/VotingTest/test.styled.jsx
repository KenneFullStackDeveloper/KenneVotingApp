
import styled from 'styled-components';


export const Container = styled.div`
     min-height: 100vh;
     font-size: 0.7rem;
     background-color: #cdcdcd;
     padding:45px;


`

export const ContainerDashboard = styled.div`
     display: flex;
     flex-direction: row;
     Background-color:#ffffff;
`


export const ContainerProfile = styled.div`
     display: flex;
     flex-direction: column;
     width: 65%;
     height: 900px;
     padding: 18px;


`
export const Nav = styled.nav`
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-items:center


`

export const Separator = styled.div`
     height: 900px;
     background-color: #cdcdcd;
     width: 0.1%;
`


export const ContainerMeetingsSection = styled.div`
     display: flex;
     flex-direction: column;
     width: 34.99%;
     height: 900px;

`

export const GeneralKpi = styled.div`
     display: flex;
     flex-direction: row;
     justify-content: space-between;
     & > div{
          box-shadow: rgba(98,129,255,0.17) 0px 48px 100px 0px;
          width: 255px;
          border-left: 1px solid #9f7aea;
          border-radius: 10px;
          padding: 0px 25px
     }

`


export const ResulteachCandidat = styled.div`
     display: flex;
     flex-direction: row;
     justify-content: space-between;
     margin-top:7px;
     
     & > div{
     
           background-color: #f7fafc;
               border-radius: 10px;
               padding: 18px;
               text-align: center;
               border-left: 4px solid #4299e1;
               margin-bottom: 7px;
     }
    

`





     









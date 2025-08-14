import styled from 'styled-components';

export const ContainerResetPassword = styled.div`
   position: relative;
   top:0;
   left:0;
   right:0;
   bottom:0;
   display: flex;
   flex-direction: column;

 `

export const NavTitle = styled.nav`
   width:100%;
   top:0;
   display: flex;
   flex-direction: column;
   justify-content: center; 
   align-items: center;  
   background-color: rgba(0, 0, 0, 0.7); /* noir transparent */
   font-size:4rem;
   margin-bottom: 30px;
   position:fixed;
 `

 export const FormResetPassword = styled.div`
    background: #fff;
    border-radius: 12px;
    box-shadow: rgba(98,129,255,0.17) 0px 48px 100px 0px;
    justify-content: center; 
    align-items: center;  
    display: flex;
    flex-direction: column;
   
    padding: 6rem;
    gap: 20px;
    margin:auto;
    margin-top: 244px;
    margin-bottom: 244px;
    

    & > input,h2,p {
    margin-bottom: 1rem;

    } 
    & > button {

      padding: 1rem 2rem;
      font-size: 1.2rem;
      background-color: #36b370;
      color: #4c40f7 !important;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
      transition: background-color 0.3s ease;
      box-shadow: rgb(98 129 255 / 22%) 0px 7px 29px 0px;

    } 



  `


  export const FooterPage = styled.div`
    width: 100%;
    bottom:0;
    background-color:rgb(8, 8, 8);
    font-size: 4rem;
    margin-top:8px;
  


    `
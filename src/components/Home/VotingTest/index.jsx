import React, { useState, useEffect } from 'react';

import {
     Container,  ContainerDashboard,ContainerProfile,ContainerMeetingsSection,Separator,Nav,GeneralKpi,ResulteachCandidat
} from "./test.styled"

const TestVote = () => {
  return (
    <Container>

       <ContainerDashboard>
          <ContainerProfile>
            <Nav>
               <div>
                  <p>Result  dashboard overview</p>
               </div>
               <div>
                  <p>Result  dashboard overview</p>
               </div>
            </Nav>

            <GeneralKpi>
              <div>
                  <p>Total Vote</p>
                  <p>Result</p>
               </div>
              <div>
                  <p>Total Vote</p>
                  <p>Result</p>
              </div>
              <div>
                 <p>Total Vote</p>
                  <p>Result</p>
              </div>
              <div>
                <p>Total Vote</p>
                  <p>Result</p>
              </div>

            </GeneralKpi>
            <ResulteachCandidat>
               
                <div>
                   <p>Welcome, ResultVotingApp</p>
                   <p>Result  dashboard overview</p>
                </div>
                <div>
                  
                  <p>Welcome, ResultVotingApp</p>
                   <p>Result  dashboard overview</p>
                  
                </div>
            </ResulteachCandidat>
            <ResulteachCandidat>
               
               <div>
                   <p>Welcome, ResultVotingApp</p>
                   <p>Result  dashboard overview</p>
                </div>
                <div>
                    <p>Welcome, ResultVotingApp</p>
                    <p>Result  dashboard overview</p>
                </div>
            </ResulteachCandidat>
            <ResulteachCandidat>
               
               <div>
                   <p>Welcome, ResultVotingApp</p>
                   <p>Result  dashboard overview</p>
                </div>
                <div>
                   <div>
                         <p>Welcome, ResultVotingApp</p>
                         <p>Result  dashboard overview</p> 
                   </div>
                </div>
            </ResulteachCandidat>

          </ContainerProfile>
          <Separator></Separator>
          <ContainerMeetingsSection></ContainerMeetingsSection>
          
       </ContainerDashboard>

    </Container>





)


}

export default TestVote
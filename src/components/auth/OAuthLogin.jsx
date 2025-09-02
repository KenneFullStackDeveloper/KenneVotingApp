import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const OAuthLogin = () => {
    const navigate = useNavigate();
 
    useEffect(() => {
        //Extract the authorization code from the URL
        console.log("location.search:", location.search);
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        
        if (code != "") {
            //Exchange the code for an access token
            axios.post("http://localhost:8081/api/oauth/exchange-token", { code })
                .then(response => {
                    const token = response.data.token;
                    localStorage.setItem("token", token);
                    console.log("mytokenn.......",token)

                    if (token) {
                        axios.get("http://localhost:8081/api/oauth/user-details", {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })
                        .then(response => {
                             console.log("User Details+++++++:", response.data);
                             let user = {
                                role: "ROLE_APPLICANT",
                                username: response.data.email
                              }
                            
                              
                        })
                        .catch(error => {
                            console.error("Error fetching user details:", error);
                            alert("Failed to fetch user details. Please log in again.");
                        });
                    } 

                    //Redirect to the dashboard
                    navigate("/");
                })
                .catch(error => {
                    console.error("Error exchanging code for token:", error);
                    alert("Failed to log in. Please try again.");
                });
        } else {
            console.error("No authorization code found in URL.");
        }
    }, [navigate]);

    return <h2>Logging in...</h2>;
};

export default OAuthLogin;

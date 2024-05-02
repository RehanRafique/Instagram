"use client"

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
// import { useRouter } from 'next/router';
import { signUp, FacebookAuth } from "../config/firebase";
import "../styles/login.css"
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const router = useRouter();

    useEffect(() => {
      // Redirect to "/route" after 3 seconds
      const timer = setTimeout(() => {
          window.location.href = '/route';
      },);

      return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signUp({
                email: username,
                password
            });

            // If sign up is successful, navigate to another page
            router.push('/dashboard'); // Example: Navigate to the dashboard page
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed: " + error.message);
        }
    };

    const handleFacebookSignIn = async () => {
        try {
            const user = await FacebookAuth();
            console.log("Facebook user:", user);
            // Optionally handle Facebook sign-in
        } catch (error) {
            console.error("Facebook login error:", error);
            alert("Facebook login failed: " + error.message);
        }
    };



  return (
    <>
      <Head>
        <title>Login 04</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap" rel="stylesheet" />
      </Head>

      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 col-lg-10">
              <div className="wrap d-md-flex">
                <div className="img" style={{ backgroundImage: "url(https://img.freepik.com/premium-photo/natures-organic-beauty-vibrant-autumn-leaf-showcasing-seasonal-transformation_795881-40316.jpg)" }}></div>
                <div className="login-wrap p-4 p-md-5">
                  <div className="d-flex">
                    <div className="w-100">
                      <h3 className="mb-4">Sign In</h3>
                    </div>
                    <div className="w-100">
                      <p className="social-media d-flex justify-content-end">
                        <a href="#" className="social-icon d-flex align-items-center justify-content-center"><span className="fa fa-facebook"></span></a>
                        <a href="#" className="social-icon d-flex align-items-center justify-content-center"><span className="fa fa-twitter"></span></a>
                      </p>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="signin-form">
                    <div className="form-group mb-3">
                      <label className="label" htmlFor="name">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="label" htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <button type="button" onClick={handleSubmit} className="form-control btn btn-primary rounded submit px-3">Sign In</button>
                      <button type="button" onClick={handleFacebookSignIn} className="form-control btn btn-primary rounded submit px-3">Login with Facebook</button>
                    </div>
                    <div className="form-group d-md-flex">
                      <div className="w-50 text-left">
                        <label className="checkbox-wrap checkbox-primary mb-0">Remember Me
                          <input type="checkbox" checked />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                      <div className="w-50 text-md-right">
                        <a href="#">Forgot Password</a>
                      </div>
                    </div>
                  </form>
                  <p className="text-center">Not a member? <a href="signup">Sign Up</a></p>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
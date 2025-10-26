import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './EmailVerificationSuccess.css';
import { link } from '../../roteUrl/Link';

const EmailVerificationSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [verificationMessage, setVerificationMessage] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    console.log(token)

    if (token) {
      
      const validateToken = async () => {
        try {
          const result = await fetch(`${link}/user/confirm?token=${encodeURIComponent(token)}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            }
          });

          const response = await result.text();
          console.log(response)

          if (response === 'User successfully verified') {
            setVerificationMessage('Email Verified Successfully!');
            setIsVerified(true);

            
            setTimeout(() => {
              navigate('/login');
            }, 3000);
          } else {
            setVerificationMessage('Email verification failed. Please try again.');
            setIsVerified(false);
          }
        } catch (error) {
          console.error('Error verifying email:', error);
          setVerificationMessage('An error occurred. Please try again later.');
          setIsVerified(false);
        }
      };

      validateToken();
    } else {
      setVerificationMessage('Invalid token provided.');
      setIsVerified(false);
    }
  }, [location, navigate]);

  return (
    <div className="email-verification-container">
      <div className="email-verification-message">
        {isVerified ? (
          <>
            <h2>{verificationMessage}</h2>
            <p>You will be redirected to the login page shortly.</p>
          </>
        ) : (
          <>
            <h2>{verificationMessage}</h2>
            <p>If the issue persists, please contact support.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailVerificationSuccess;

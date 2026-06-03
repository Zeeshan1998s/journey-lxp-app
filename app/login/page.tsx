"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import '../styles/login-styles.css';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCredentialsLogin = (e: React.FormEvent) => {
    e.preventDefault();
    signIn("credentials", {
      email,
      password,
      callbackUrl: "/"
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-logo">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff9e64" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          Journey <span>LXP</span>
        </h1>
        <p className="login-subtitle">Enter the realm to continue your quest.</p>

        <button onClick={() => signIn("github", { callbackUrl: "/" })} className="auth-button github">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
          Continue with GitHub
        </button>
        
        <button onClick={() => signIn("google", { callbackUrl: "/" })} className="auth-button google">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.344-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/></svg>
          Continue with Google
        </button>

        <div className="divider">OR PLAY AS GUEST</div>

        <form onSubmit={handleCredentialsLogin} className="auth-form">
          <input 
            type="email" 
            placeholder="Email address" 
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-submit">Start Journey</button>
        </form>
      </div>
    </div>
  );
}

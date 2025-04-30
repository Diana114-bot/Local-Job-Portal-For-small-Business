import React from "react";

const AuthFormHeader = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-4">
      <h2 className="fw-bold">{title}</h2>
      <p className="text-muted">{subtitle}</p>
    </div>
  );
};

export default AuthFormHeader;

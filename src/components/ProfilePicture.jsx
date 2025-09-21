// src/components/ProfilePicture.jsx
import React from "react";

const ProfilePicture = ({ 
  src, 
  alt = "Profile", 
  size = "md", 
  className = "",
  fallbackClassName = ""
}) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10", 
    lg: "h-12 w-12",
    xl: "h-16 w-16"
  };

  const baseClasses = `rounded-xl flex items-center justify-center ${sizeClasses[size]} ${className}`;
  const fallbackClasses = `bg-gradient-to-tr from-blue-600 via-sky-500 to-emerald-500 ${fallbackClassName}`;

  if (src) {
    return (
      <div className={`${baseClasses} overflow-hidden`}>
        <img 
          src={src} 
          alt={alt}
          className="w-full h-full object-cover"
          onError={(e) => {
            // If image fails to load, hide the img and show fallback
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div className={`${fallbackClasses} w-full h-full hidden`} />
      </div>
    );
  }

  return (
    <div className={`${baseClasses} ${fallbackClasses}`}>
      <span className="text-white font-semibold text-sm">
        {alt.charAt(0).toUpperCase()}
      </span>
    </div>
  );
};

export default ProfilePicture;

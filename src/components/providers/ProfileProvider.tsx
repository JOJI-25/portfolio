'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export const defaultProfile = {
  name: "Your Name",
  title: "Aspiring Data Scientist & AI Engineer",
  bio: "Loading your incredible journey...",
  careerObjective: "Loading objective...",
  currentFocus: "Loading...",
  interests: ["Data Visualization", "Machine Learning"],
  typingPhrases: ["Aspiring Data Scientist"],
  resumeUrl: "#",
  education: "B.E. / B.Tech",
  university: "University",
  github: "",
  linkedin: "",
  email: ""
};

const ProfileContext = createContext({ profile: defaultProfile, loading: false });

export function ProfileProvider({ children, initialProfile }: { children: React.ReactNode, initialProfile?: any }) {
  const [profile, setProfile] = useState(() => {
    if (initialProfile && initialProfile.name) {
      return {
        ...defaultProfile,
        ...initialProfile,
        typingPhrases: initialProfile.typingPhrases ? initialProfile.typingPhrases.split(',').map((s: string) => s.trim()) : defaultProfile.typingPhrases
      };
    }
    return defaultProfile;
  });
  
  const [loading, setLoading] = useState(!initialProfile);

  useEffect(() => {
    // If no initial profile was provided from the server, fetch it on the client
    if (!initialProfile) {
      fetch('/api/profile')
        .then(res => res.json())
        .then(data => {
          if (data && data.name) {
            setProfile({
              ...defaultProfile,
              ...data,
              typingPhrases: data.typingPhrases ? data.typingPhrases.split(',').map((s: string) => s.trim()) : defaultProfile.typingPhrases,
            });
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [initialProfile]);

  return <ProfileContext.Provider value={{ profile, loading }}>{children}</ProfileContext.Provider>;
}

export function useProfileContext() {
  return useContext(ProfileContext);
}

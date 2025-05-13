import React, { useState } from 'react';
import ProfileReviewInput from '../components/ProfileAnalysis/ProfileReviewInput';
import ProfileReviewResults from '../components/ProfileAnalysis/ProfileReviewResults';

const ProfileReview = () => {
  const [tweetLinks, setTweetLinks] = useState<string[]>([]);

  return (
    <div>
      <ProfileReviewInput onLinksFetched={setTweetLinks} />
      <ProfileReviewResults tweetLinks={tweetLinks} />
    </div>
  );
};

export default ProfileReview;

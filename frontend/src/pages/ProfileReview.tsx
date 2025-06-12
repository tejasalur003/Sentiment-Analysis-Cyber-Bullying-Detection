import React, { useState } from 'react';
import ProfileReviewInput from '../components/ProfileAnalysis/ProfileReviewInput';
import ProfileReviewResults from '../components/ProfileAnalysis/ProfileReviewResults';

interface RedditPost {
  link: string;
  text: string;
}

const ProfileReview = () => {
  const [platform, setPlatform] = useState<'twitter' | 'reddit' | null>(null);
  const [tweetLinks, setTweetLinks] = useState<string[]>([]);
  const [redditPosts, setRedditPosts] = useState<RedditPost[]>([]);

  const handleResults = (result: {
    platform: 'twitter' | 'reddit';
    tweetLinks?: string[];
    redditPosts?: RedditPost[];
  }) => {
    setPlatform(result.platform);
    if (result.platform === 'twitter') {
      setTweetLinks(result.tweetLinks || []);
      setRedditPosts([]);
    } else if (result.platform === 'reddit') {
      setRedditPosts(result.redditPosts || []);
      setTweetLinks([]);
    }
  };

  return (
    <div>
      <ProfileReviewInput onResultsFetched={handleResults} />
      <ProfileReviewResults
        platform={platform}
        tweetLinks={tweetLinks}
        redditPosts={redditPosts}
      />
    </div>
  );
};

export default ProfileReview;

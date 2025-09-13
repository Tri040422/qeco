import React from "react";

const FeedbackCard = ({ text, author }) => (
  <div className="feedback">
    <p>"{text}"</p>
    {author && <span className="feedback-author">- {author}</span>}
  </div>
);

export default FeedbackCard;

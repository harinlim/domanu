'use client';
import React, { useState } from 'react';
import { Text } from '@mantine/core';
interface FAQItemProps {
  question: string;
  answer: string;
}
const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  // Split the answer by newlines to create an array of lines
  const answerLines = answer.split('\n');
  return (
    <div className="faq-item">
      <div className="faq-question" onClick={toggleOpen} style={{ cursor: 'pointer' }}>
        <h3>{question}</h3>
        <button>{isOpen ? '-' : '+'}</button>
      </div>
      {isOpen && (
        <div className="faq-answer">
          {/* Render each line as a separate Text component */}
          {answerLines.map((line, index) => (
            <Text key={index} style={{ marginBottom: 10 }}>
              {line}
            </Text>
          ))}
        </div>
      )}
    </div>
  );
};
export default FAQItem;
// src/pages/FAQ.tsx

import React from 'react';
import FAQItem from '../components/FAQItem';
import { Container, Title, Text, Stack, Divider, Paper } from '@mantine/core';

interface FAQ {
  question: string;
  answer: string;
}

const UserfaqData: FAQ[] = [
  {
    question: 'User policies and how to ban a user',
    answer:
      'All Domanu users must adhere to standard rules/regulations of Domanu. ' +
      'Users are not allowed to coordinate bidding inflation with sellers on Domanu services, doing so may result in a permanent ban. ' +
      'Users are not allowed to break commitment rules agreed upon, legal action may be taken otherwise. Users cannot place bids/commitments on the same service after purchase is completed.',
  },
  {
    question: 'How do service contracts work?',
    answer:
      'Service contracts work to save you money by entering you into a commitment of multiple services over time instead of one service at once. For example, a haircut contract to purchase 50 monthly haircuts across 4 years for $1000. Since you are entering into a long-term commitment, it becomes worthwhile for the barber to give discounts.',
  },
  {
    question: 'How to place a bid on a service',
    answer:
      '1. Navigate to the desired marketplace\n' +
      '2. Click on the service you wish to buy\n' +
      '3. Enter a bid amount you would be willing to commit to once bidding ends\n' +
      '4. Wait for bidding to end or continue bidding until your amount is the highest bid available\n',
  },
  {
    question: 'How do I request designer/admin account permissions?',
    answer:
      '1. Navigate to account profile\n' +
      '2. Under ‘Permissions’ request for the designer/admin role using the form provided\n' +
      '3. You will receive an email upon approval/denial of your request\n',
  },
  {
    question: 'Service contract rules and regulation',
    answer:
      'When you enter into a commitment, both parties will add money to a commitment deposit. In the event that one party backs out of the agreement, the commitment deposit will go to the other.',
  },
  {
    question: 'Marketplace policies',
    answer:
      'All Domanu Sellers must adhere to standard rules/regulations of Domanu. ' +
      'Sellers are not allowed to offer same service on multiple marketplaces. ' +
      'Sellers are not allowed to coordinate bidding inflation with users on Domanu services, doing so may result in a permanent ban. ' +
      'Sellers must cordially coordinate with designers to create a marketplace to their satisfaction that adheres to Domanu rules/regulation. ',
  },
];

const DesignerfaqData: FAQ[] = [
  {
    question: 'How do I create and modify marketplaces?',
    answer:
      '1. Navigate to your Domanu homepage\n' +
      '2. Click the + labeled ‘Create a New Marketplace’\n' +
      '3. Input your desired name, description, privacy settings, and type of marketplace\n' +
      '4. Click the ‘Create Marketplace’ button when you are finished entering marketplace details\n',
  },
];

const AdminfaqData: FAQ[] = [
  {
    question: 'How do I ban a user?',
    answer:
      '1. Navigate to user account in question using search\n' +
      '2. Scroll to the bottom of the account profile\n' +
      '3. Click the ‘Ban User’ button and fill out corresponding form with reason for ban details\n' +
      '4. Click the ‘Submit’ button, user should lose account access immediately upon submission and be notified by email\n',
  },
  {
    question: 'How to give users designer/admin permissions (Method 1) - Direct permissions given',
    answer:
      '1. Navigate to desired account profile\n' +
      '2. Under ‘Permissions’ select ‘Grant User Designer Permission’ or ‘Grant User Designer Permission’, take note that designers are more limited in Domanu abilities than admins\n' +
      '3. Complete form to give designer/admin permissions to user\n',
  },
  {
    question: 'How to give users designer/admin permissions (Method 2) - Responding to permission request',
    answer:
      '1. Navigate to email received concerning account permission request\n' +
      '2. Click on Domanu link provided\n' +
      '3. Sign into admin account\n' +
      '4. Click on ‘Accept’ or ’Deny’ permission request\n' +
      '5. User should be notified immediately about account permission(s) granted\n',
  },
  {
    question: 'How to delete Marketplaces',
    answer:
      '1. Navigate to the desired marketplace using search\n' +
      '2. Scroll to the bottom of the marketplace details\n' +
      '3. Click the ‘Delete Marketplace’ button and fill out the corresponding form with reason for deletion\n' +
      '4. Click the ‘Submit’ button, seller should lose marketplace access immediately upon submission and be notified by email',
  },
];

const FAQ: React.FC = () => {
  return (
    <Container>
      <Title size="h1" mt="md" style={{ color: '#699B60', marginLeft: 250, paddingTop: 20, paddingRight: 0}}>
        Frequently Asked Questions
      </Title>
      <Divider my="lg" />
      <Stack >
        <Paper shadow="xs" p="md">
          <Text size="lg" style={{ fontWeight: 700 }}>
            User FAQs
          </Text>
          {UserfaqData.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} />
          ))}
        </Paper>
        <Paper shadow="xs" p="md">
          <Text size="lg" style={{ fontWeight: 700 }}>
            Designer FAQs
          </Text>
          {DesignerfaqData.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} />
          ))}
        </Paper>
        <Paper shadow="xs" p="md">
          <Text size="lg" style={{ fontWeight: 700 }}>
            Admin FAQs
          </Text>
          {AdminfaqData.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} />
          ))}
        </Paper>
      </Stack>
    </Container>
  );
};

export default FAQ;
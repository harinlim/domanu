# Domanu

Domanu is an online hub of marketplaces that allows user to enter into commitment-based transactional relationships to give or receive services.
This website is designed to increase connectivity in consumerism and give users a way to buy and sell goods with the knowledge that they can rely on the opposite party.

This app is built with a React frontend and Python backend that integrates with Supabase to handle storage and authentication.

## Running the App

First, make sure you have node v22.9 and pnpm 8.15.8 installed. 

Install packages:

```bash
pnpm i
```
```bash
pip install -r requirements.txt
```

Run the development server:

```bash
pnpm dev
```

Start the Supabase server:
```bash
uvicorn backend.api.main:app --reload
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Detailed Documentation

Details about the project's backend structure can be found [here](backend/README.md)

Details about the project's APIs can be found [here](backend/api/README.md)

Details on how to run tests on the project's APIs can be found [here](backend/test/README.md)

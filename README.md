This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

![Screenshot](https://drive.google.com/file/d/1FqOXbMos5LSueqHI6iSM8jG875nPSJ9T/view?usp=drive_link)

# Ethereum coin flip game

The coin flip Ethereum web app is built using Next.js for server-side rendering and web3.js for blockchain interactions, enabling wallet connectivity and smart contract integration for secure transactions.

## Demo

https://coin-flip-next-app.vercel.app/

## The game

Players start with 100 tokens, which can be purchased using Ethereum. The game offers two betting options: heads or tails, with a wager of 10 tokens per bet. Upon flipping the coin, if the player wins, their bet is doubled; if they lose, the bet amount is forfeited. Smart contracts ensure secure and transparent transactions throughout the gameplay.

## How to play

You must install [Metamask](https://metamask.io/) in your browser in order to play the game. Currently we are testing in Sepolia ethereum test network so be sure to select it when setup Metamask.

## No funds to play?

This coin flip Ethereum web app operates on the Sepolia Ethereum testnet. To acquire ETH for transactions, users can visit the [Ethereum Sepolia Faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia), where they receive 0.5 ETH daily for testing purposes. This setup allows users to participate in the game without using real funds, ensuring a secure environment for testing and development.




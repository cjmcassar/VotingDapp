import { Injectable } from '@nestjs/common'
import { ethers } from 'ethers'

import {} from 'dotenv/config'

import * as TokenizedBallotJson from './assets/TokenizedBallot.json'
import * as ERC20VotesJson from './assets/ERC20Votes.json'

// Cri's ballot contract from week 3
const BALLOT_CONTRACT_ADDRESS = '0x6F1a34636A572A1BacCa073d3cF93270ec7C2287'
const TOKEN_CONTRACT_ADDRESS = '0xFEAa7D23E7F4c86017C7973aB135592C2FD95AeF'

export interface CastVoteDTO {
  proposal: string
  amount: string
}

export interface DelegateDTO {
  address: string
}

const options = {
  alchemy: process.env.ALCHEMY_API_KEY,
  infura: process.env.INFURA_API_KEY,
}

@Injectable()
export class AppService {
  provider: ethers.providers.Provider
  // TODO: Provide types for wallet and signer. Attempted implementation below.
  wallet: ethers.Wallet
  signer: ethers.Signer
  tokenContract: ethers.Contract
  ballotContract: ethers.Contract

  constructor() {
    this.provider = ethers.getDefaultProvider('goerli', options)
    // TODO: Set up signer. Attempted implementation below.
    this.wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? '')
    this.signer = this.wallet.connect(this.provider)

    this.tokenContract = new ethers.Contract(
      TOKEN_CONTRACT_ADDRESS,
      ERC20VotesJson.abi,
      this.provider,
    )

    this.ballotContract = new ethers.Contract(
      BALLOT_CONTRACT_ADDRESS,
      TokenizedBallotJson.abi,
      this.provider,
    )
  }

  async mint(to: string, amount: number) {
    console.log('signer: ', this.signer)
    const signedContract = this.tokenContract.connect(this.signer)
    console.log(`Minting ${amount} tokens to ${to}`)
    const mintTx = await signedContract.mint(to, amount)
    await mintTx.wait()
    const balance = await this.tokenContract.balanceOf(to)
    console.log(`Minted ${amount} tokens to ${to}. Balance is now ${balance}`)
  }

  async castVote(body: CastVoteDTO) {
    // TODO: Pass in signer to contract/transaction. Currently errors saying: 'Error: sending a transaction requires a signer'
    console.log('casting vote')
    const castVoteTx = await this.ballotContract.vote(
      body.proposal,
      body.amount,
    )
    const castVoteTxReceipt = await castVoteTx.wait()
    console.log({ castVoteTxReceipt })
  }

  async delegate(body: DelegateDTO) {
    // TODO: Find fix for delegate. TokenizedBallot.json abi doesn't have a delegate method.
    console.log('signer: ', this.signer)
    const signedContract = this.tokenContract.connect(this.signer)

    const delegateTx = await signedContract.delegate(body.address)
    await delegateTx.wait()
    const votesAfterDelegate = await this.tokenContract.getVotes(body.address)
    console.log(
      `After self-delegating ${
        body.address
      } has a voting power of ${ethers.utils.formatEther(
        votesAfterDelegate,
      )} votes\n`,
    )
  }

  async queryWinner() {
    console.log('Query winning proposal')

    const winningProposal = await this.ballotContract.winnerName()
    const name = ethers.utils.parseBytes32String(winningProposal)
    console.error('No winning proposal yet', name)
    return name
  }
}

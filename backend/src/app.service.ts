import { Injectable } from '@nestjs/common'
import { ethers } from 'ethers'
import * as dotenv from 'dotenv'
dotenv.config()

import * as TokenizedBallotJson from './assets/TokenizedBallot.json'

// Cri's ballot contract from week 3
const CONTRACT_ADDRESS = '0x8A6A405041FFE6C09DE84cB74cEE5b5767D2C2BE'

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
  contract: ethers.Contract

  constructor() {
    this.provider = ethers.getDefaultProvider('goerli', options)
    // TODO: Set up signer. Attempted implementation below.
    this.wallet = new ethers.Wallet(process.env.PRIVATE_KEY)
    this.signer = this.wallet.connect(this.provider)

    this.contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      TokenizedBallotJson.abi,
      this.provider,
    )
  }

  async mint(to: string, amount: number) {
    console.log(`Minting ${amount} tokens to ${to}`)
    const mintTx = await this.contract.mint(to, amount)
    await mintTx.wait()
    const balance = await this.contract.balanceOf(to)
    console.log(`Minted ${amount} tokens to ${to}. Balance is now ${balance}`)
  }

  async castVote(body: CastVoteDTO) {
    // TODO: Pass in signer to contract/transaction. Currently errors saying: 'Error: sending a transaction requires a signer'
    console.log('casting vote')
    const castVoteTx = await this.contract.vote(body.proposal, body.amount)
    const castVoteTxReceipt = await castVoteTx.wait()
    console.log({ castVoteTxReceipt })
  }

  async delegate(body: DelegateDTO) {
    // TODO: Find fix for delegate. TokenizedBallot.json abi doesn't have a delegate method.
    const delegateTx = await this.contract.delegate(body.address)
    await delegateTx.wait()
    const votesAfterDelegate = await this.contract.getVotes(body.address)
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
    const winningProposal = await this.contract.winnerName()
    const name = ethers.utils.parseBytes32String(winningProposal)
    return name
  }
}

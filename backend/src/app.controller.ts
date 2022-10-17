import { Body, Controller, Get, Post } from '@nestjs/common'
import { AppService, CastVoteDTO, DelegateDTO } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('mint')
  mint(@Body() body: { to: string; amount: number }) {
    return this.appService.mint(body.to, body.amount)
  }

  @Post('cast-vote')
  castVote(@Body() body: CastVoteDTO) {
    return this.appService.castVote(body)
  }

  @Post('delegate')
  delegate(@Body() body: DelegateDTO) {
    return this.appService.delegate(body)
  }

  @Get('query-winner')
  queryWinner() {
    return this.appService.queryWinner()
  }
}

import { Controller, Get, Redirect } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController(true)
@Controller()
export class AppController {
  @Get()
  @Redirect('/api', 302)
  index() {}
}

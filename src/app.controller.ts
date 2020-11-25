import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { Url } from './models/Url';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/links")
  getLinks(): Url[] {
    return this.appService.getUrls();
  }

  @Get(":hash")
  getUrl(@Param() params): Url {
    return this.appService.getUrl(params.hash);;
  }

  @Post("/links")
  postLinks(@Body() body): Url[] {
    return this.appService.addUrl(body.url);
  }

  @Put(":hash")
  updateUrl(@Param() param, @Body() body,): Url[] {
    return this.appService.setUrl(param.hash, body.url);
  }

  @Delete(":hash")
  deleteUrl(@Param() params): Url[] {
    return this.appService.deleteUrl(params.hash);
  }

}

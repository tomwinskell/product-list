import { Controller, Get, Route } from 'tsoa';
import { GenerateService } from './generateService';

@Route('generate')
export class GenerateController extends Controller {
  @Get()
  public async generateData(): Promise<void> {
    return new GenerateService().generateData();
  }
}

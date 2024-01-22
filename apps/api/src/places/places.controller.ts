import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Post()
  create(@Body() createPlaceDto: CreatePlaceDto, @Req() request: any) {
    createPlaceDto.ownerId = request.user.id;
    return this.placesService.create(createPlaceDto);
  }

  @Get('')
  findAll(@Req() request: any) {
    const id = request.user.id;
    return this.placesService.findAllByOwner(id);
  }

  @Get(':placeId')
  findOne(@Param('placeId') placeId: string) {
    return this.placesService.findOne(placeId);
  }

  @Patch(':placeId')
  update(
    @Param('placeId') placeId: string,
    @Body() updatePlaceDto: UpdatePlaceDto,
  ) {
    return this.placesService.update(placeId, updatePlaceDto);
  }

  @Delete(':placeId')
  remove(@Param('placeId') placeId: string) {
    return this.placesService.remove(placeId);
  }
}

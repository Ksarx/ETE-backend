import { PartialType } from '@nestjs/mapped-types';
import { CreateShiftLogDto } from './create-shift-log.dto';

export class UpdateShiftLogDto extends PartialType(CreateShiftLogDto) {}

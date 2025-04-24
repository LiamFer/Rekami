import {  IsEnum } from 'class-validator';
import { interestValue } from 'src/Types/interestValue';

export class EditInterestDTO {
  @IsEnum(interestValue)
  value: interestValue;
}

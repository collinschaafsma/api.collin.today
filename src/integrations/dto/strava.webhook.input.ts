import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class StravaWebhookInput {
  @IsString()
  @IsNotEmpty()
  public aspect_type!: string;

  @IsNumber()
  @IsNotEmpty()
  public object_id!: number;

  @IsString()
  @IsNotEmpty()
  public object_type!: string;

  @IsNumber()
  @IsNotEmpty()
  public owner_id!: number;
}
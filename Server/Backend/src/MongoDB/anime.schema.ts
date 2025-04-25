import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type AnimeDocument = Anime & Document;

@Schema({ strict: false })
export class Anime {
  @Prop({ type: MongooseSchema.Types.Mixed })
  data: Record<string, any>; 
}

export const AnimeSchema = SchemaFactory.createForClass(Anime);

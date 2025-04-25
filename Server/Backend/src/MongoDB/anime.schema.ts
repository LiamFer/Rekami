import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type AnimeDocument = Anime & Document;

// Deixei dessa forma como Any pois os Animes tem Estruturas diferentes no Jikan
@Schema({ strict: false })
export class Anime {
  @Prop({ type: MongooseSchema.Types.Mixed })
  data: Record<string, any>; 
}

export const AnimeSchema = SchemaFactory.createForClass(Anime);

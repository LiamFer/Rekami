import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import JikanAPI from 'src/Classes/jikan';
import { User } from 'src/Database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JikanService {
  private Jikan: JikanAPI;
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    this.Jikan = new JikanAPI();
  }

  async getAnimeRecommendations(page:number) {
    return await this.Jikan.getRecentAnimeRecommendations(page);
  }


}

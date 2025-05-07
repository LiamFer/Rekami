export type AnimeEpisode = {
  mal_id: number;
  url: string;
  title: string;
  title_japanese: string;
  title_romanji: string;
  aired: string;
  score: number | null;
  filler: boolean;
  recap: boolean;
  forum_url: string;
};

import { Controller, Get, Render, Param } from '@nestjs/common';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get(':slug')
  @Render('client/pages/songs/list')
  async findAll(@Param('slug') slug: string): Promise<{
    titlePage: string;
    message: string;
    songs: any[];
  }> {
    const songs = await this.songsService.findAll(slug);
    return {
      titlePage: 'Danh sách bài hát',
      message: 'Danh sách bài hát',
      songs,
    };
  }
}

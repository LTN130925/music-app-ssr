import { Controller, Get, Patch, Render, Param, HttpCode } from '@nestjs/common';

import { SongsService } from './songs.service';


@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  // [GET] /songs/:slug
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

  // [GET] /songs/detail/:slug
  @Get('detail/:slug')
  @Render('client/pages/songs/detail')
  async findOne(@Param('slug') slug: string): Promise<{
    titlePage: string;
    message: string;
    song: any;
  }> {
    const song = await this.songsService.findOne(slug);
    return {
      titlePage: 'Chi tiết bài hát',
      message: 'Chi tiết bài hát',
      song,
    };
  }

  // [PATCH] /songs/like/:type_like/:id
  @Patch('like/:type_like/:id')
  @HttpCode(200)
  async updateLike(@Param('type_like') typeLike: string, @Param('id') id: string): Promise<{
    message: string,
    likes: number,
  }> {
    const likes: number = await this.songsService.findOneAndUpdate(typeLike, id);
    return {
      message: 'cập nhật thành công!',
      likes: likes
    }
  }
}

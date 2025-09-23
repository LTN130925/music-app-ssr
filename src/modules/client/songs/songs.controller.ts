import { Controller, Get, Render } from '@nestjs/common';

@Controller('songs')
export class SongsController {
  // constructor(private readonly songsService: SongsService) {}

  @Get()
  @Render('client/pages/songs/list')
  async findAll(): Promise<{
    titlePage: string;
    message: string;
    songs: any[];
  }> {
    return {
      titlePage: 'Danh sách bài hát',
      message: 'Danh sách bài hát',
      songs: [
        {
          img: 'https://backend.daca.vn/assets/images/cat-doi-noi-sau.jpg',
          title: 'Cát Đôi Nỗi Sầu',
          singer: 'Tăng Duy Tân',
          likes: '1000',
          time: 'Hôm nay',
          slug: 'cat-doi-noi-sau',
        },
        {
          img: 'https://backend.daca.vn/assets/images/ngay-mai-nguoi-ta-lay-chong.jpg',
          title: 'Ngày Mai Người Ta Lấy Chồng',
          singer: 'Thành Đạt',
          likes: '1000',
          time: 'Hôm nay',
          slug: 'ngay-mai-nguoi-ta-lay-chong',
        },
        {
          img: 'https://backend.daca.vn/assets/images/tat-ca-hoac-khong-la-gi-ca.jpg',
          title: 'Tất Cả Hoặc Không Là Gì Cả',
          singer: 'Cao Thái Sơn',
          likes: '1000',
          time: 'Hôm qua',
          slug: 'tat-ca-hoac-khong-la-gi-ca',
        },
        {
          img: 'https://backend.daca.vn/assets/images/ruou-mung-hoa-nguoi-dung.jpg',
          title: 'Rượu Mừng Hóa Người Dưng',
          singer: 'TLong',
          likes: '1000',
          time: 'Hôm qua',
          slug: 'ruou-mung-hoa-nguoi-dung',
        },
      ],
    };
  }
}

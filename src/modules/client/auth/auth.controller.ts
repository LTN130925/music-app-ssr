import { Controller, Get, Post, Body, Render, UseGuards, Req, Res, HttpCode } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { RegisterValidate } from '../../../common/validate/register.validate'
// import { AuthenticatedMiddleware } from '../../../common/middleware/authenticated.middlware';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get('register')
    @Render('client/pages/auth/register')
    register() {
        return {
            titlePage: 'Trang đăng ký',
        }
    }

    @Post('register')
    async registerPost(
        @Body() body: { fullName: string, email: string, password: string, confirmPassword: string },
        @Res() res: Response,
        @Req() req: Request)
    {
        try {
            // validate register
            const errors = RegisterValidate(body.fullName, body.email, body.password, body.confirmPassword);
            if (errors) {
                req.flash('error', errors);
                return res.redirect('/auth/register');
            }

            await this.authService.register(body);
            res.redirect(`/auth/login`);
        } catch (err: any) {
            console.log(err);
            if (err.getResponse && err.getResponse().message) {
                const messages = err.getResponse().message;
                const msg = Array.isArray(messages) ? messages.join('<br>') : messages;
                req.flash('error', msg);
            } else {
                req.flash('error', err.message || 'Đăng ký thất bại');
            }
            res.redirect('/auth/register');
        }
    }

    // @Get('login')
    // @Render('client/pages/auth/login')
    // login() {
    //     return {
    //         titlePage: 'Trang đăng nhập',
    //     }
    // }
    //
    // @UseGuards(AuthGuard('local'))
    // @Post('login')
    // loginPost(@Res() res: Response, @Req() req: Request) {
    //     req.login(req.user as any, (err) => {
    //         if (err) {
    //             console.error('login err', err);
    //             return res.redirect('/auth/login');
    //         }
    //         console.log('login success!');
    //         res.redirect('/topics');
    //     });
    // }
    //
    // @Get('logout')
    // logout(@Req() req: Request, @Res() res: Response) {
    //     req.logout(() => {
    //         res.redirect('/auth/login');
    //     });
    // }
    //
    // @UseGuards(AuthenticatedMiddleware)
    // @Get('debug')
    // @HttpCode(200)
    // debug(@Req() req: Request) {
    //     return {
    //         debugging: req.session,
    //     }
    // }
}
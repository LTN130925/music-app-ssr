import { Controller, Get, Post, Body, Render, UseGuards, Req, Res, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { RegisterValidate } from '../../../common/validate/register.validate';
import { AuthenticatedMiddleware } from '../../../common/middleware/authenticated.middlware';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get('register')
    @Render('client/pages/auth/register')
    register(@Req() req: Request) {
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
            req.flash('error', 'Đăng ký thất bại');
            res.redirect('/auth/register');
        }
    }

    @Get('login')
    @Render('client/pages/auth/login')
    login(@Req() req: Request) {
        return {
            titlePage: 'Trang đăng nhập',
        }
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    loginPost(@Req() req: Request, @Res() res: Response) {
        if (!req.user) return res.redirect('/auth/login');
        req.login(req.user, (err) => {
            if (err) {
                req.flash('error', 'Đăng nhập thất bại!');
                return res.redirect('/auth/login');
            }
            req.flash('success', 'Đăng nhập thành công!');
            return res.redirect('/topics');
        });
    }

    @Get('logout')
    logout(@Req() req: Request, @Res() res: Response) {
        req.logout(() => {
            res.redirect('/auth/login');
        });
    }

    @UseGuards(AuthenticatedMiddleware)
    @Get('debug')
    @HttpCode(200)
    debug(@Req() req: Request) {
        return {
            user: req.user,
            debugging: req.session,
        }
    }
}
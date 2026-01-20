/**
 * 📚 NestJS 入门学习 - Controller (控制器)
 *
 * 控制器负责处理 HTTP 请求并返回响应
 *
 * 💡 核心装饰器：
 * - @Controller('path') - 定义路由前缀
 * - @Get() / @Post() / @Put() / @Delete() - HTTP 方法
 * - @Param('name') - 获取 URL 参数
 * - @Body() - 获取请求体
 * - @Query('key') - 获取查询参数
 */

import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // 基础路径为 /
export class AppController {
  /**
   * 💡 依赖注入
   * - NestJS 会自动创建 AppService 实例并注入
   * - private readonly 表示这是私有的只读属性
   */
  constructor(private readonly appService: AppService) {}

  // ============================================
  // 🎯 示例1: 基础 GET 请求
  // 访问: GET http://localhost:3000/
  // ============================================
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // ============================================
  // 🎯 示例2: 带路径参数的 GET 请求
  // 访问: GET http://localhost:3000/hello/张三
  // ============================================
  @Get('hello/:name')
  getHelloName(@Param('name') name: string): string {
    return `你好, ${name}! 欢迎学习 NestJS 🚀`;
  }

  // ============================================
  // 🎯 示例3: 带查询参数的 GET 请求
  // 访问: GET http://localhost:3000/greet?name=李四&age=25
  // ============================================
  @Get('greet')
  greet(
    @Query('name') name: string,
    @Query('age') age?: string,
  ): object {
    return {
      message: `你好, ${name || '游客'}!`,
      age: age ? parseInt(age) : null,
      timestamp: new Date().toISOString(),
    };
  }

  // ============================================
  // 🎯 示例4: POST 请求处理
  // 访问: POST http://localhost:3000/users
  // Body: { "name": "王五", "email": "wangwu@example.com" }
  // ============================================
  @Post('users')
  createUser(
    @Body() body: { name: string; email: string },
  ): object {
    // 💡 实际项目中应该调用 Service 处理业务逻辑
    return {
      id: Date.now(),
      name: body.name,
      email: body.email,
      createdAt: new Date().toISOString(),
      message: '用户创建成功!',
    };
  }

  // ============================================
  // 🎯 示例5: 返回对象 (自动转 JSON)
  // 访问: GET http://localhost:3000/info
  // ============================================
  @Get('info')
  getInfo(): object {
    return {
      framework: 'NestJS',
      version: '10.x',
      features: ['依赖注入', '模块化', 'TypeScript', '装饰器'],
      docs: 'https://docs.nestjs.com',
    };
  }
}

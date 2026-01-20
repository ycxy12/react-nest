/**
 * 📚 NestJS 入门学习 - Service (服务)
 *
 * Service 负责处理业务逻辑，可以被多个 Controller 共享
 *
 * 💡 核心概念：
 * - @Injectable() 装饰器标记类可被注入
 * - Service 是单例的，整个应用只有一个实例
 * - 将业务逻辑从 Controller 分离，便于测试和复用
 */

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * 💡 基础方法示例
   * 返回欢迎信息
   */
  getHello(): string {
    return '🎉 欢迎学习 NestJS! 访问 /info 查看更多示例';
  }

  /**
   * 💡 带参数的方法
   * 实际项目中这里通常会调用数据库
   */
  getUserById(id: number): object | null {
    // 模拟数据库查询
    const users = [
      { id: 1, name: '张三', email: 'zhangsan@example.com' },
      { id: 2, name: '李四', email: 'lisi@example.com' },
    ];
    return users.find(user => user.id === id) || null;
  }

  /**
   * 💡 异步方法示例
   * 实际项目中数据库操作通常是异步的
   */
  async getAllUsers(): Promise<object[]> {
    // 模拟异步数据库查询
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, name: '张三' },
          { id: 2, name: '李四' },
          { id: 3, name: '王五' },
        ]);
      }, 100);
    });
  }
}

/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Put, Delete, Body, Param, Query, NotFoundException } from '@nestjs/common';
import { TaskService } from './task.service';
import { FilterTaskDTO } from './dto/filter-task.dto';
import { CreateTaskDTO } from './dto/create-task.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) { }

  @Get('/')
  async getTasks(@Query() filterTaskDTO: FilterTaskDTO) {
    if (Object.keys(filterTaskDTO).length) {
      const filteredTasks = await this.taskService.getFilteredTasks(filterTaskDTO);
      return filteredTasks;
    } else {
      const allTasks = await this.taskService.getAllTasks();
      return allTasks;
    }
  }

  @Get('/:id')
  async getTask(@Param('id') id: string) {
    const product = await this.taskService.getTask(id);
    if (!product) throw new NotFoundException('Task does not exist!');
    return product;
  }

  @Post('/')
  async addTask(@Body() createTaskDTO: CreateTaskDTO) {
    const product = await this.taskService.addTask(createTaskDTO);
    return product;
  }

  @Put('/:id')
  async updateTask(@Param('id') id: string, @Body() createTaskDTO: CreateTaskDTO) {
    const task = await this.taskService.updateTask(id, createTaskDTO);
    if (!task) throw new NotFoundException('Task does not exist!');
    return task;
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string) {
    const product = await this.taskService.deleteTask(id);
    if (!product) throw new NotFoundException('Task does not exist');
    return product;
  }
}

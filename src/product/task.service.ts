/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { FilterTaskDTO } from './dto/filter-task.dto';
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TaskService {
    constructor(@InjectModel('Task') private readonly taskModel: Model<TaskDocument>){

    }

    async getFilteredTasks(filterTaskDTO: FilterTaskDTO): Promise<Task[]> {
        const { search } = filterTaskDTO;
        let tasks = await this.getAllTasks();
    
        if (search) {
          tasks = tasks.filter(task => 
            task.name.includes(search) ||
            task.subCategories.includes(search)
          );
        }
    
        return tasks;
      }
    
      async getAllTasks(): Promise<Task[]> {
        const tasks = await this.taskModel.find().exec();
        return tasks;
      }
    
      async getTask(id: string): Promise<Task> {
        const task = await this.taskModel.findById(id).exec();
        return task;
      }
    
      async addTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
        const newTask = await this.taskModel.create(createTaskDTO);
        return newTask.save();
      }
    
      async updateTask(id: string, createTaskDTO: CreateTaskDTO): Promise<Task> {
        const updatedTask = await this.taskModel
          .findByIdAndUpdate(id, createTaskDTO, { new: true });
        return updatedTask;
      }
    
      async deleteTask(id: string): Promise<any> {
        const deletedTask = await this.taskModel.findByIdAndDelete(id);
        return deletedTask;
      }

}

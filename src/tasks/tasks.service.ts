import { Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuid} from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task.status.enum';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository){}
    // private tasks: Task[] = [];

    // getAllTasks(): Task[]{
    //     return this.tasks;
    // }

    // getTaskWithFilters(filterDto:GetTaskFilterDto) : Task[]{
    //     const {status, search} = filterDto;
    //     let tasks = this.getAllTasks();

    //     if (status){
    //         tasks = tasks.filter(task => task.status == status);
    //     }

    //     if (search){
    //         tasks = tasks.filter(task => task.description.includes(search) || task.title.includes(search));
    //     }

    //     return tasks;
    // }
    
    async getTaskById(id: number): Promise<Task> {
        const foundTask = await this.taskRepository.findOne(id);
        if (!foundTask) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }
        return foundTask;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
        return this.taskRepository.createTask(createTaskDto);
    }

    async deleteTaskById(id: number): Promise<void>{
       const result = await this.taskRepository.delete(id);
       if (result.affected === 0){
            throw new NotFoundException(`Task with id ${id} not found`);
       }
    }

    async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]>{
        return await this.taskRepository.getTasks(filterDto);
    }
    
    async updateTaskStatus(id: number, taskStatus: TaskStatus) {
        const task = await this.getTaskById(id);
        task.status = taskStatus;
        await task.save();
        return task;
    }   
    // updateTaskStatusById(id:string, taskStatus:TaskStatus): Task{
    //     const task: Task = this.tasks.find(task => task.id == id);
    //     task.status = taskStatus;
    //     return task;
    // }
}

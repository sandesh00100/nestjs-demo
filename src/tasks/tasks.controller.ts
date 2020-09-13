import { Controller, Get, Post, Body, Param, Delete, Patch, Query, ValidationPipe, UsePipes, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task.status.enum';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
    constructor(
        private tasksService: TasksService) {}

    @Get()
    @UsePipes(ValidationPipe)
    getTasks(@Query() filterDto: GetTaskFilterDto): Promise<Task[]>{
        return this.tasksService.getTasks(filterDto);
    }
    
    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task>{
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task>{
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<void>{
        return this.tasksService.deleteTaskById(id);
    }

    @Patch('/:id')
    updateTaskStatus(@Param('id', ParseIntPipe) id: number, @Body('taskStatus', TaskStatusValidationPipe) taskStatus:TaskStatus): Promise<Task>{
        return this.tasksService.updateTaskStatus(id, taskStatus);
    }
}

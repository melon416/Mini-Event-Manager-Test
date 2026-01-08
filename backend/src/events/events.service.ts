import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto) {
    return this.prisma.event.create({
      data: createEventDto,
    });
  }

  async findAll() {
    return this.prisma.event.findMany({
      orderBy: {
        date: 'asc',
      },
    });
  }

  async findOne(id: number) {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    await this.findOne(id); // Check if event exists

    return this.prisma.event.update({
      where: { id },
      data: updateEventDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Check if event exists

    await this.prisma.event.delete({
      where: { id },
    });

    return { message: 'Event deleted successfully' };
  }
}


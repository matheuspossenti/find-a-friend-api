import { Prisma } from '@prisma/client'
import { PetsRepository, FindAllParams } from '../pets-repository'
import { prisma } from 'src/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  findById(id: string) {
    const pet = prisma.pet.findUnique({
      where: { id },
    })

    return pet
  }

  async findAll(params: FindAllParams) {
    const pets = await prisma.pet.findMany({
      where: {
        age: params.age,
        size: params.size,
        energy_level: params.energy_level,
        org: {
          city: {
            contains: params.city,
            mode: 'insensitive',
          },
        },
      },
    })

    return pets
  }

  create(data: Prisma.PetUncheckedCreateInput) {
    const pet = prisma.pet.create({
      data,
    })

    return pet
  }
}

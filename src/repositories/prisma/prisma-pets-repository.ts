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

  findAll(params: FindAllParams) {
    const pets = prisma.pet.findMany({
      where: {
        ...params,
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

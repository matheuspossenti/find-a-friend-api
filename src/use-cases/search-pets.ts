import type { Pet } from '@prisma/client'
import type { PetsRepository } from 'src/repositories/pets-repository'
import { inject, injectable } from 'tsyringe'

interface SearchPetRequest {
  city: string
  age?: string
  size?: string
  energy_level?: string
  environment?: string
}

interface SearchPetResponse {
  pets: Pet[]
}

@injectable()
export class SearchPetUseCase {
  constructor(
    @inject('PetsRepository') private petsRepository: PetsRepository,
  ) {}

  async execute({
    city,
    age,
    size,
    energy_level,
    environment,
  }: SearchPetRequest): Promise<SearchPetResponse> {
    const pets = await this.petsRepository.findAll({
      city,
      age,
      size,
      energy_level,
      environment,
    })

    return { pets }
  }
}

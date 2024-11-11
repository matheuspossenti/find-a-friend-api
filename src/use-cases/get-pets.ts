import type { Pet } from '@prisma/client'
import type { PetsRepository } from 'src/repositories/pets-repository'
import { PetNotFoundError } from './errors/pet-not-found'

interface GetPetRequest {
  id: string
}

interface GetPetResponse {
  pet: Pet
}

export class GetPets {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ id }: GetPetRequest): Promise<GetPetResponse> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new PetNotFoundError()
    }

    return { pet }
  }
}

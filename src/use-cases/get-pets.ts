import { Pet } from '@prisma/client'
import { PetsRepository } from 'src/repositories/pets-repository'
import { PetNotFoundError } from './errors/pet-not-found'
import { inject, injectable } from 'tsyringe'

interface GetPetRequest {
  id: string
}

interface GetPetResponse {
  pet: Pet
}

@injectable()
export class GetPetsUseCase {
  constructor(
    @inject('OrgsRepository') private petsRepository: PetsRepository,
  ) {}

  async execute({ id }: GetPetRequest): Promise<GetPetResponse> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new PetNotFoundError()
    }

    return { pet }
  }
}

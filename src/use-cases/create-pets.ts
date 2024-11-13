import type { Pet } from '@prisma/client'
import type { OrgsRepository } from 'src/repositories/orgs-repository'
import type { PetsRepository } from 'src/repositories/pets-repository'
import { OrgNotFoundError } from './errors/org-not-found'
import { inject, injectable } from 'tsyringe'
import { randomUUID } from 'crypto'

interface CreatePetRequest {
  name: string
  about: string
  age: string
  size: string
  energy_level: string
  environment: string
  org_id: string
}

interface CreatePetResponse {
  pet: Pet
}

@injectable()
export class CreatePetUseCase {
  constructor(
    @inject('PetsRepository') private petsRepository: PetsRepository,
    @inject('OrgsRepository') private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    name,
    about,
    age,
    size,
    energy_level,
    environment,
    org_id,
  }: CreatePetRequest): Promise<CreatePetResponse> {
    const org = await this.orgsRepository.findById(org_id)

    if (!org) {
      throw new OrgNotFoundError()
    }

    const pet = await this.petsRepository.create({
      id: randomUUID(),
      name,
      about,
      age,
      size,
      energy_level,
      environment,
      org_id,
    })

    return { pet }
  }
}

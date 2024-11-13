import { inject, injectable } from 'tsyringe'
import type { Org } from '@prisma/client'
import type { OrgsRepository } from 'src/repositories/orgs-repository'
import { OrgAlreadyExists } from './errors/org-already-exists'
import { hash } from 'bcryptjs'
import type { Decimal, DecimalJsLike } from '@prisma/client/runtime/library'
import { randomUUID } from 'crypto'

interface CreateOrgRequest {
  name: string
  author_name: string
  email: string
  whatsapp: string
  password: string
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
  latitude: string | number | Decimal | DecimalJsLike
  longitude: string | number | Decimal | DecimalJsLike
}

interface CreateOrgResponse {
  org: Org
}

@injectable()
export class CreateOrgUseCase {
  constructor(
    @inject('OrgsRepository') private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    name,
    author_name,
    email,
    whatsapp,
    password,
    cep,
    state,
    city,
    neighborhood,
    street,
    latitude,
    longitude,
  }: CreateOrgRequest): Promise<CreateOrgResponse> {
    const orgByEmail = await this.orgsRepository.findByEmail(email)

    if (orgByEmail) throw new OrgAlreadyExists()

    const password_hash = await hash(password, 8)

    const org = await this.orgsRepository.create({
      id: randomUUID(),
      name,
      author_name,
      email,
      whatsapp,
      password: password_hash,
      cep,
      state,
      city,
      neighborhood,
      street,
      latitude,
      longitude,
    })

    return { org }
  }
}

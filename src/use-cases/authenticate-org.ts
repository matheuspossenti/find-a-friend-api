import { Org } from '@prisma/client'
import { OrgsRepository } from 'src/repositories/orgs-repository'
import { OrgNotFoundError } from './errors/org-not-found'
import { compare } from 'bcryptjs'
import { InvalidPasswordError } from './errors/invalid-password'

interface AuthenticateOrgRequest {
  email: string
  password: string
}

interface AuthenticateOrgResponse {
  org: Org
}

export class AuthenticateOrg {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateOrgRequest): Promise<AuthenticateOrgResponse> {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) throw new OrgNotFoundError()

    const passwordMatch = await compare(password, org.password)

    if (!passwordMatch) throw new InvalidPasswordError()

    return { org }
  }
}

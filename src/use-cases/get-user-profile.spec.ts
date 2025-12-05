import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new GetUserProfileUseCase(usersRepository) // sut = system under test
    })

    it('should be able to get user profile', async () => {
        const createdUser = await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6),
        })

        // Retorna um objeto que contém o usuário => { user }
        const { user } = await sut.execute({
            id: createdUser.id
        })

        expect(user.id).toEqual(createdUser.id)
        expect(user.email).toEqual(createdUser.email)
        expect(user.name).toEqual(createdUser.name)
    })

    it('should not be able to get user profile with non existing id', async () => {
        await expect(() => 
            sut.execute({
                id: 'non-existing-id'
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})
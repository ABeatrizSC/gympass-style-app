import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { SearchGymsUseCase } from './search-gyms'

let gymRepository: InMemoryGymRepository
let searchGymsUseCase: SearchGymsUseCase

describe('Search Gym Use Case', () => {
    beforeEach(async () => {
        gymRepository = new InMemoryGymRepository()
        searchGymsUseCase = new SearchGymsUseCase(gymRepository)
    })

   it('should be able to search for gyms', async () => {
        await gymRepository.create({
            title: 'JavaScript Gym',
            description: null,
            phone: null,
            latitude: 0,
            longitude: 0,
        })

        await gymRepository.create({
            title: 'TypeScript Gym',
            description: null,
            phone: null,
            latitude: 0,
            longitude: 0,
        })

        const { gyms } = await searchGymsUseCase.execute({
            query: 'JavaScript',
            page: 1,
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'JavaScript Gym' }),
        ])
    })

    it('should be able to fetch paginated gyms search', async () => {
        for (let i = 1; i <= 22; i++) {
            await gymRepository.create({
            title: `JavaScript Gym ${i}`,
            description: null,
            phone: null,
            latitude: 0,
            longitude: 0,
            })
        }

        const { gyms } = await searchGymsUseCase.execute({
            query: 'JavaScript',
            page: 2,
        })

        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'JavaScript Gym 21' }),
            expect.objectContaining({ title: 'JavaScript Gym 22' }),
        ])
    })

})
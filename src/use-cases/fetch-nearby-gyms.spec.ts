import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymRepository: InMemoryGymRepository
let fetchNearbyGymsUseCase: FetchNearbyGymsUseCase

describe('Fetch nearby gyms Use Case', () => {
    beforeEach(async () => {
        gymRepository = new InMemoryGymRepository()
        fetchNearbyGymsUseCase = new FetchNearbyGymsUseCase(gymRepository)
    })

   it('should be able to fetch nearby gyms', async () => {
        await gymRepository.create({
            title: 'Near Gym',
            description: null,
            phone: null,
            latitude: 0,
            longitude: 0,
        })

        await gymRepository.create({
            title: 'Far Gym',
            description: null,
            phone: null,
            latitude: -27.2092051,
            longitude: -49.6401091,
        })

        const { gyms } = await fetchNearbyGymsUseCase.execute({
            userLatitude: 0,
            userLongitude: 0
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'Near Gym' }),
        ])
    })
})
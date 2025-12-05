import { GymRepository } from "@/repositories/gym-repository"
import { Gym } from "@prisma/client"

interface CreateGymRequest {
    title: string,
    description: string | null,
    phone: string | null,
    latitude: number,
    longitude: number
}

interface CreateGymResponse {
    gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymsRepository: GymRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymRequest): Promise<CreateGymResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return {
      gym,
    }
  }
}
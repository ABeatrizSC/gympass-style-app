import { UserRepository } from "@/repositories/user-repository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetUserProfileRequest {
    id: string
}

interface GetUserProfileResponse {
    user: User
}

export class GetUserProfileUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute({ id } : GetUserProfileRequest) : Promise<GetUserProfileResponse> {
        const user = await this.userRepository.findById(id)

        if (!user) {
            throw new ResourceNotFoundError()
        }

        return {
            user
        }
    }
}
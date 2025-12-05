import { CheckIn } from "@prisma/client";
import { CheckInRepository } from "@/repositories/check-in-repository";

interface fetchUserCheckInsRequest {
    userId: string,
    page: number
}

interface fetchUserCheckInsResponse {
    checkIns: CheckIn[]
}

export class FetchUserCheckInHistoryUseCase {
    constructor(
        private checkInRepository: CheckInRepository
    ) {}

    async execute({ userId, page } : fetchUserCheckInsRequest) : Promise<fetchUserCheckInsResponse> {
        const checkIns = await this.checkInRepository.findManyByUserId(userId, page)

        return {
            checkIns
        }
    }
}
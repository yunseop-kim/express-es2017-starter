import db from '../db';
import {
    AppError
} from '../utils'

export async function findOne(id) {
    const user = await db.user.findOne({
        where: {
            id
        }
    })
    if (!user) {
        throw new AppError(404, "User를 찾을수 없습니다.");
    }
    return user;
}

export async function findAll() {
    return await db.user.findAll();
}
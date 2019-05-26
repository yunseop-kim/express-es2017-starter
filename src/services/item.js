import db from '../db';
import {
    validateOrder,
    AppError
} from '../utils'
import * as userService from './user'

export async function add(userId, payload) {
    const {
        name,
        image_path
    } = payload;

    const user = await userService.findOne(userId)
    const addItem = await db.item.create({
        name,
        image_path
    })

    await user.addItem(addItem)

    return addItem;
}

export async function update(userId, id, payload) {
    const {
        name,
        image_path
    } = payload;
    await findOne(userId, id)
    return db.item.update({
        name,
        image_path
    }, {
        where: {
            id,
            user_id: userId
        }
    })
}

export async function remove(userId, id) {
    await findOne(userId, id);
    return db.item.destroy({
        where: {
            id,
            user_id: userId
        }
    });
}

export async function findOne(userId, id) {
    const item = await db.item.findOne({
        where: {
            id,
            user_id: userId
        }
    });
    if (!item) {
        throw new AppError(403, "접근이 불가능합니다. 해당 유저의 아이템이 아닙니다.");
    }

    return item;
}

export function findAll(userId, order) {
    let findOptions = {
        where: {
            user_id: userId
        }
    }
    if (validateOrder(order)) {
        findOptions.order = [
            ['name', order]
        ]
    }
    return db.item.findAll(findOptions);
}
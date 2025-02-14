import Device from "../models/Devices.js"


export default {
    create(deviceData, ownerId) {

        const result = Device.create({
            ...deviceData,
            price: Number(deviceData.price),
            owner: ownerId
        })
        return result
    },
    getLatest() {
        const latestProducts = Device.find().sort({ createdAt: -1 }).limit(3);

        return latestProducts
    },
    getAll(filter = {}) {
        let query = Device.find({})

        if (filter.owner) {
            query = query.find({ owner: filter.owner });
        }

        if (filter.preferredList) {
            query = query.find({ preferredList: filter.preferredList });
        }

        return query
    },
    getOne(id) {
        const result = Device.findById(id)

        return result;
    },
    update(deviceId, deviceData) {

        return Device.findByIdAndUpdate(deviceId, deviceData, { runValidators: true });
    },
    delete(deviceId) {

        return Device.findByIdAndDelete(deviceId);
    },
    async prefer(deviceId, userId) {
        const device = await Device.findById(deviceId)

        if (device.owner.equals(userId)) {
            throw new Error('Cannot prefer own offer!')
        };

        if (device.preferredList.includes(userId)) {
            throw new Error('You already preferred this offer!')
        };

        device.preferredList.push(userId);

        return device.save();
    }
}
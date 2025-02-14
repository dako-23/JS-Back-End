import { Router } from "express";
import deviceService from "../services/device-service.js";
import { getErrorMessage } from "../utils/error-utils.js";
import { isAuth } from "../middlewares/auth-middleware.js";

const deviceController = Router();

deviceController.get('/create', isAuth, (req, res) => { res.render('products/create') });

deviceController.post('/create', isAuth, async (req, res) => {
    const newDevice = req.body;
    const creatorId = req.user?.id

    try {
        await deviceService.create(newDevice, creatorId);

    } catch (err) {
        return res.render('products/create', { device: newDevice, error: getErrorMessage(err) })
    }
    res.redirect('/products/catalog')
})

deviceController.get('/catalog', async (req, res) => {
    try {
        const allProducts = await deviceService.getAll()

        res.render('products/catalog', { allProducts });
    } catch (err) {
        res.setError(getErrorMessage(err));

        res.redirect('/404')
    }

});

deviceController.get('/:id/details', async (req, res) => {
    const deviceId = req.params.id
    try {
        const device = await deviceService.getOne(deviceId)

        const isCreator = device.owner?.equals(req.user?.id);
        const isPrefered = device.preferredList.includes(req.user.id);

        res.render('products/details', { device, isCreator, isPrefered });
    } catch (err) {
        res.setError(getErrorMessage(err))
        res.redirect('/404')
    }

})

deviceController.get('/:id/edit', isAuth, async (req, res) => {
    try {
        const deviceId = req.params.id;
        const device = await deviceService.getOne(deviceId);

        if (!device.owner?.equals(req.user?.id)) {
            res.setError('You are not the device owner!')
            return res.redirect('/404');
        };

        res.render('products/edit', { device });
    } catch (err) {
        res.setError(getErrorMessage(err))
        res.redirect('/404')
    }

});

deviceController.post('/:id/edit', isAuth, async (req, res) => {
    const deviceData = req.body;
    const deviceId = req.params.id

    try {
        await deviceService.update(deviceId, deviceData)
    } catch (err) {

        return res.render('products/edit', { device: deviceData, error: getErrorMessage(err) });
    }

    res.redirect(`/products/${deviceId}/details`)
});

deviceController.get('/:id/delete', isAuth, async (req, res) => {
    const deviceId = req.params.id;
    try {
        const device = await deviceService.getOne(deviceId)

        if (!device.owner?.equals(req.user?.id)) {
            res.setError('You are not the device owner!')
            return res.redirect('/products/catalog');
        };

        await deviceService.delete(deviceId);

        res.redirect('/products/catalog');
    } catch (err) {
        res.setError(getErrorMessage(err));
        res.redirect('/404');
    }
})

deviceController.get('/:id/prefer', isAuth, async (req, res) => {
    const deviceId = req.params.id
    const userId = req.user?.id

    try {
        await deviceService.prefer(deviceId, userId);
    } catch (err) {
        res.setError(getErrorMessage(err))
    }
    res.redirect(`/products/${deviceId}/details`);
});

export default deviceController;

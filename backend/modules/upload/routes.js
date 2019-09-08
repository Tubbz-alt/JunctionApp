const express = require('express');
const router = express.Router();
const { Auth } = require('@hackjunction/shared');
const helper = require('./helper');

const { hasPermission } = require('../../common/middleware/permissions');

const { hasToken } = require('../../common/middleware/token');

const { isEventOrganiser } = require('../../common/middleware/events');

/**
 * Upload a cover image for an event
 */
router.post(
    '/events/:slug/cover-image',
    hasToken,
    hasPermission(Auth.Permissions.MANAGE_EVENT),
    isEventOrganiser,
    (req, res, next) => {
        helper.uploadEventCoverImage(req.event.slug)(req, res, function(err) {
            if (err) {
                next(err);
            } else {
                res.status(200).json({
                    url: req.file.secure_url || req.file.url,
                    publicId: req.file.public_id
                });
            }
        });
    }
);

/**
 * Upload a logo for an event
 */
router.post(
    '/events/:slug/logo',
    hasToken,
    hasPermission(Auth.Permissions.MANAGE_EVENT),
    isEventOrganiser,
    (req, res, next) => {
        helper.uploadEventLogo(req.event.slug)(req, res, function(err) {
            if (err) {
                next(err);
            } else {
                res.status(200).json({
                    url: req.file.secure_url || req.file.url,
                    publicId: req.file.public_id
                });
            }
        });
    }
);

module.exports = router;
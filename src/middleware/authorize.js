const isOwner = require('./isOwner');

// =====================
// Verify user authorization
// =====================
 module.exports = (roles = []) => {
    // Roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        // Authorize based on user role and ownership
        async (req, res, next) => {
            // If has role
            if (roles.length && roles.includes(req.user.role)) {
                return next(); // authorization successful
            }
            // Check ownership
            if (roles.length && roles.includes('Owner')) {
                try {
                    const ownership = await isOwner(req);
                    // If is owner
                    if (ownership)
                        return next(); // authorization successful
                } catch(err) {
                    return next(err); // return error response
                } 
            }

            // User's role is not authorized
            let err = new Error('You are not authorized to edit this order');
            err.status = 401;
            return next(err);

        }
    ]

}